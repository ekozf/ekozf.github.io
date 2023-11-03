"use strict";
function InjectHelpButton() {
    const helpButton = CreateHelpButton();
    let dialog;
    if (!window.location.href.includes("settings")) {
        dialog = CreateRulesDialog();
    }
    else {
        dialog = CreateSettingsDialog();
    }
    dialog.onclick = (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    };
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(helpButton);
    body.appendChild(dialog);
}
function CreateHelpButton() {
    const helpButton = document.createElement("button");
    const icon = document.createElement("img");
    icon.classList.add("question-icon");
    icon.src = "/projects/connect-four/assets/question-mark-solid.svg";
    helpButton.appendChild(icon);
    helpButton.id = "injected-gameHelpBtn";
    helpButton.classList.add("btn", "btn-primary", "shadow", "text-white");
    helpButton.onclick = function () {
        const help = document.getElementById("injected-gameHelpDialog");
        help.showModal();
    };
    return helpButton;
}
function CreateSettingsDialog() {
    const dialog = document.createElement("dialog");
    dialog.id = "injected-gameHelpDialog";
    const title = document.createElement("h1");
    title.innerText = "Settings";
    const list = document.createElement("ul");
    const listItems = [
        "You can't select the same colors",
        "Duration must be between 0 - 1000",
    ];
    listItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = item;
        list.appendChild(listItem);
    });
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("d-flex", "justify-content-center", "shadow");
    const closeButton = document.createElement("button");
    closeButton.innerText = "I understand, let's play!";
    closeButton.classList.add("btn", "btn-success");
    closeButton.onclick = function () {
        dialog.close();
    };
    buttonContainer.appendChild(closeButton);
    dialog.appendChild(title);
    dialog.appendChild(list);
    dialog.appendChild(buttonContainer);
    return dialog;
}
function CreateRulesDialog() {
    const dialog = document.createElement("dialog");
    dialog.id = "injected-gameHelpDialog";
    const title = document.createElement("h1");
    title.innerText = "How to play";
    const list = document.createElement("ul");
    const listItems = [
        "The goal is to get <b>the chosen amount</b> of discs of your color in a row and prevent your opponent from doing so",
        "A winning row can be <b>vertical</b>, <b>horizontal</b> or <b>diagonal</b>",
        "By <b>hovering</b> over a vertical column it will highlight, if you press <b>left click</b> a disc of your color will be placed at the lowest possible spot in that column",
        "The players will place discs <b>in turns</b>",
        "You can only place a disc when it is your turn (this is indicated on the left)",
    ];
    listItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = item;
        list.appendChild(listItem);
    });
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("d-flex", "justify-content-center");
    const closeButton = document.createElement("button");
    closeButton.innerText = "I understand, let's play!";
    closeButton.classList.add("btn", "btn-success");
    closeButton.onclick = function () {
        dialog.close();
    };
    buttonContainer.appendChild(closeButton);
    dialog.appendChild(title);
    dialog.appendChild(list);
    dialog.appendChild(buttonContainer);
    return dialog;
}
InjectHelpButton();
//# sourceMappingURL=help.js.map