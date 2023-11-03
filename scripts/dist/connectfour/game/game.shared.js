import { BACKEND_URL } from "../config.js";
import CreateToastMsg from "../toastHandler.js";
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
    }).catch((error) => CreateToastMsg(error));
    if (!response)
        return;
    if (response.ok) {
        return (await response.json());
    }
    else {
        CreateToastMsg("Invalid response from server, something might have gone wrong while setting up the game.");
    }
}
export { getGame };
//# sourceMappingURL=game.shared.js.map