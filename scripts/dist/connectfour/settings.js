import { BACKEND_URL } from "./config.js";
import CreateToastMsg from "./toastHandler.js";
document.addEventListener("DOMContentLoaded", () => {
    const colorButton = document.getElementById("btnSubmitSettings");
    colorButton.addEventListener("click", SaveSettings);
    LoadFromStorage();
});
function SaveAnimationDuration() {
    const animationDuration = document.getElementById("animationDuration").value;
    if (animationDuration === "") {
        CreateToastMsg("Animation duration can't be empty.");
        localStorage.setItem("animation-duration", String(500));
        return false;
    }
    const duration = Number(animationDuration);
    if (!duration) {
        CreateToastMsg("Animation duration can't be empty.");
        localStorage.setItem("animation-duration", String(500));
        return false;
    }
    if (duration < 0) {
        CreateToastMsg("Animation duration can't be negative.");
        localStorage.setItem("animation-duration", String(0));
        return false;
    }
    if (duration > 1000) {
        CreateToastMsg("Animation duration can't be greater than 1000.");
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
        CreateToastMsg("Player and opponent color can't be the same.");
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
    if (!backendUrl) {
        document.getElementById("backendUrl").value =
            BACKEND_URL;
        return;
    }
    document.getElementById("backendUrl").value =
        backendUrl;
}
function SaveSettings() {
    const colorsSaved = SaveColors();
    const animationSaved = SaveAnimationDuration();
    const urlSaved = SaveUrls();
    if (!colorsSaved || !animationSaved || !urlSaved) {
        return;
    }
    CreateToastMsg("Settings saved", false);
}
//# sourceMappingURL=settings.js.map