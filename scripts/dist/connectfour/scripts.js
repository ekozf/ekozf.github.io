"use strict";
document.addEventListener("DOMContentLoaded", () => {
    checkIfUserIsLoggedIn();
    checkIfUserIsInGame();
});
function checkIfUserIsLoggedIn() {
    const isLoggedIn = localStorage.getItem("user");
    const loginMobile = document.getElementById("login-mobile");
    const loginDesktop = document.getElementById("login-large");
    if (loginMobile === null || loginDesktop === null) {
        return;
    }
    if (isLoggedIn) {
        loginDesktop.textContent = "Logout";
        loginMobile.textContent = "Logout";
        loginDesktop.addEventListener("click", logout);
        loginMobile.addEventListener("click", logout);
        loginDesktop.href = "#";
        loginMobile.href = "#";
        const homeButton = document.getElementById("home-link");
        if (homeButton === null) {
            return;
        }
        homeButton.href = "/projects/connect-four/pages/waitingroom/";
    }
    else {
        loginDesktop.style.display = "block";
        loginMobile.style.display = "block";
    }
}
function checkIfUserIsInGame() {
    const gameId = localStorage.getItem("gameId");
    const game = document.getElementById("game-link");
    if (gameId === null) {
        game.style.display = "none";
    }
    else {
        game.style.display = "block";
    }
}
function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("gameId");
    window.location.href = "/projects/connect-four/pages/";
}
//# sourceMappingURL=scripts.js.map