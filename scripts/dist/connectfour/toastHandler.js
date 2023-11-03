document.addEventListener("DOMContentLoaded", () => {
    const toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-container", "position-absolute", "bottom-0", "end-0", "m-3");
    toastContainer.id = "ToastContainer";
    document.body.appendChild(toastContainer);
});
function CreateToastMsg(msg, isError = true) {
    if (isError) {
        console.error(msg);
    }
    else {
        console.log(msg);
    }
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.role = "alert";
    toast.ariaLive = "assertive";
    toast.ariaAtomic = "true";
    const toastImage = document.createElement("img");
    if (isError) {
        toastImage.src = "/projects/connect-four/assets/cross-icon.svg";
    }
    else {
        toastImage.src = "/projects/connect-four/assets/check-mark.svg";
    }
    toastImage.classList.add("rounded", "me-2");
    toastImage.style.width = "2rem";
    const toastHeader = document.createElement("div");
    toastHeader.classList.add("toast-header");
    const toastTitle = document.createElement("strong");
    toastTitle.classList.add("me-auto");
    if (isError) {
        toastTitle.textContent = "Error";
    }
    else {
        toastTitle.textContent = "Success";
    }
    const toastCloseButton = document.createElement("button");
    toastCloseButton.type = "button";
    toastCloseButton.classList.add("btn-close");
    toastCloseButton.dataset.bsDismiss = "toast";
    toastCloseButton.ariaLabel = "Close";
    const toastBody = document.createElement("div");
    toastBody.classList.add("toast-body");
    toastBody.textContent = msg;
    toastHeader.appendChild(toastImage);
    toastHeader.appendChild(toastTitle);
    toastHeader.appendChild(toastCloseButton);
    toast.appendChild(toastHeader);
    toast.appendChild(toastBody);
    const toastContainer = document.getElementById("ToastContainer");
    if (toastContainer) {
        toastContainer.appendChild(toast);
        const toastInstance = bootstrap.Toast.getOrCreateInstance(toast);
        toastInstance.show();
    }
}
export default CreateToastMsg;
//# sourceMappingURL=toastHandler.js.map