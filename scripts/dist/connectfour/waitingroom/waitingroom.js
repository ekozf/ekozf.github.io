import { BACKEND_URL, GUID_EMPTY } from "../config.js";
import { SendMessage, GetAllUsers, ConnectSignalR, } from "./waitingroom.chat.js";
import CreateToastMsg from "../toastHandler.js";
if (localStorage.getItem("user") === null) {
    window.location.href = "/projects/connect-four/pages/";
}
let count = 0;
document.addEventListener("DOMContentLoaded", async () => {
    await ConnectSignalR();
    const button = document.getElementById("joinRoom");
    button.addEventListener("click", UserJoinWaitingPool);
    const leaveButton = document.getElementById("cancelMatch");
    leaveButton.addEventListener("click", LeaveWaitingPool);
    localStorage.removeItem("gameId");
    const chatInput = document.getElementById("chat-input");
    chatInput.onkeyup = async (event) => {
        if (event.key === "Enter") {
            await SendMessage(event);
        }
    };
    const chatButton = document.getElementById("send-chat");
    chatButton.onclick = async (event) => {
        await SendMessage(event);
    };
    const viewUsers = document.getElementById("view-users");
    viewUsers.onclick = async () => {
        await GetAllUsers();
    };
    const viewChat = document.getElementById("view-chat");
    viewChat.onclick = () => {
        const chat = document.getElementById("chat-screen");
        const users = document.getElementById("user-screen");
        chat.classList.remove("d-none");
        users.classList.add("d-none");
        viewChat.classList.add("active");
        viewUsers.classList.remove("active");
    };
});
function CheckInput() {
    const columnInput = document.getElementById("gameColumnCount");
    const rowInput = document.getElementById("gameRowCount");
    if (Number(columnInput.value) >= 9 && Number(columnInput.value) >= 3) {
        columnInput.setCustomValidity("Invalid number of columns");
        columnInput.reportValidity();
        return false;
    }
    if (Number(rowInput.value) >= 9 && Number(rowInput.value) >= 3) {
        rowInput.setCustomValidity("Invalid number of rows");
        rowInput.reportValidity();
        return false;
    }
    return true;
}
async function UserJoinWaitingPool() {
    if (!CheckInput()) {
        return;
    }
    const url = BACKEND_URL + "WaitingPool/join";
    const rows = document.getElementById("gameRowCount")
        .value;
    const columns = document.getElementById("gameColumnCount").value;
    const connectionSize = Number(document.getElementById("gameConnectionSize").value);
    const gameSettings = {
        GridRows: rows,
        GridColumns: columns,
        ConnectionSize: connectionSize,
    };
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(gameSettings),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).catch((error) => CreateToastMsg(error));
    if (!response)
        return;
    if (response.ok) {
        console.log(response);
        document.querySelector("#matchmaking").classList.remove("d-none");
        document.querySelector("#joinQueue").classList.add("d-none");
        const interval = setInterval(() => {
            ShowCandidacyStatus();
        }, 3000);
        localStorage.setItem("candidateCheckInterval", String(interval));
    }
    else {
        CreateToastMsg("Something went wrong while joining a waiting pool... Please try again later");
    }
}
async function ShowCandidacyStatus() {
    const url = BACKEND_URL + "WaitingPool/candidates/me";
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).catch((error) => CreateToastMsg(error));
    if (!response)
        return;
    if (response.ok) {
        const queueCandidate = await response.json();
        if (!queueCandidate)
            return;
        if (queueCandidate.gameId == GUID_EMPTY) {
            let msg = "Waiting for other players";
            for (let i = 0; i < count; i++) {
                msg += ".";
            }
            count++;
            if (count > 3) {
                count = 0;
            }
            document.querySelector("#waiting-status").innerHTML = msg;
        }
        else {
            clearInterval(Number(localStorage.getItem("candidateCheckInterval")));
            localStorage.removeItem("candidateCheckInterval");
            localStorage.setItem("gameId", queueCandidate.gameId);
            window.location.href = "/projects/connect-four/pages/game";
        }
    }
    else {
        CreateToastMsg("Something went wrong while joining a waiting pool... Please try again later");
    }
}
async function LeaveWaitingPool() {
    if (localStorage.getItem("candidateCheckInterval") !== null) {
        clearInterval(Number(localStorage.getItem("candidateCheckInterval")));
        localStorage.removeItem("candidateCheckInterval");
        const url = BACKEND_URL + "WaitingPool/leave";
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
        }).catch((error) => CreateToastMsg(error));
        if (!response)
            return;
        if (response.ok) {
            console.log(response);
            document.querySelector("#matchmaking").classList.add("d-none");
            document.querySelector("#joinQueue").classList.remove("d-none");
            document.querySelector("#gameRowCount").disabled =
                false;
            document.querySelector("#gameColumnCount").disabled = false;
            document.querySelector("#gameConnectionSize").disabled = false;
        }
        else {
            CreateToastMsg("Something went wrong while leaving the waiting pool... Please try again later");
        }
    }
}
//# sourceMappingURL=waitingroom.js.map