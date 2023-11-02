"use strict";

import { BACKEND_URL } from "./config.js";

// Create a connection to the hub, using the "/waitingpool-chat" path that we registered in the Program.cs file
const connection = new signalR.HubConnectionBuilder()
    .withUrl(BACKEND_URL.substring(0, BACKEND_URL.length - 5) + "/game-chat")
    .build();

connection.on("ReceiveMessage", function (username, userId, message) {
    const chat = document.getElementById("chat");
    const user = JSON.parse(localStorage.getItem("user")).user;

    const entry = _CreateUserElement(user.id, username, userId);

    const messageSpan = document.createElement("span");
    messageSpan.textContent = message;

    entry.appendChild(messageSpan);

    chat.appendChild(entry);
    chat.scrollTop = chat.scrollHeight;
});

async function SendMessage(event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user")).user;

    const gameId = localStorage.getItem("gameId");

    // Get the user and message from the input fields
    const message = document.getElementById("chat-input");

    // Send the message to the hub
    try {
        await connection.invoke(
            "SendMessage",
            user.nickName,
            user.id,
            message.value,
            gameId
        );
    } catch {
        console.error(error);
    }

    message.value = "";
}

async function ConnectUser() {
    const user = JSON.parse(localStorage.getItem("user")).user;
    const gameId = localStorage.getItem("gameId");

    try {
        await connection.invoke("ConnectUser", user.nickName, user.id, gameId);
    } catch (error) {
        console.error(error);
    }
}

async function ConnectSignalR() {
    try {
        await connection.start();

        await ConnectUser();
    } catch (error) {
        console.error(error);
    }
}

/**
 * Creates a <li> element for a user in the waiting room
 * @param {Guid} currentUser
 * @param {string} userName
 * @param {Guid} userId
 * @returns HTMLLIElement
 */
function _CreateUserElement(currentUser, userName, userId) {
    const messageEntry = document.createElement("li");
    messageEntry.classList.add("card");

    const usernameButton = document.createElement("button");

    if (currentUser === userId) {
        usernameButton.disabled = true;
        usernameButton.classList.add("current-user");
        usernameButton.textContent = `${userName} (you)`;
    } else {
        usernameButton.onclick = () => InvitePlayer(userName, userId);
        usernameButton.textContent = userName;
    }

    messageEntry.appendChild(usernameButton);

    return messageEntry;
}

export { SendMessage, ConnectSignalR };
