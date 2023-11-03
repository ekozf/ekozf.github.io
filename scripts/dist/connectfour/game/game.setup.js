import { gameSync } from "./game.js";
import { getAllPossibleMoves, slideDiscIn, updateGameBoard, } from "./game.update.js";
async function setUpGame(game, user) {
    const colorSpan = document.getElementById("player-color");
    const playerTurn = document.getElementById("player-turn");
    colorSpan.innerHTML = "Your Color";
    if (user.id == game.player1.id) {
        colorSpan.classList.add("player1-color");
    }
    else {
        colorSpan.classList.add("player2-color");
    }
    if (game.playerToPlayId == user.id) {
        playerTurn.innerHTML = "Your turn";
        playerTurn.classList.add("player1-color");
    }
    else {
        playerTurn.innerHTML = "Opponent turn";
        playerTurn.classList.add("player2-color");
    }
    createGrid(game.grid.numberOfRows, game.grid.numberOfColumns);
    if (localStorage.getItem("gameSyncInterval") === null) {
        const gameSyncInterval = setInterval(async () => {
            await gameSync();
        }, 1000);
        localStorage.setItem("gameSyncInterval", String(gameSyncInterval));
    }
    else {
        clearInterval(Number(localStorage.getItem("gameSyncInterval")));
        const gameSyncInterval = setInterval(async () => {
            await gameSync();
        }, 1000);
        localStorage.setItem("gameSyncInterval", String(gameSyncInterval));
    }
    updateGameBoard(game, await getAllPossibleMoves(game));
    fillThePlayers();
}
function createGrid(rows, columns) {
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
function highlightHoveringColumn(column) {
    const table = document.querySelector("#grid_output table");
    for (let i = 0; i < table.rows.length; i++) {
        const td = table.rows[i].cells[column];
        td.classList.add("possible-column");
    }
}
function removeColumnHighlight(column) {
    const table = document.querySelector("#grid_output table");
    for (let i = 0; i < table.rows.length; i++) {
        const td = table.rows[i].cells[column];
        td.classList.remove("possible-column");
    }
}
export { setUpGame };
//# sourceMappingURL=game.setup.js.map