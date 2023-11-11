import { BACKEND_URL } from "../shoppinglist/shared/config.js";
document.addEventListener("DOMContentLoaded", () => {
    const verifyPassword = document.querySelector("#password-verify");
    const registerButton = document.querySelector("#register");
    verifyPassword.addEventListener("input", CheckIfPasswordsMatch);
    registerButton.addEventListener("click", RegisterUser);
});
function CheckIfPasswordsMatch() {
    const password = document.querySelector("#password");
    const verifyPassword = document.querySelector("#password-verify");
    if (password.value !== verifyPassword.value) {
        verifyPassword.setCustomValidity("Passwords do not match");
        const registerButton = document.querySelector("#register");
        registerButton.disabled = true;
    }
    else {
        verifyPassword.setCustomValidity("");
        const registerButton = document.querySelector("#register");
        registerButton.disabled = false;
    }
    verifyPassword.reportValidity();
}
async function RegisterUser() {
    const username = document.querySelector("#name").value.trim();
    if (username.length === 0) {
        return;
    }
    const password = document.querySelector("#password");
    if (password.value.length === 0) {
        return;
    }
    const registerRequest = {
        name: username,
        password: password.value,
    };
    const response = await fetch(BACKEND_URL + "Account/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerRequest),
    });
    if (response.status !== 200) {
        const error = await response.text();
        console.error(error);
        return;
    }
    const user = (await response.json());
    console.log(user);
    localStorage.setItem("shoppinglist-user", JSON.stringify(user));
    window.location.href = "/projects/shopping-list/pages/join-family/";
}
//# sourceMappingURL=DoRegister.js.map