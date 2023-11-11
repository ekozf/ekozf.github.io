import { BACKEND_URL } from "../shoppinglist/shared/config.js";

document.addEventListener("DOMContentLoaded", async () => {
	const user = JSON.parse(localStorage.getItem("shoppinglist-user"));

	if (user === null) {
		window.location.href = "/projects/shopping-list/pages/";
	}

	if (user.familyCode === null || user.familyCode === undefined) {
		window.location.href = "/projects/shopping-list/pages/join-family";
	}

	const addButton = document.querySelector("#addItem");

	addButton.addEventListener("click", AddItem);
});

async function AddItem() {
	const name = document.querySelector("#item-name") as HTMLInputElement;

	if (name.value === "") {
		return;
	}

	const description = document.querySelector(
		"#item-description"
	) as HTMLInputElement;

	const quantity = document.querySelector("#item-quantity") as HTMLInputElement;

	if (
		quantity.value === "" ||
		isNaN(parseInt(quantity.value)) ||
		parseInt(quantity.value) < 1
	) {
		return;
	}

	const unit = document.querySelector("#select-unit") as HTMLSelectElement;

	if (unit.value === "") {
		return;
	}

	const store = document.querySelector("#select-store") as HTMLSelectElement;

	if (store.value === "") {
		return;
	}

	const category = document.querySelector(
		"#select-category"
	) as HTMLSelectElement;

	if (category.value === "") {
		return;
	}

	const image = document.querySelector("#item-image") as HTMLInputElement;

	const price = document.querySelector("#item-price") as HTMLInputElement;

	const user = JSON.parse(
		localStorage.getItem("shoppinglist-user")
	) as ShoppingUserModel;

	const createItemRequest: CreateShoppingItemRequest = {
		name: name.value,
		description: description.value,
		quantity: parseInt(quantity.value),
		unit: parseInt(unit.value),
		store: parseInt(store.value),
		category: parseInt(category.value),
		image: image.value,
		price: parseFloat(price.value),
		familyCode: user.familyCode,
		requestingUserId: user.id,
	};

	const response = await fetch(BACKEND_URL + "Shopping/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(createItemRequest),
	});

	if (response.status !== 200) {
		const error = await response.text();

		console.error(error);

		return;
	}

	window.location.href = "/projects/shopping-list/pages/items-list";
}
