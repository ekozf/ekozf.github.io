import { BACKEND_URL } from "./config.js";
import CreateToastMsg from "./toastHandler.js";
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
    checkEmail.addEventListener("keyup", ValidateEmail);
    checkPassword.addEventListener("keyup", ValidatePassword);
    checkEmail.addEventListener("focusout", CheckAllValidation);
    checkPassword.addEventListener("focusout", CheckAllValidation);
    const submit = document.querySelector("#sendRequest");
    if (submit === null) {
        console.error("Submit button not found");
        return;
    }
    submit.disabled = true;
    submit.addEventListener("click", DoUserLogin);
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
    CheckAllValidation();
}
function CheckAllValidation() {
    const submitButton = document.getElementById("sendRequest");
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
    if (!CheckAllValidation()) {
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
    }).catch((error) => CreateToastMsg(error));
    if (!response)
        return;
    if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/projects/connect-four/pages/waitingroom";
    }
    else {
        CreateToastMsg("Invalid email or password");
    }
}
//# sourceMappingURL=index.js.map