import { setUpGame } from "./game.setup.js";
import { getGame } from "./game.shared.js";
import { switchPlayerTurn, checkGameFinished, getAllPossibleMoves, } from "./game.update.js";
import { discAnimation, checkNewDiscPosition } from "./game.animations.js";
import { SendMessage, ConnectSignalR } from "./game.chat.js";
if (localStorage.getItem("user") === null) {
    window.location.href = "/projects/connect-four/pages/";
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
    const color1 = localStorage.getItem("player1-color");
    const color2 = localStorage.getItem("player2-color");
    const body = document.querySelector("body");
    if (color1 != null && color2 != null) {
        body.style.setProperty("--color-player1", color1);
        body.style.setProperty("--color-player2", color2);
    }
    await setUpGame(game, user);
});
async function gameSync() {
    const prevGame = JSON.parse(localStorage.getItem("prevGame"));
    const game = await getGame();
    const possibleMoves = await getAllPossibleMoves(game);
    if (prevGame !== null) {
        const discPos = checkNewDiscPosition(game, prevGame);
        if (discPos != null && discPos.length !== 0) {
            discAnimation(discPos, game, possibleMoves);
        }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("prevGame", JSON.stringify(game));
    switchPlayerTurn(game, user.user);
    checkGameFinished(game);
}
export { gameSync };
//# sourceMappingURL=game.js.map