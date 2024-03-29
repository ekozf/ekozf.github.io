declare const signalR: any;

import { BACKEND_URL } from "../config.js";
import { InvitePlayer } from "./waitingroom.challenge.js";

// Create a connection to the hub, using the "/waitingpool-chat" path that we registered in the Program.cs file
const connection = new signalR.HubConnectionBuilder()
	.withUrl(
		BACKEND_URL.substring(0, BACKEND_URL.length - 5) + "/waitingpool-chat"
	)
	.build();

connection.on(
	"ReceiveMessage",
	function (username: string, userId: string, message: string) {
		const chat = document.getElementById("chat");
		const user = JSON.parse(localStorage.getItem("user"))
			.user as ClientUserModel;

		const entry = _CreateUserElement(user.id, username, userId);

		const messageSpan = document.createElement("span");
		messageSpan.textContent = message;

		entry.appendChild(messageSpan);

		chat.appendChild(entry);
		chat.scrollTop = chat.scrollHeight;
	}
);

connection.on("ReceiveAllUsers", (users: ChatUserModel[]) => {
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

async function SendMessage(event: KeyboardEvent | MouseEvent) {
	event.preventDefault();

	const user: ClientUserModel = JSON.parse(localStorage.getItem("user")).user;

	// Get the user and message from the input fields
	const message = document.getElementById("chat-input") as HTMLInputElement;

	// Send the message to the hub
	try {
		await connection.invoke(
			"SendMessage",
			user.nickName,
			user.id,
			message.value
		);
	} catch (error) {
		console.error(error);
	}

	message.value = "";
}

async function ConnectUser() {
	const user: ClientUserModel = JSON.parse(localStorage.getItem("user")).user;

	try {
		await connection.invoke("ConnectUser", user.nickName, user.id);
	} catch (error) {
		console.error(error);
	}
}

async function GetAllUsers() {
	try {
		await connection.invoke("GetAllUsers");
	} catch (error) {
		console.error(error);
	}
}

function ShowAllUsers(users: ChatUserModel[]) {
	const chat = document.getElementById("users");
	const user = JSON.parse(localStorage.getItem("user")).user as ClientUserModel;

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
function _CreateUserElement(
	currentUser: string,
	userName: string,
	userId: string
) {
	const messageEntry = document.createElement("li");
	messageEntry.classList.add("bg-light-subtle", "rounded-4", "shadow");

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

export { SendMessage, GetAllUsers, ConnectSignalR };
