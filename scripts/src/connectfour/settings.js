document.addEventListener("DOMContentLoaded", () => {
    const colorButton = document.getElementById("setupColor");
    colorButton.addEventListener("click", saveSettings);

    loadFromStorage();
});

async function showHelp() {
    const help = document.getElementById("help");
    if (help.style.visibility === "hidden") {
        help.style.visibility = "visible";
    } else {
        help.style.visibility = "hidden";
    }
}


function saveAnimationDuration() {
    const animationDuration =
        document.getElementById("animationDuration").value;

    if (!animationDuration) {
        showError("Animation duration can't be empty.");
        localStorage.setItem("animation-duration", 500);
        return false;
    }

    if (animationDuration < 0) {
        showError("Animation duration can't be negative.");
        localStorage.setItem("animation-duration", 0);
        return false;
    }

    if (animationDuration > 1000) {
        showError("Animation duration can't be greater than 1000.");
        localStorage.setItem("animation-duration", 1000);
        return false;
    }

    localStorage.setItem("animation-duration", animationDuration);

    return true;
}

function saveColors() {
    const playerColor = document.getElementById("playerColorSelect").value;
    const opponentColor = document.getElementById("opponentColorSelect").value;

    if (playerColor == opponentColor) {
        showError("Player and opponent color can't be the same.");
        return false;
    }

    localStorage.setItem("player1-color", playerColor);
    localStorage.setItem("player2-color", opponentColor);

    return true;
}

function saveUrls(){
    const backendUrl = document.getElementById("backendUrl").value;

    localStorage.setItem("backendUrl", backendUrl);

    return true;
}

function loadFromStorage() {
    const playerColor = localStorage.getItem("player1-color");
    const opponentColor = localStorage.getItem("player2-color");

    document.getElementById("playerColorSelect").value = playerColor;
    document.getElementById("opponentColorSelect").value = opponentColor;

    document.getElementById("playerColorSelect").onchange();
    document.getElementById("opponentColorSelect").onchange();

    const animationDuration = localStorage.getItem("animation-duration");

    if (animationDuration) {
        document.getElementById("animationDuration").value =
            Number(animationDuration);
    }

    const backendUrl = localStorage.getItem("backendUrl")
    document.getElementById("backendUrl").value = backendUrl;

    }

function showError(msg) {
    const errorMessageBox = document.getElementById("errorMessage");
    const successMessageBox = document.getElementById("successMessage");

    successMessageBox.classList.add("d-none");
    errorMessageBox.classList.remove("d-none");
    errorMessageBox.innerText = msg;
}

function hideError() {
    const errorMessageBox = document.getElementById("errorMessage");
    errorMessageBox.classList.add("d-none");

    const successMessageBox = document.getElementById("successMessage");
    successMessageBox.classList.remove("d-none");
}


function saveSettings() {
    const savedColors = saveColors();
    const savedDuration = saveAnimationDuration();
    const saveBackendUrl = saveUrls();

    if (savedColors && savedDuration) {
        hideError();
    }
}