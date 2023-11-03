function InvitePlayer(username, userId) {
    const user = JSON.parse(localStorage.getItem("user")).user;
    console.log(`You (${user.nickName}) invited ${username} (${userId}) to play a game!`);
}
export { InvitePlayer };
//# sourceMappingURL=waitingroom.challenge.js.map