import { updateGameBoard } from "./game.update.js";

/**
 * Function to get the location of the disc that was just placed
 *
 * @param {IGame} game Current version of the game
 * @param {IGame} prevGame Previous version of the game
 * @returns
 */
function checkNewDiscPosition(game: GameModel, prevGame: GameModel) {
	for (let i = 0; i < game.grid.numberOfRows; i++) {
		for (let j = 0; j < game.grid.numberOfColumns; j++) {
			const prevCell = prevGame.grid.cells[i][j];
			const currCell = game.grid.cells[i][j];

			if (
				prevCell?.Color == currCell?.Color &&
				prevCell?.Type == currCell?.Type
			) {
				continue;
			}

			return [i, j];
		}
	}

	return [];
}

/**
 *
 * @param {Number[]} discPos
 * @param {IGame} game
 * @param {IMove[]} possibleMoves
 * @returns
 */
function discAnimation(
	discPos: number[],
	game: GameModel,
	possibleMoves: MoveModel[]
) {
	const discAnimation = document.getElementById("discAnimation");

	const table = document.querySelector(
		"#grid_output > table"
	) as HTMLTableElement;

	const cell = table.rows[discPos[0]].cells[discPos[1]];
	const color = game.grid.cells[discPos[0]][discPos[1]];

	if (!color) {
		localStorage.removeItem("prevGame");
		return;
	}

	if (color.Color === 1) {
		discAnimation.classList.add("player1-color");
		discAnimation.classList.remove("player2-color");
	} else {
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
