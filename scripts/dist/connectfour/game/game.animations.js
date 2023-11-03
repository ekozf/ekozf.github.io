import { updateGameBoard } from "./game.update.js";
function checkNewDiscPosition(game, prevGame) {
    for (let i = 0; i < game.grid.numberOfRows; i++) {
        for (let j = 0; j < game.grid.numberOfColumns; j++) {
            const prevCell = prevGame.grid.cells[i][j];
            const currCell = game.grid.cells[i][j];
            if (prevCell?.Color == currCell?.Color &&
                prevCell?.Type == currCell?.Type) {
                continue;
            }
            return [i, j];
        }
    }
    return [];
}
function discAnimation(discPos, game, possibleMoves) {
    const discAnimation = document.getElementById("discAnimation");
    const table = document.querySelector("#grid_output > table");
    const cell = table.rows[discPos[0]].cells[discPos[1]];
    const color = game.grid.cells[discPos[0]][discPos[1]];
    if (!color) {
        localStorage.removeItem("prevGame");
        return;
    }
    if (color.Color === 1) {
        discAnimation.classList.add("player1-color");
        discAnimation.classList.remove("player2-color");
    }
    else {
        discAnimation.classList.add("player2-color");
        discAnimation.classList.remove("player1-color");
    }
    const { x, y } = cell.getClientRects()[0];
    discAnimation.style.left = x + "px";
    discAnimation.style.top = y + "px";
    const fallAnimation = [
        { transform: "translate(0px, -75vh)" },
        { transform: "translate(0px, 0px)" },
    ];
    const animationDuration = localStorage.getItem("animation-duration")
        ? Number(localStorage.getItem("animation-duration"))
        : 500;
    const fallTiming = {
        duration: animationDuration,
        iterations: 1,
        easing: "ease-in",
    };
    discAnimation.style.visibility = "visible";
    discAnimation.animate(fallAnimation, fallTiming);
    setTimeout(() => {
        updateGameBoard(game, possibleMoves);
        discAnimation.style.visibility = "hidden";
    }, animationDuration + 50);
}
export { discAnimation, checkNewDiscPosition };
//# sourceMappingURL=game.animations.js.map