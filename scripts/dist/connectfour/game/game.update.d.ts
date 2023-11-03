declare function slideDiscIn(column: number): Promise<void>;
declare function updateGameBoard(game: GameModel, possibleMoves: MoveModel[]): void;
declare function switchPlayerTurn(game: GameModel, user: ClientUserModel): void;
declare function getAllPossibleMoves(game: GameModel): Promise<MoveModel[]>;
declare function checkGameFinished(game: GameModel): void;
export { slideDiscIn, updateGameBoard, switchPlayerTurn, getAllPossibleMoves, checkGameFinished, };
//# sourceMappingURL=game.update.d.ts.map