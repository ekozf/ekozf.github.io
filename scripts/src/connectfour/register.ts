import { BACKEND_URL } from "./config.js";
import CreateToastMsg from "./toastHandler.js";

document.addEventListener("DOMContentLoaded", () => {
	// Get the input for the check password
	const checkPass = document.getElementById("form-verify-password");
	const checkPassword = document.getElementById("form-password");
	const checkEmail = document.getElementById("form-email");
	const username = document.getElementById("form-username");

	checkPassword.addEventListener("keyup", ValidatePassword);
	checkPass.addEventListener("keyup", ValidateVerifyPassword);
	checkEmail.addEventListener("keyup", ValidateEmail);
	username.addEventListener("keyup", ValidateUsername);

	// Add an event listeners to all inputs
	checkEmail.addEventListener("focusout", CheckAllValidation);
	checkPassword.addEventListener("focusout", CheckAllValidation);
	checkPass.addEventListener("focusout", CheckAllValidation);
	username.addEventListener("focusout", CheckAllValidation);

	// Get the submit button and disable it
	const submit = document.querySelector("#sendRequest") as HTMLButtonElement;
	submit.disabled = true;
	submit.addEventListener("click", DoRegisterUser);
});

/**
 * Checks if the email is valid
 * @returns {boolean}
 */
function ValidateEmail() {
	const target = document.getElementById("form-email") as HTMLInputElement;

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
	const target = document.getElementById("form-password") as HTMLInputElement;
	const verify = document.getElementById(
		"form-verify-password"
	) as HTMLInputElement;

	if (target.value.length < 6) {
		target.setCustomValidity("Password is too short (min 6)");
		target.reportValidity();
		return false;
	}

	if (verify.value.length && verify.value.length !== 0) {
		if (target.value !== verify.value) {
			target.setCustomValidity("Passwords don't match");
			target.reportValidity();
			return false;
		}
	}

	target.setCustomValidity("");

	return true;
}

/**
 * Checks if the second password is valid
 * @returns {boolean}
 */
function ValidateVerifyPassword() {
	const target = document.getElementById("form-password") as HTMLInputElement;
	const verify = document.getElementById(
		"form-verify-password"
	) as HTMLInputElement;

	if (verify.value !== target.value) {
		verify.setCustomValidity("Passwords don't match");
		verify.reportValidity();
		return;
	}

	verify.setCustomValidity("");

	CheckAllValidation();
}

/**
 * Checks if the username is valid
 * @returns {boolean}
 */
function ValidateUsername() {
	const target = document.getElementById("form-username") as HTMLInputElement;

	if (target.value === "") {
		target.setCustomValidity("Username is invalid!");
		target.reportValidity();
		return false;
	}

	target.setCustomValidity("");

	return true;
}

/**
 * Checks if all the inputs are valid and enables the submit button
 */
function CheckAllValidation() {
	const submitButton = document.getElementById(
		"sendRequest"
	) as HTMLButtonElement;

	submitButton.disabled = true;

	if (ValidateEmail() && ValidateUsername() && ValidatePassword()) {
		submitButton.disabled = false;
		return true;
	} else {
		submitButton.disabled = true;
		return false;
	}
}

/**
 * Sends a post request to the server to register a user
 */
async function DoRegisterUser() {
	if (!CheckAllValidation()) return;

	// Build the url
	const url = BACKEND_URL + "Authentication/register";

	// Get the values from the inputs
	const name = (document.getElementById("form-username") as HTMLInputElement)
		.value;
	const email = (document.getElementById("form-email") as HTMLInputElement)
		.value;
	const password = (
		document.getElementById("form-password") as HTMLInputElement
	).value;

	// Check the UserModel in the backend for the required fields
	const person: RegisterModel = {
		NickName: name,
		Email: email,
		Password: password,
	};

	// Send the request
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(person),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	}).catch((error) => CreateToastMsg(error)); // Catch any fetch errors and show them

	// Check if the response is valid
	if (!response) return;

	// Check if the response is ok
	if (response.ok) {
		// Registered successfully
		localStorage.setItem("registeredEmail", email);
		window.location.href = "/projects/connect-four/pages/";
	} else {
		// Response from server was not ok
		CreateToastMsg((await response.json()).message);
	}
}
