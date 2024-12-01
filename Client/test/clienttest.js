/*const typingForm = document.getElementById("chattyper");
const chatContainer = document.querySelector("");
const toggleThemeButton = document.querySelector("");
const deleteChatButton = document.querySelector("");
const send = document.getElementById("send")
const cache = localStorage*/

const typingForm = document.getElementById('typing');
const chatContainer = document.getElementById('chatContent');
const toggleThemeButton = document.querySelector("#theme-toggle-button");
const deleteChatButton = document.querySelector("#delete-chat-button");


// State variables
let userMessage = null;
let isResponseGenerating = false;


const loadDataFromcache = () => {
  const savedChats = cache.getItem("saved-chats");
  const isLightMode = (cache.getItem("themeColor") === "light_mode");

  // Apply the stored theme
  document.body.classList.toggle("light_mode", isLightMode);
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

  // Restore saved chats or clear the chat container
  chatContainer.innerHTML = savedChats || '';

  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
}

// Create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
}

// Handle sending outgoing chat messages
const handleOutgoingChat = () => {
  userMessage = typingForm.querySelector("text").value.trim() || userMessage;
  if(!userMessage || isResponseGenerating) return; // Exit if there is no message or response is generating

  isResponseGenerating = false;

  const html = `<div class="message-content">
                  <img class="avatar" src="" alt="User avatar">
                  <p id="text"></p>
                </div>`;

  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.getElementById(Text).innerText = userMessage;
  chatContainer.appendChild(outgoingMessageDiv);
  
  typingForm.value.reset(); // Clear input field
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to the bottom
  cache.setItem("saved-chats", chatContainer.innerHTML); // Save chats to local storage
}

// Toggle between light and dark themes
toggleThemeButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light_mode");
  cache.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});

// Delete all chats from local storage when button is clicked
deleteChatButton.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all the chats?")) {
    cache.removeItem("saved-chats");
    loadDataFromcache();
  }
});

// Prevent default form submission and handle outgoing chat
function send() {
  e.preventDefault(); 
  handleOutgoingChat();
};

loadDataFromcache();