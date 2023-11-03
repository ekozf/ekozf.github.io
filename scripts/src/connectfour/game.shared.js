"use strict";

import { BACKEND_URL } from "./config.js";

/**
 * Function that sends a GET request to the server to get the game
 * @returns {Promise} A promise that resolves to the game object
 */
async function getGame() {
    const gameID = localStorage.getItem("gameId");
    const url = BACKEND_URL + "Games/" + gameID;

    const user = JSON.parse(localStorage.getItem("user"));

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
        // This is our game, it should have all the information we need
        // Return it so we can use it to set up the game
        return await response.json();
    } else {
        showError(
            "Invalid response from server, something might have gone wrong while setting up the game."
        );
    }
}

/**
 * Show an error message to the user
 * @param {string} message
 */
function showError(message) {
    const error = document.getElementById("errorMessage");
    error.classList.remove("d-none");
    error.innerHTML = message;
    console.error(message);
}

export { getGame, showError };
