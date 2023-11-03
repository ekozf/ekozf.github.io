/**
 * This file contains the functions that are used to set up the game
 * and to sync the game with the server.
 *
 * The setUpGame function is called when the game is loaded.
 * The createGrid function is used to create the grid, it is called by the setUpGame function and will only be used once.
 */

import { gameSync } from "./game.js";
import {
	getAllPossibleMoves,
	slideDiscIn,
	updateGameBoard,
} from "./game.update.js";

/**
 * Set up a game by creating the grid and syncing the game with the server.
 * @param {GameModel} game
 * @param {CLientUserModel} user
 */
async function setUpGame(game: GameModel, user: ClientUserModel) {
	// Get info tags from the DOM
	const colorSpan = document.getElementById("player-color");
	const playerTurn = document.getElementById("player-turn");

	colorSpan.innerHTML = "Your Color";

	// Set the color of the player
	if (user.id == game.player1.id) {
		colorSpan.classList.add("player1-color");
	} else {
		colorSpan.classList.add("player2-color");
	}

	// Set the player turn
	if (game.playerToPlayId == user.id) {
		playerTurn.innerHTML = "Your turn";
		playerTurn.classList.add("player1-color");
	} else {
		playerTurn.innerHTML = "Opponent turn";
		playerTurn.classList.add("player2-color");
	}

	// Create the grid
	createGrid(game.grid.numberOfRows, game.grid.numberOfColumns);

	// Sync the game with the server
	if (localStorage.getItem("gameSyncInterval") === null) {
		// Sync the game every second
		const gameSyncInterval = setInterval(async () => {
			await gameSync();
		}, 1000);

		// Save the interval in the local storage
		localStorage.setItem("gameSyncInterval", String(gameSyncInterval));
	} else {
		// Clear the interval if it already exists
		clearInterval(Number(localStorage.getItem("gameSyncInterval")));

		// Sync the game every second
		const gameSyncInterval = setInterval(async () => {
			await gameSync();
		}, 1000);

		// Save the interval in the local storage
		localStorage.setItem("gameSyncInterval", String(gameSyncInterval));
	}

	updateGameBoard(game, await getAllPossibleMoves(game));
	fillThePlayers();
}

/**
 * Creates the grid as a table on the page
 * @param {Number} rows
 * @param {Number} columns
 */
function createGrid(rows: number, columns: number) {
	const output = document.getElementById("grid_output");
	const table = document.createElement("table");

	for (let i = 0; i < rows; i++) {
		const tr = document.createElement("tr");

		table.appendChild(tr);

		for (let j = 0; j < columns; j++) {
			const td = document.createElement("td");

			td.addEventListener("click", () => slideDiscIn(j));
			td.addEventListener("mouseover", () => highlightHoveringColumn(j));
			td.addEventListener("mouseout", () => removeColumnHighlight(j));

			tr.appendChild(td);
		}
	}

	output.appendChild(table);
}

function fillThePlayers() {
	const player1Box = document.getElementById("player-1");
	const user1 = JSON.parse(localStorage.getItem("user")).user.nickName;
	player1Box.appendChild(document.createTextNode(" " + user1));
}

function highlightHoveringColumn(column: number) {
	const table = document.querySelector(
		"#grid_output table"
	) as HTMLTableElement;

	for (let i = 0; i < table.rows.length; i++) {
		const td = table.rows[i].cells[column];

		td.classList.add("possible-column");
	}
}

function removeColumnHighlight(column: number) {
	const table = document.querySelector(
		"#grid_output table"
	) as HTMLTableElement;

	for (let i = 0; i < table.rows.length; i++) {
		const td = table.rows[i].cells[column];

		td.classList.remove("possible-column");
	}
}

export { setUpGame };
