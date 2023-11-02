"use strict";
import { BACKEND_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    // Get the input for the check password
    const checkPass = document.getElementById("check-pass");
    const checkPassword = document.getElementById("password");
    const checkEmail = document.getElementById("email");
    const username = document.getElementById("username");

    checkPassword.addEventListener("keyup", validatePassword);
    checkPass.addEventListener("keyup", validateVerifyPassword);
    checkEmail.addEventListener("keyup", validateEmail);
    username.addEventListener("keyup", validateUsername);

    // Add an event listeners to all inputs
    checkEmail.addEventListener("focusout", checkAllValidation);
    checkPassword.addEventListener("focusout", checkAllValidation);
    checkPass.addEventListener("focusout", checkAllValidation);
    username.addEventListener("focusout", checkAllValidation);

    // Get the submit button and disable it
    const submit = document.querySelector("#sendRequest");
    submit.disabled = true;
    submit.addEventListener("click", doRegisterUser);
});

/**
 * Checks if the email is valid
 * @returns {boolean}
 */
function validateEmail() {
    const target = document.getElementById("email");

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
function validatePassword() {
    const target = document.getElementById("password");
    const verify = document.getElementById("check-pass");

    if (target.value.length < 6) {
        target.setCustomValidity("Password is too short (min 6)");
        target.reportValidity();
        return false;
    }

    if (verify.length && verify.length !== 0) {
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
function validateVerifyPassword() {
    const target = document.getElementById("password");
    const verify = document.getElementById("check-pass");

    if (verify.value !== target.value) {
        verify.setCustomValidity("Passwords don't match");
        verify.reportValidity();
        return;
    }

    verify.setCustomValidity("");

    checkAllValidation();
}

/**
 * Checks if the username is valid
 * @returns {boolean}
 */
function validateUsername() {
    const target = document.getElementById("username");

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
function checkAllValidation() {
    const submitButton = document.getElementById("sendRequest");
    submitButton.disabled = true;

    if (validateEmail() && validateUsername() && validatePassword()) {
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
async function doRegisterUser() {
    if (!checkAllValidation()) return;

    // Build the url
    const url = BACKEND_URL + "Authentication/register";

    // Get the values from the inputs
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check the UserModel in the backend for the required fields
    const person = { NickName: name, Email: email, Password: password };

    // Send the request
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).catch((error) => showError(error)); // Catch any fetch errors and show them

    // Check if the response is valid
    if (!response) return;

    // Check if the response is ok
    if (response.ok) {
        // Registered successfully
        localStorage.setItem("registeredEmail", email);
        window.location = "./index.html";
    } else {
        // Response from server was not ok
        showError((await response.json()).message);
    }
}

/**
 * Show an error message to the user
 * @param {string} message
 */
function showError(message) {
    const error = document.getElementById("errorMessage");
    error.classList.remove("d-none");
    error.innerHTML = message;
    console.error(message);
}
