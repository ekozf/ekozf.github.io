"use strict";
document.addEventListener("DOMContentLoaded", () => {
    CheckIfUserIsLoggedIn();
    CheckIfUserIsInGame();
});
function CheckIfUserIsLoggedIn() {
    const isLoggedIn = localStorage.getItem("user");
    const loginMobile = document.getElementById("login-mobile");
    const loginDesktop = document.getElementById("login-large");
    if (loginMobile === null || loginDesktop === null) {
        return;
    }
    if (isLoggedIn) {
        loginDesktop.textContent = "Logout";
        loginMobile.textContent = "Logout";
        loginDesktop.addEventListener("click", DoUserLogout);
        loginMobile.addEventListener("click", DoUserLogout);
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
function CheckIfUserIsInGame() {
    const gameId = localStorage.getItem("gameId");
    const game = document.getElementById("game-link");
    if (gameId === null) {
        game.style.display = "none";
    }
    else {
        game.style.display = "block";
    }
}
function DoUserLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("gameId");
    window.location.href = "/projects/connect-four/pages/";
}
//# sourceMappingURL=scripts.js.map