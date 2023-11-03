function InvitePlayer(username: string, userId: string) {
	// Get the user and message from the input fields
	const user = JSON.parse(localStorage.getItem("user")).user;

	console.log(
		`You (${user.nickName}) invited ${username} (${userId}) to play a game!`
	);
}

export { InvitePlayer };
