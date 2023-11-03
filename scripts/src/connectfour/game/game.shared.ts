import { BACKEND_URL } from "../config.js";
import CreateToastMsg from "../toastHandler.js";

/**
 * Function that sends a GET request to the server to get the game
 * @returns {Promise<GameModel>} A promise that resolves to the game object
 */
async function getGame(): Promise<GameModel> {
	const gameID = localStorage.getItem("gameId");
	const url = BACKEND_URL + "Games/" + gameID;

	const user = JSON.parse(localStorage.getItem("user")) as UserModel;

	const response = await fetch(url, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + user.token,
		},
	}).catch((error) => CreateToastMsg(error));

	// Check if the response is valid
	if (!response) return;

	// Check if the response is ok
	if (response.ok) {
		// This is our game, it should have all the information we need
		// Return it so we can use it to set up the game
		return (await response.json()) as GameModel;
	} else {
		CreateToastMsg(
			"Invalid response from server, something might have gone wrong while setting up the game."
		);
	}
}

export { getGame };
