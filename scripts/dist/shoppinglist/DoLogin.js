import { BACKEND_URL } from "../shoppinglist/shared/config.js";
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("shoppinglist-user"));
    if (user !== null) {
        window.location.href = "/projects/shopping-list/pages/join-family";
    }
    const loginButton = document.querySelector("#login");
    loginButton.addEventListener("click", LoginUser);
});
async function LoginUser() {
    const username = document.querySelector("#name").value.trim();
    if (username.length === 0) {
        return;
    }
    const password = document.querySelector("#password");
    if (password.value.length === 0) {
        return;
    }
    const loginRequest = {
        name: username,
        password: password.value,
    };
    const response = await fetch(BACKEND_URL + "Account/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
    });
    if (response.status !== 200) {
        const error = await response.text();
        console.error(error);
        return;
    }
    const user = (await response.json());
    console.log(user);
    localStorage.setItem("shoppinglist-user", JSON.stringify(user));
    window.location.href = "/projects/shopping-list/pages/join-family";
}
//# sourceMappingURL=DoLogin.js.map