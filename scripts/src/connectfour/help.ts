/**
 * Injects a help button into the page and creates a dialog with the rules of the game
 */
function InjectHelpButton() {
	// Create the button and dialog
	const helpButton = CreateHelpButton();

	let dialog: HTMLDialogElement;

	if (!window.location.href.includes("settings")) {
		dialog = CreateRulesDialog();
	} else {
		dialog = CreateSettingsDialog();
	}

	// Close the dialog when clicking outside of it
	dialog.onclick = (event) => {
		if (event.target === dialog) {
			dialog.close();
		}
	};

	// Append the button and dialog to the body
	const body = document.getElementsByTagName("body")[0];

	body.appendChild(helpButton);
	body.appendChild(dialog);
}

/**
 * Creates a floating help button that opens a dialog with the rules of the game
 */
function CreateHelpButton() {
	const helpButton = document.createElement("button");

	// // Question mark icon
	const icon = document.createElement("img");
	icon.classList.add("question-icon");
	icon.src = "/projects/connect-four/assets/question-mark-solid.svg";

	helpButton.appendChild(icon);

	helpButton.id = "injected-gameHelpBtn";
	helpButton.classList.add("btn", "btn-primary", "shadow", "text-white");

	// Open the dialog when clicking the button
	helpButton.onclick = function () {
		const help = document.getElementById(
			"injected-gameHelpDialog"
		) as HTMLDialogElement;

		help.showModal();
	};

	return helpButton;
}

/**
 * Creates a new dialog element with the rules of the game
 */
function CreateSettingsDialog() {
	const dialog = document.createElement("dialog");
	dialog.id = "injected-gameHelpDialog";

	const title = document.createElement("h1");
	title.innerText = "Settings";

	const list = document.createElement("ul");

	// Rules of the game
	const listItems = [
		"You can't select the same colors",
		"Duration must be between 0 - 1000",
	];

	listItems.forEach((item) => {
		const listItem = document.createElement("li");
		listItem.innerHTML = item;
		list.appendChild(listItem);
	});

	// Wrapper for the button
	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("d-flex", "justify-content-center", "shadow");

	const closeButton = document.createElement("button");
	closeButton.innerText = "I understand, let's play!";
	closeButton.classList.add("btn", "btn-success");

	// Close the dialog when clicking the button
	closeButton.onclick = function () {
		dialog.close();
	};

	buttonContainer.appendChild(closeButton);

	dialog.appendChild(title);
	dialog.appendChild(list);
	dialog.appendChild(buttonContainer);

	return dialog;
}

/**
 * Creates a new dialog element with the rules of the game
 * @returns A dialog with the rules of the game
 */
function CreateRulesDialog() {
	const dialog = document.createElement("dialog");
	dialog.id = "injected-gameHelpDialog";

	const title = document.createElement("h1");
	title.innerText = "How to play";

	const list = document.createElement("ul");

	// Rules of the game
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

	// Wrapper for the button
	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("d-flex", "justify-content-center");

	const closeButton = document.createElement("button");
	closeButton.innerText = "I understand, let's play!";
	closeButton.classList.add("btn", "btn-success");

	// Close the dialog when clicking the button
	closeButton.onclick = function () {
		dialog.close();
	};

	buttonContainer.appendChild(closeButton);

	dialog.appendChild(title);
	dialog.appendChild(list);
	dialog.appendChild(buttonContainer);

	return dialog;
}

// Inject the help button and dialog
InjectHelpButton();
