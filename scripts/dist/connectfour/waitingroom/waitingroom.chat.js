import { BACKEND_URL } from "../config.js";
import { InvitePlayer } from "./waitingroom.challenge.js";
const connection = new signalR.HubConnectionBuilder()
    .withUrl(BACKEND_URL.substring(0, BACKEND_URL.length - 5) + "/waitingpool-chat")
    .build();
connection.on("ReceiveMessage", function (username, userId, message) {
    const chat = document.getElementById("chat");
    const user = JSON.parse(localStorage.getItem("user"))
        .user;
    const entry = _CreateUserElement(user.id, username, userId);
    const messageSpan = document.createElement("span");
    messageSpan.textContent = message;
    entry.appendChild(messageSpan);
    chat.appendChild(entry);
    chat.scrollTop = chat.scrollHeight;
});
connection.on("ReceiveAllUsers", (users) => {
    const userScreen = document.getElementById("user-screen");
    const chatScreen = document.getElementById("chat-screen");
    const viewChat = document.getElementById("view-chat");
    const viewUsers = document.getElementById("view-users");
    userScreen.classList.remove("d-none");
    chatScreen.classList.add("d-none");
    viewChat.classList.remove("active");
    viewUsers.classList.add("active");
    ShowAllUsers(users);
});
async function SendMessage(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user")).user;
    const message = document.getElementById("chat-input");
    try {
        await connection.invoke("SendMessage", user.nickName, user.id, message.value);
    }
    catch (error) {
        console.error(error);
    }
    message.value = "";
}
async function ConnectUser() {
    const user = JSON.parse(localStorage.getItem("user")).user;
    try {
        await connection.invoke("ConnectUser", user.nickName, user.id);
    }
    catch (error) {
        console.error(error);
    }
}
async function GetAllUsers() {
    try {
        await connection.invoke("GetAllUsers");
    }
    catch (error) {
        console.error(error);
    }
}
function ShowAllUsers(users) {
    const chat = document.getElementById("users");
    const user = JSON.parse(localStorage.getItem("user")).user;
    chat.innerHTML = "";
    users.forEach((element) => {
        const username = element.username;
        const userId = element.userId;
        const entry = _CreateUserElement(user.id, username, userId);
        chat.appendChild(entry);
    });
}
async function ConnectSignalR() {
    try {
        await connection.start();
        await ConnectUser();
    }
    catch (error) {
        console.error(error);
    }
}
function _CreateUserElement(currentUser, userName, userId) {
    const messageEntry = document.createElement("li");
    messageEntry.classList.add("bg-light-subtle", "rounded-4", "shadow");
    const usernameButton = document.createElement("button");
    if (currentUser === userId) {
        usernameButton.disabled = true;
        usernameButton.classList.add("current-user");
        usernameButton.textContent = `${userName} (you)`;
    }
    else {
        usernameButton.onclick = () => InvitePlayer(userName, userId);
        usernameButton.textContent = userName;
    }
    messageEntry.appendChild(usernameButton);
    return messageEntry;
}
export { SendMessage, GetAllUsers, ConnectSignalR };
//# sourceMappingURL=waitingroom.chat.js.map