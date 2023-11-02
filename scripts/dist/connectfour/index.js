"use strict";
import { BACKEND_URL } from "./config.js";
document.addEventListener("DOMContentLoaded", () => {
    const checkEmail = document.getElementById("email");
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
    checkEmail.addEventListener("keyup", validateEmail);
    checkPassword.addEventListener("keyup", validatePassword);
    checkEmail.addEventListener("focusout", checkAllValidation);
    checkPassword.addEventListener("focusout", checkAllValidation);
    const submit = document.querySelector("#sendRequest");
    if (submit === null) {
        console.error("Submit button not found");
        return;
    }
    submit.disabled = true;
    submit.addEventListener("click", doUserLogin);
});
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
function validatePassword() {
    const submitButton = document.getElementById("sendRequest");
    if (submitButton === null) {
        console.error("Submit button not found");
        return false;
    }
    submitButton.disabled = true;
    const target = document.getElementById("password");
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
    checkAllValidation();
}
function checkAllValidation() {
    const submitButton = document.getElementById("sendRequest");
    if (submitButton === null) {
        console.error("Submit button not found");
        return false;
    }
    submitButton.disabled = true;
    if (!validateEmail()) {
        return false;
    }
    submitButton.disabled = false;
    return true;
}
async function doUserLogin() {
    if (!checkAllValidation()) {
        return;
    }
    const url = BACKEND_URL + "Authentication/token";
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    if (email === null) {
        console.error("Email input not found");
        return;
    }
    if (password === null) {
        console.error("Password input not found");
        return;
    }
    const login = { Email: email.value, Password: password.value };
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).catch((error) => showError(error));
    if (!response)
        return;
    if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/projects/connect-four/pages/waitingroom";
    }
    else {
        showError("Invalid email or password");
    }
}
function showError(message) {
    const error = document.getElementById("errorMessage");
    if (error === null) {
        console.error("Error message not found");
        return;
    }
    error.classList.remove("d-none");
    error.innerHTML = message;
    console.error(message);
}
//# sourceMappingURL=index.js.map