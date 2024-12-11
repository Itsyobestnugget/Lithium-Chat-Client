let
    client = new Client("wss://api.extragon.cloud/v2/oscario_chat_client/"),

    cache = localStorage,
    messages = [] // Message buffer,

    inputElement,
    chat_window
;


function login(){
    const loginWindow = window.open("https://lstv.space/sso?app=41&ref=https://lstv.space/finish-lithium-login/&permissions=16", "", `width=512,height=512`);

    addEventListener('message', (event) => {
        localStorage.token = event.data;
        loginWindow.close()
    })

    check_login()
}


function check_login(){
    if(localStorage.token){
        document.querySelector("#login").remove()
        client.connect()
    }
}


function saveCache() {
    // except this saves cache Mama fucker
    cache["saved-chats"] = JSON.stringify(
        messages.map((message) => {
            return {
                text: message.text,
                // ...
            }
        })
    )
}



function loadCache() {
    try {
        const savedChats = JSON.parse(localStorage.getItem("saved-chats"));

        // TODO: Restore saved chats or clear the chat container
    } catch { }
}



function addNewMessage(messageObject) {
    var text = inputElement.value;
    if (!text) return alert("Message must not be empty!");

    messages.push(messageObject);
    saveCache() // Save the message for offline use


    inputElement.value = "";

    const messageElement = document.createElement("div");

    messageElement.classList.add("message");

    messageElement.innerHTML = `
        <img src="lios-flat.svg" class="pfp">
        <p class="message_content">${text}</p>
    `

    chat_window.append(messageElement)
};




addEventListener("load", () => {
    const messageContainer = document.querySelector("#message_container");
    chat_window = document.getElementById("chatContent");
    inputElement = document.getElementById("typer");

    if (cache["saved-chats"]) {
        loadCache();
    }


    chat_window.scrollTo(0, chatContainer.scrollHeight);


    document.getElementById("typer").addEventListener("keydown", (event) => {
        if (event.code === "Enter" && !event.shiftKey) {
            // addNewMessage();
        }
    });


    check_login()
// works? lemme see. sorta. first the thing goes away as soon as its clicked when it should go as soon as its verified
// 2nd of all the actuall send chat is broken  for some sucky ass reason
// so the button just wont make the div at all?
// Im to tired for  this shit schools annoying
// but is it actually done?
// what done?
// like the client where we can run the server and debug it.
// wym
// well weve hypothetically made it work so now he have to test it and debug it. with a live server right?
// im gonna cry T-T
// so whats left?'
// bet :D just until we know it works then we can pass this on to the real (not dev) client and do that one right roght????
// so itl work just for us until we get a public version made right?
// theres still a lot to do :)
// but sure its almost on the way that we can send messages
// well since its not a public app at this moment, we can cut corners
// ig
    // its not broken, but the server isnt running
    // so it cant send the message obviozusly
    // well no since nothing was sent... later this shuold display a
    // message that you arent connected. gotchu
    // Replace the log function so it forwards messages to the console element
    // const original_log = console.log;
    // console.log = function (...data) {
    //     document.querySelector("#console").append(data.map(String).join("\n"));
    //     original_log(...data);
    // }
})


class Client {
    constructor(api_url) {
        this.api = api_url;
        this.authenticated = false;
    }


    send(message) {
        if(!message) message = {
            text: inputElement.value //is it fixed mostly yeah :) if stuff is missing we can add it alr. so does it all work; no, we dont have a server yet... can we set it up???
        }

        // Send the message
        this.ws.send(
            JSON.stringify(message)
        )
    }


    onOpen() {
        // Connection open, send information about us
        console.log("[SERVER] Connected");

        this.ws.send(
            JSON.stringify(localStorage.token)
        )
    }


    onMessage(event) {
        if (!this.authenticated) {
            // The server has accepted our connection
            this.authenticated = true;
            return
        }

        // Message received
        const data = JSON.parse(event.data.toString());
        console.log(`[CLIENT] Recieved message ${data} `);


        switch (data.event) {
            case "message":
                addNewMessage(data.message)
                break;


            default:
                console.log(`[CLIENT] Received an invalid event ${data.even} `);
        }
    }


    onClosed(error) {
        // Connection closed
        console.log("[SERVER] Connection Cut, reason: ", error);
    }


    onError(error) {
        console.log(`[CLIENT] Error: ${error} `);
    }


    connect() {
        this.ws = new WebSocket(this.api);
        this.ws.addEventListener("open", this.onOpen);
        this.ws.addEventListener("message", this.onMessage);
        this.ws.addEventListener("close", this.onClosed);
        this.ws.addEventListener("error", this.onError);
    }
}