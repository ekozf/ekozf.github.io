import { BACKEND_URL } from "../shoppinglist/shared/config.js";

document.addEventListener("DOMContentLoaded", () => {
	const verifyPassword = document.querySelector(
		"#password-verify"
	) as HTMLInputElement;

	const registerButton = document.querySelector(
		"#register"
	) as HTMLButtonElement;

	verifyPassword.addEventListener("input", CheckIfPasswordsMatch);

	registerButton.addEventListener("click", RegisterUser);
});

function CheckIfPasswordsMatch() {
	const password = document.querySelector("#password") as HTMLInputElement;

	const verifyPassword = document.querySelector(
		"#password-verify"
	) as HTMLInputElement;

	if (password.value !== verifyPassword.value) {
		verifyPassword.setCustomValidity("Passwords do not match");

		const registerButton = document.querySelector(
			"#register"
		) as HTMLButtonElement;

		registerButton.disabled = true;
	} else {
		verifyPassword.setCustomValidity("");

		const registerButton = document.querySelector(
			"#register"
		) as HTMLButtonElement;

		registerButton.disabled = false;
	}

	// This is needed to make the validation work
	verifyPassword.reportValidity();
}

async function RegisterUser() {
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

	const registerRequest: RegisterUserRequest = {
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

	const user = (await response.json()) as ShoppingUserModel;

	console.log(user);

	localStorage.setItem("shoppinglist-user", JSON.stringify(user));

	window.location.href = "/projects/shopping-list/pages/join-family/";
}
