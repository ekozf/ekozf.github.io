"use strict";

import { setUpGame } from "./game.setup.js";
import { getGame } from "./game.shared.js";
import {
    switchPlayerTurn,
    checkGameFinished,
    getAllPossibleMoves,
} from "./game.update.js";
import { discAnimation, checkNewDiscPosition } from "./game.animations.js";
import { SendMessage, ConnectSignalR } from "./game.chat.js";

if (localStorage.getItem("user") === null) {
    // if the user is not logged in, redirect to the login page
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    await ConnectSignalR();

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

    const game = await getGame();
    const user = JSON.parse(localStorage.getItem("user")).user;
    // //helpbutton start
    // const helpButton = document.getElementById("helpButton");
    // helpButton.addEventListener("click", showHelp);
    // //helpbutton end

    // hier worden de variabelen van de kleur ingesteld.
    const color1 = localStorage.getItem("player1-color");
    const color2 = localStorage.getItem("player2-color");

    const body = document.querySelector("body");
    if (color1 != null && color2 != null) {
        body.style.setProperty("--color-player1", color1);
        body.style.setProperty("--color-player2", color2);
    }

    await setUpGame(game, user);
});

/**
 * This function is called every second to sync the game with the server
 */
async function gameSync() {
    // Save previous board
    const prevGame = JSON.parse(localStorage.getItem("prevGame"));

    // Get the game from the server
    const game = await getGame();

    const possibleMoves = await getAllPossibleMoves(game);

    if (prevGame !== null) {
        const discPos = checkNewDiscPosition(game, prevGame);

        //disc animation
        if (discPos != null && discPos.length !== 0) {
            discAnimation(discPos, game, possibleMoves);
        }
    }

    // Get the user from the local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // Update the game board and previous game board
    //updateGameBoard(game, possibleMoves);
    localStorage.setItem("prevGame", JSON.stringify(game));

    // Switch the player turn
    switchPlayerTurn(game, user.user);

    // Check if the game is finished
    checkGameFinished(game);
}

export { gameSync };

// //helpbutton start
// async function showHelp() {
//     const help = document.getElementById("help");
//     if (help.style.visibility === "hidden" || help.style.visibility === "") {
//         help.style.visibility = "visible";
//     } else {
//         help.style.visibility = "hidden";
//     }
// }
