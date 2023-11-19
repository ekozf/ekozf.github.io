import ToastType from "./types/ToastType.js";

declare const bootstrap: any;

function CreateToast(message: string, type: ToastType) {
	// Create the toast
	const toast = document.createElement("div");

	toast.classList.add("toast");
	toast.setAttribute("role", "alert");
	toast.setAttribute("aria-live", "assertive");
	toast.setAttribute("aria-atomic", "true");
	toast.setAttribute("data-bs-delay", "1500");

	const toastHeader = document.createElement("div");

	toastHeader.classList.add("toast-header");

	const toastStrong = document.createElement("strong");

	if (type == ToastType.Success) {
		toastStrong.classList.add("me-auto", "text-success");
		toastStrong.textContent = "Success!";
	} else if (type == ToastType.Error) {
		toastStrong.classList.add("me-auto", "text-danger");
		toastStrong.textContent = "Error!";
	} else {
		toastStrong.classList.add("me-auto", "text-info");
		toastStrong.textContent = "Information!";
	}

	toastHeader.appendChild(toastStrong);

	const toastSmall = document.createElement("small");

	toastSmall.classList.add("text-body-secondary");

	const toastButton = document.createElement("button");

	toastButton.setAttribute("type", "button");
	toastButton.classList.add("btn-close");
	toastButton.setAttribute("data-bs-dismiss", "toast");
	toastButton.setAttribute("aria-label", "Close");

	toastSmall.appendChild(toastButton);

	toastHeader.appendChild(toastSmall);

	toast.appendChild(toastHeader);

	const toastBody = document.createElement("div");

	toastBody.classList.add("toast-body");
	toastBody.textContent = message;

	toast.appendChild(toastBody);

	// Add Toast to the container
	const toastContainer = document.querySelector(
		"#toastContainer"
	) as HTMLDivElement;

	toastContainer.appendChild(toast);

	bootstrap.Toast.getOrCreateInstance(toast).show();
}

export default CreateToast;
