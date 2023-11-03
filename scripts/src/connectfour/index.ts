import { BACKEND_URL } from "./config.js";
import CreateToastMsg from "./toastHandler.js";

document.addEventListener("DOMContentLoaded", () => {
	// Get the input for the check password
	const checkEmail = document.getElementById("email") as HTMLInputElement;

	if (checkEmail === null) {
		console.error("Email input not found");
		return;
	}

	if (localStorage.getItem("registeredEmail") !== null) {
		const storedEmail = localStorage.getItem("registeredEmail");

		if (storedEmail === null) {
			console.log("Stored email found: " + storedEmail);
			return;
		}

		checkEmail.value = storedEmail;
	}

	const checkPassword = document.getElementById("password");

	if (checkPassword === null) {
		console.error("Password input not found");
		return;
	}

	// Add an event listener to the email input
	checkEmail.addEventListener("keyup", ValidateEmail);
	checkPassword.addEventListener("keyup", ValidatePassword);

	// Add an event listeners to all inputs
	checkEmail.addEventListener("focusout", CheckAllValidation);
	checkPassword.addEventListener("focusout", CheckAllValidation);

	// Get the submit button and disable it
	const submit = document.querySelector("#sendRequest") as HTMLButtonElement;

	if (submit === null) {
		console.error("Submit button not found");
		return;
	}

	submit.disabled = true;

	submit.addEventListener("click", DoUserLogin);
});

/**
 * Checks if the email is valid
 * @returns {boolean}
 */
function ValidateEmail() {
	const target = document.getElementById("email") as HTMLInputElement;

	if (target.value === "" || !target.value.match(/.+@.+\..+/g)) {
		target.setCustomValidity("Email is invalid!");
		target.reportValidity();
		return false;
	}

	target.setCustomValidity("");

	return true;
}

/**
 * Checks if the first password is valid
 * @returns {boolean}
 */
function ValidatePassword() {
	const submitButton = document.getElementById(
		"sendRequest"
	) as HTMLButtonElement;

	if (submitButton === null) {
		console.error("Submit button not found");
		return false;
	}

	submitButton.disabled = true;

	const target = document.getElementById("password") as HTMLInputElement;

	if (target === null) {
		console.error("Password input not found");
		return false;
	}

	if (target.value.length < 6) {
		target.setCustomValidity("Password is too short (min 6)");
		target.reportValidity();
		return false;
	}

	target.setCustomValidity("");

	CheckAllValidation();
}

/**
 * Checks if all inputs are valid
 * @returns {boolean}
 */
function CheckAllValidation() {
	const submitButton = document.getElementById(
		"sendRequest"
	) as HTMLButtonElement;

	if (submitButton === null) {
		console.error("Submit button not found");
		return false;
	}

	submitButton.disabled = true;

	if (!ValidateEmail()) {
		return false;
	}

	submitButton.disabled = false;

	return true;
}

async function DoUserLogin() {
	// Verify all inputs
	if (!CheckAllValidation()) {
		return;
	}

	const url = BACKEND_URL + "Authentication/token";
	const email = document.getElementById("email") as HTMLInputElement;
	const password = document.getElementById("password") as HTMLInputElement;

	if (email === null) {
		console.error("Email input not found");
		return;
	}

	if (password === null) {
		console.error("Password input not found");
		return;
	}

	// LoginModel is defined in the backend
	const login: LoginModel = { Email: email.value, Password: password.value };

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(login),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	}).catch((error) => CreateToastMsg(error));

	// Check if the response is valid
	if (!response) return;

	// Check if the response is ok
	if (response.ok) {
		const user: UserModel = await response.json();
		localStorage.setItem("user", JSON.stringify(user));
		window.location.href = "/projects/connect-four/pages/waitingroom";
	} else {
		CreateToastMsg("Invalid email or password");
	}
}
