import ToastType from "./types/ToastType.js";
function CreateToast(message, type) {
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
    }
    else if (type == ToastType.Error) {
        toastStrong.classList.add("me-auto", "text-danger");
        toastStrong.textContent = "Error!";
    }
    else {
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
    const toastContainer = document.querySelector("#toastContainer");
    toastContainer.appendChild(toast);
    bootstrap.Toast.getOrCreateInstance(toast).show();
}
export default CreateToast;
//# sourceMappingURL=CreateToast.js.map