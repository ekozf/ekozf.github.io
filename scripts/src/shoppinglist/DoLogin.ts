import { BACKEND_URL } from "../shoppinglist/shared/config.js";

document.addEventListener("DOMContentLoaded", () => {
	const user = JSON.parse(
		localStorage.getItem("shoppinglist-user")
	) as ShoppingUserModel;

	if (user !== null) {
		window.location.href = "/projects/shopping-list/pages/join-family";
	}

	const loginButton = document.querySelector("#login") as HTMLButtonElement;

	loginButton.addEventListener("click", LoginUser);
});

async function LoginUser() {
	const username = (
		document.querySelector("#name") as HTMLInputElement
	).value.trim();

	if (username.length === 0) {
		return;
	}

	const password = document.querySelector("#password") as HTMLInputElement;

	if (password.value.length === 0) {
		return;
	}

	const loginRequest: LoginUserRequest = {
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

	const user = (await response.json()) as ShoppingUserModel;

	console.log(user);

	localStorage.setItem("shoppinglist-user", JSON.stringify(user));

	window.location.href = "/projects/shopping-list/pages/join-family";
}
