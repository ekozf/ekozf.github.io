import { BACKEND_URL } from "../shoppinglist/shared/config.js";
import { CATEGORY_MAP } from "./shared/categories.js";
import { UNIT_MAP } from "./shared/units.js";

document.addEventListener("DOMContentLoaded", async () => {
	const user = JSON.parse(
		localStorage.getItem("shoppinglist-user")
	) as ShoppingUserModel;

	if (user === null) {
		window.location.href = "/projects/shopping-list/pages/";
	}

	if (user.familyCode === null || user.familyCode === undefined) {
		window.location.href = "/projects/shopping-list/pages/join-family";
	}

	GetFamilyItems();

	const navButtons = document.querySelectorAll("footer > a");

	for (let i = 0; i < navButtons.length; i++) {
		navButtons[i].addEventListener("click", (event) => SwitchPages(event));
	}
});

async function GetFamilyItems() {
	const user = JSON.parse(
		localStorage.getItem("shoppinglist-user")
	) as ShoppingUserModel;

	const getFamilyItemsRequest: BaseFamilyRequest = {
		familyCode: user.familyCode,
		userId: user.id,
	};

	const response = await fetch(BACKEND_URL + "Shopping/get-all-family", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(getFamilyItemsRequest),
	});

	if (response.status !== 200) {
		const error = await response.text();

		console.error(error);

		return;
	}

	const familyItems = (await response.json()) as ShoppingItemModel[];

	const allItemsList = document.querySelector("#all-items-list");

	const cards = BuildItemCards(familyItems);

	for (let i = 0; i < cards.length; i++) {
		allItemsList.appendChild(cards[i]);
	}

	const allCategoryList = document.querySelector("#list-category");

	const categoryCards = BuildCategoryItemCards(familyItems);

	for (let i = 0; i < categoryCards.length; i++) {
		allCategoryList.appendChild(categoryCards[i]);
	}

	console.log(familyItems);
}

function BuildCategoryItemCards(familyItems: ShoppingItemModel[]) {
	const cards = [];

	const groups = [...new Set(familyItems.map((item) => item.category))];

	for (let i = 0; i < groups.length; i++) {
		const group = groups[i];
		const items = familyItems.filter((item) => item.category === groups[i]);

		console.log(items);

		const wrapper = document.createElement("div");

		wrapper.classList.add("accordion-item");

		const header = document.createElement("h4");
		header.classList.add("accordion-header");

		const button = document.createElement("button");
		button.classList.add("accordion-button");
		button.type = "button";
		button.dataset.bsToggle = "collapse";
		button.dataset.bsTarget = "#collapse-" + group;
		button.setAttribute("aria-expanded", "false");
		button.setAttribute("aria-controls", "collapse-" + group);

		button.textContent = CATEGORY_MAP[group];

		const collapse = document.createElement("div");

		collapse.id = "collapse-" + group;
		collapse.classList.add("accordion-collapse", "collapse", "show");

		const body = document.createElement("div");

		body.classList.add("accordion-body");

		const itemCards = BuildItemCards(items);

		for (let k = 0; k < itemCards.length; k++) {
			body.appendChild(itemCards[k]);
		}

		collapse.appendChild(body);

		header.appendChild(button);

		wrapper.appendChild(header);
		wrapper.appendChild(collapse);

		cards.push(wrapper);
	}

	return cards;
}

function BuildItemCards(familyItems: ShoppingItemModel[]) {
	const cards = [];

	for (let i = 0; i < familyItems.length; i++) {
		const item = familyItems[i];

		const wrapper = document.createElement("div");

		wrapper.classList.add(
			"item-card",
			"mx-3",
			"mb-4",
			"rounded-3",
			"p-3",
			"d-flex",
			"justify-content-between",
			"shadow"
		);

		const checkWrapper = document.createElement("div");

		const checkbox = document.createElement("input");

		checkbox.type = "checkbox";
		checkbox.classList.add("form-check-input", "me-2", "shadow");
		checkbox.checked = item.isChecked;

		checkbox.addEventListener("change", () => CompleteItem(item));

		const innerSpan = document.createElement("span");
		innerSpan.textContent = item.name;

		checkWrapper.appendChild(checkbox);
		checkWrapper.appendChild(innerSpan);

		const amount = document.createElement("span");

		amount.textContent = item.quantity.toString() + " " + UNIT_MAP[item.unit];
		amount.classList.add("text-muted");

		const detailLink = document.createElement("a");

		detailLink.classList.add("shadow");

		detailLink.addEventListener("click", (event) => {
			event.preventDefault();

			localStorage.setItem("shoppinglist-navigate-details", item.id);

			window.location.href = "/projects/shopping-list/pages/item-details/";
		});

		const icon = document.createElement("img");

		icon.src = "/projects/shopping-list/assets/lines-icon.svg";
		icon.classList.add("justify-self-end");

		detailLink.appendChild(icon);

		wrapper.appendChild(checkWrapper);
		wrapper.appendChild(amount);
		wrapper.appendChild(detailLink);

		cards.push(wrapper);
	}

	return cards;
}

async function CompleteItem(item: ShoppingItemModel) {
	const response = await fetch(BACKEND_URL + "Shopping/complete", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: item.id, familyCode: item.familyCode }),
	});

	if (response.status !== 200) {
		const error = await response.text();

		console.error(error);

		return;
	}

	console.log("Item completed");
}

function SwitchPages(event: Event) {
	let target = event.target;

	if (!(event.target instanceof HTMLAnchorElement)) {
		target = (event.target as HTMLEmbedElement).parentNode;
	}

	const navButtons = document.querySelectorAll("footer > a");

	for (let i = 0; i < navButtons.length; i++) {
		navButtons[i].classList.remove("active");
	}

	(target as HTMLAnchorElement).classList.add("active");

	const showPage = (target as HTMLAnchorElement).dataset.showPage;

	const pages = document.querySelectorAll("#main-container main");

	for (let i = 0; i < pages.length; i++) {
		const element = pages[i] as HTMLElement;

		if (element.dataset.pageId === showPage) {
			element.classList.remove("d-none");
		} else {
			element.classList.add("d-none");
		}
	}
}
