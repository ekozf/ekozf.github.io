import { BACKEND_URL } from "../shoppinglist/shared/config.js";

document.addEventListener("DOMContentLoaded", () => {
	const user = JSON.parse(
		localStorage.getItem("shoppinglist-user")
	) as ShoppingUserModel;

	if (user === null) {
		window.location.href = "/projects/shopping-list/pages/login";
	}

	if (user.familyCode !== null && user.familyCode !== undefined) {
		window.location.href = "/projects/shopping-list/pages/items-list";
	}

	const joinFamilyButton = document.querySelector("#join") as HTMLButtonElement;

	joinFamilyButton.addEventListener("click", JoinFamily);
});

async function JoinFamily() {
	const code = (
		document.querySelector("#code") as HTMLInputElement
	).value.trim();

	if (code.length === 0) {
		return;
	}

	const user = JSON.parse(
		localStorage.getItem("shoppinglist-user")
	) as ShoppingUserModel;

	const joinFamilyRequest: JoinFamilyRequest = {
		userId: user.id,
		familyCode: code,
	};

	const response = await fetch(BACKEND_URL + "Family/join-family", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(joinFamilyRequest),
	});

	if (response.status !== 200) {
		const error = await response.text();

		console.error(error);

		return;
	}

	const family = (await response.json()) as JoinFamilyRequest;

	console.log(joinFamilyRequest);

	user.familyCode = family.familyCode;

	localStorage.setItem("shoppinglist-user", JSON.stringify(user));

	window.location.href = "/projects/shopping-list/pages/items-list";
}
