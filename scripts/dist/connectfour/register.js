"use strict";
import { BACKEND_URL } from "./config.js";
document.addEventListener("DOMContentLoaded", () => {
    const checkPass = document.getElementById("check-pass");
    const checkPassword = document.getElementById("password");
    const checkEmail = document.getElementById("email");
    const username = document.getElementById("username");
    checkPassword.addEventListener("keyup", ValidatePassword);
    checkPass.addEventListener("keyup", ValidateVerifyPassword);
    checkEmail.addEventListener("keyup", ValidateEmail);
    username.addEventListener("keyup", ValidateUsername);
    checkEmail.addEventListener("focusout", CheckAllValidation);
    checkPassword.addEventListener("focusout", CheckAllValidation);
    checkPass.addEventListener("focusout", CheckAllValidation);
    username.addEventListener("focusout", CheckAllValidation);
    const submit = document.querySelector("#sendRequest");
    submit.disabled = true;
    submit.addEventListener("click", DoRegisterUser);
});
function ValidateEmail() {
    const target = document.getElementById("email");
    if (target.value === "" || !target.value.match(/.+@.+\..+/g)) {
        target.setCustomValidity("Email is invalid!");
        target.reportValidity();
        return false;
    }
    target.setCustomValidity("");
    return true;
}
function ValidatePassword() {
    const target = document.getElementById("password");
    const verify = document.getElementById("check-pass");
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
function ValidateVerifyPassword() {
    const target = document.getElementById("password");
    const verify = document.getElementById("check-pass");
    if (verify.value !== target.value) {
        verify.setCustomValidity("Passwords don't match");
        verify.reportValidity();
        return;
    }
    verify.setCustomValidity("");
    CheckAllValidation();
}
function ValidateUsername() {
    const target = document.getElementById("username");
    if (target.value === "") {
        target.setCustomValidity("Username is invalid!");
        target.reportValidity();
        return false;
    }
    target.setCustomValidity("");
    return true;
}
function CheckAllValidation() {
    const submitButton = document.getElementById("sendRequest");
    submitButton.disabled = true;
    if (ValidateEmail() && ValidateUsername() && ValidatePassword()) {
        submitButton.disabled = false;
        return true;
    }
    else {
        submitButton.disabled = true;
        return false;
    }
}
async function DoRegisterUser() {
    if (!CheckAllValidation())
        return;
    const url = BACKEND_URL + "Authentication/register";
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password")
        .value;
    const person = { NickName: name, Email: email, Password: password };
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).catch((error) => ShowError(error));
    if (!response)
        return;
    if (response.ok) {
        localStorage.setItem("registeredEmail", email);
        window.location.href = "/projects/connect-four/pages/";
    }
    else {
        ShowError((await response.json()).message);
    }
}
function ShowError(message) {
    const error = document.getElementById("errorMessage");
    error.classList.remove("d-none");
    error.innerHTML = message;
    console.error(message);
}
//# sourceMappingURL=register.js.map