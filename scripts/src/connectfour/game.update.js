"use strict";

import { BACKEND_URL } from "./config.js";
import { finishGame } from "./game.finished.js";
import { getGame, showError } from "./game.shared.js";

/**
 * Sends a request to the server to slide a disc in the given column
 * @param {Number} column
 */

async function slideDiscIn(column) {
    const game = await getGame();
    const user = JSON.parse(localStorage.getItem("user"));

    if (game.playerToPlayId != user.user.id) return;

    if (game.finished) return;

    console.log("Sliding disc in column " + column);

    const gameID = localStorage.getItem("gameId");
    const url = BACKEND_URL + "Games/" + gameID + "/move";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify({
            type: 1,
            discType: 1,
            column: column,
        }),
    }).catch((error) => showError(error));

    // Check if the response is valid
    if (!response) return;

    // Check if the response is ok
    if (response.ok) {
        // Get the updated game
        const game = await getGame();

        // Update the game board
        //updateGameBoard(game);

        // Switch the player turn
        switchPlayerTurn(game, user.user);
    } else {
        showError(
            "Invalid response from server, something might have gone wrong while setting up the game."
        );
    }
}

/**
 * Refreshes the game board and colors the cells
 * @param {*} game
 * @param {IMove[]} possibleMoves
 */
function updateGameBoard(game, possibleMoves) {
    const table = document.querySelector("table");

    for (let i = 0; i < game.grid.numberOfRows; i++) {
        for (let j = 0; j < game.grid.numberOfColumns; j++) {
            const td = table.rows[i].cells[j];

            if (possibleMoves && possibleMoves.some((x) => x.column == j)) {
                td.classList.remove("blocked");
            } else {
                td.classList.add("blocked");
            }

            if (game.grid.cells[i][j] == null) continue;

            td.classList.remove("player1-color");
            td.classList.remove("player2-color");

            if (game.grid.cells[i][j].Color == 1) {
                td.classList.add("player1-color");
            } else {
                td.classList.add("player2-color");
            }
        }
    }
}

/**
 * Changes the info about the player turn
 * @param {*} game
 * @param {*} user
 */
function switchPlayerTurn(game, user) {
    const playerTurn = document.getElementById("player-turn");

    if (game.playerToPlayId == user.id) {
        playerTurn.innerHTML = "Your turn";

        playerTurn.classList.remove("player2-color");
        playerTurn.classList.remove("player1-color");

        if (game.player1.id == user.id) {
            playerTurn.classList.add("player1-color");
        } else {
            playerTurn.classList.add("player2-color");
        }
    } else {
        playerTurn.innerHTML = "Opponent turn";

        playerTurn.classList.remove("player2-color");
        playerTurn.classList.remove("player1-color");

        if (game.player1.id == user.id) {
            playerTurn.classList.add("player2-color");
        } else {
            playerTurn.classList.add("player1-color");
        }
    }
}

/**
 * Returns all the possible moves for the current game
 * @param {IGame} game
 * @returns All possible moves
 */
async function getAllPossibleMoves(game) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (game.playerToPlayId != user.user.id) return;

    if (game.finished) return;

    const url = BACKEND_URL + "Games/" + game.id + "/possible-moves";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).catch((error) => showError(error));

    // Check if the response is valid
    if (!response) return;

    // Check if the response is ok
    if (response.ok) {
        return await response.json();
    } else {
        showError(
            "Invalid response from server, something might have gone wrong while setting up the game."
        );
    }
}

/**
 * Checks if the game is finished and lets the players know if it is
 * @param {*} game
 */
function checkGameFinished(game) {
    if (!game.finished) return;

    // clear interval
    clearInterval(localStorage.getItem("gameSyncInterval"));

    finishGame(game);
}

export {
    slideDiscIn,
    updateGameBoard,
    switchPlayerTurn,
    getAllPossibleMoves,
    checkGameFinished,
};
