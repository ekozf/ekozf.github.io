document.addEventListener("DOMContentLoaded", () => {
	const allStretched = document.querySelectorAll(".stretched-link");

	allStretched.forEach((item) => {
		item.addEventListener("click", (e) => {
			e.preventDefault();

			const id = item.getAttribute("data-target");

			showDialog(id);
		});
	});

	const allDialogs = document.querySelectorAll(
		"dialog"
	) as NodeListOf<HTMLDialogElement>;

	allDialogs.forEach((item) => {
		const button = item.querySelector("button.close-dialog");

		button.addEventListener("click", () => {
			item.close();
		});
	});
});

function showDialog(id: string) {
	const modal = document.getElementById(id) as HTMLDialogElement;

	modal.showModal();
}
