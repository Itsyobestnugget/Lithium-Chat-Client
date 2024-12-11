

const app = module.exports = {
    HandleSocket: {

        open(ws){
            // Someone has connected
            ws.authenticated = false;
        },

        message(ws, message, isBinary){
            // Received a message

            let data = message.toString();

            // The login may work already
            // You can try
            // aleady done that i think
            // yup already sdone it
            // i mean like the button needs to do the login link
            // double check because i added the button while you work. the login screen dowsnt go away as in,?
            // when your signed in the div doesnt dissapear
            // ?
            // like where?
//            
        try {
            
                
                if(!ws.authenticated) {
                    // Here we check who the user is
                    
                    let user = backend.user.getAuth(data);

                    if(user.error) {
                        // The login failed, so close the connection
                        return ws.close()
                    }

                    ws.send("yeah you good");
                    return
                }

                data = JSON.parse(data);

                switch(data.event){
                    case "message":
                        // When the user sends a message, send it to everyone else
                        // TODO: add rooms and only send to rooms the user is in

                        backend.broadcast("", JSON.stringify({
                            event: "message",
                            data
                        }))
                    break;
                }

            } catch {}
        },

        close(ws, code, reason){
            // Someone disconnected
        }

    }
}