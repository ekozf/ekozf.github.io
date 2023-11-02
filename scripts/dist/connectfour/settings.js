"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const colorButton = document.getElementById("setupColor");
    colorButton.addEventListener("click", SaveSettings);
    LoadFromStorage();
});
async function ShowHelp() {
    const help = document.getElementById("help");
    if (help.style.visibility === "hidden") {
        help.style.visibility = "visible";
    }
    else {
        help.style.visibility = "hidden";
    }
}
function SaveAnimationDuration() {
    const animationDuration = document.getElementById("animationDuration").value;
    if (animationDuration === "") {
        ShowError("Animation duration can't be empty.");
        localStorage.setItem("animation-duration", String(500));
        return false;
    }
    const duration = Number(animationDuration);
    if (!duration) {
        ShowError("Animation duration can't be empty.");
        localStorage.setItem("animation-duration", String(500));
        return false;
    }
    if (duration < 0) {
        ShowError("Animation duration can't be negative.");
        localStorage.setItem("animation-duration", String(0));
        return false;
    }
    if (duration > 1000) {
        ShowError("Animation duration can't be greater than 1000.");
        localStorage.setItem("animation-duration", String(1000));
        return false;
    }
    localStorage.setItem("animation-duration", animationDuration);
    return true;
}
function SaveColors() {
    const playerColor = document.getElementById("playerColorSelect").value;
    const opponentColor = document.getElementById("opponentColorSelect").value;
    if (playerColor == opponentColor) {
        ShowError("Player and opponent color can't be the same.");
        return false;
    }
    localStorage.setItem("player1-color", playerColor);
    localStorage.setItem("player2-color", opponentColor);
    return true;
}
function SaveUrls() {
    const backendUrl = document.getElementById("backendUrl")
        .value;
    localStorage.setItem("backendUrl", backendUrl);
    return true;
}
function LoadFromStorage() {
    const playerColor = localStorage.getItem("player1-color");
    const opponentColor = localStorage.getItem("player2-color");
    document.getElementById("playerColorSelect").value =
        playerColor;
    document.getElementById("opponentColorSelect").value =
        opponentColor;
    const animationDuration = localStorage.getItem("animation-duration");
    if (animationDuration) {
        document.getElementById("animationDuration").value =
            animationDuration;
    }
    const backendUrl = localStorage.getItem("backendUrl");
    document.getElementById("backendUrl").value =
        backendUrl;
}
function ShowError(msg) {
    const errorMessageBox = document.getElementById("errorMessage");
    const successMessageBox = document.getElementById("successMessage");
    successMessageBox.classList.add("d-none");
    errorMessageBox.classList.remove("d-none");
    errorMessageBox.innerText = msg;
}
function HideError() {
    const errorMessageBox = document.getElementById("errorMessage");
    errorMessageBox.classList.add("d-none");
    const successMessageBox = document.getElementById("successMessage");
    successMessageBox.classList.remove("d-none");
}
function SaveSettings() {
    const savedColors = SaveColors();
    const savedDuration = SaveAnimationDuration();
    SaveUrls();
    if (savedColors && savedDuration) {
        HideError();
    }
}
//# sourceMappingURL=settings.js.map