document.addEventListener("DOMContentLoaded", () => {
	const item = document.querySelector("#item");

	item.textContent = localStorage.getItem("shoppinglist-navigate-details");
});
