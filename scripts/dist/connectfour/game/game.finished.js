import { BACKEND_URL } from "../config.js";
async function finishGame(game) {
    const gameResult = document.getElementById("gameResult");
    const gameHeader = document.getElementById("gameHeader");
    const discAnimation = document.getElementById("discAnimation");
    discAnimation.style.visibility = "hidden";
    const user = JSON.parse(localStorage.getItem("user")).user;
    if (game.grid.winningConnections.length === 0) {
        drawGame();
        return;
    }
    const winner = game.grid.winningConnections[0].color;
    const isWinner = (winner == 1 && game.player1.id == user.id) ||
        (winner == 2 && game.player2.id == user.id);
    if (isWinner) {
        gameResult.classList.add("victory");
        gameHeader.classList.add("victory");
        gameResult.innerText = "Victory!";
        gameHeader.innerText = "You won!";
        await updateLeaderboardWithGame(game.id);
    }
    else {
        gameResult.classList.add("defeat");
        gameHeader.classList.add("defeat");
        gameResult.innerText = "Defeat...";
        gameHeader.innerText = "You lost...";
    }
    gameHeader.classList.remove("d-none");
    const dialog = document.getElementById("gameDialog");
    highlightWinningConnection(game.grid.winningConnections);
    setTimeout(() => {
        dialog.showModal();
    }, 2500);
}
function highlightWinningConnection(winningConnections) {
    const table = document.querySelector("#grid_output > table");
    for (let i = 0; i < winningConnections.length; i++) {
        const winningConnection = winningConnections[i];
        const rowDiff = winningConnection.to.row - winningConnection.from.row;
        const columnDiff = winningConnection.to.column - winningConnection.from.column;
        if (rowDiff == 0) {
            for (let i = winningConnection.from.column; i <= winningConnection.to.column; i++) {
                table.rows[winningConnection.from.row].cells[i].classList.add("winning");
            }
        }
        else if (columnDiff == 0) {
            for (let i = winningConnection.from.row; i <= winningConnection.to.row; i++) {
                table.rows[i].cells[winningConnection.from.column].classList.add("winning");
            }
        }
        else {
            let startRow = winningConnection.from.row;
            let startColumn = winningConnection.from.column;
            while (startRow != winningConnection.to.row &&
                startColumn != winningConnection.to.column) {
                startRow += rowDiff > 0 ? 1 : -1;
                startColumn += columnDiff > 0 ? 1 : -1;
                table.rows[startRow].cells[startColumn].classList.add("winning");
            }
            const fromCell = table.rows[winningConnection.from.row].cells[winningConnection.from.column];
            fromCell.classList.add("winning");
        }
    }
}
function drawGame() {
    const gameResult = document.getElementById("gameResult");
    const gameHeader = document.getElementById("gameHeader");
    gameResult.classList.add("draw");
    gameHeader.classList.add("draw");
    gameResult.innerText = "Draw!";
    gameHeader.innerText = "Draw!";
    gameHeader.classList.remove("d-none");
    const dialog = document.getElementById("gameDialog");
    setTimeout(() => {
        dialog.showModal();
    }, 3500);
}
async function updateLeaderboardWithGame(gameId) {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = BACKEND_URL + `Leaderboard/evaluate-game/${gameId}`;
    await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
    }).catch((error) => {
        console.error(error);
    });
}
export { finishGame };
//# sourceMappingURL=game.finished.js.map