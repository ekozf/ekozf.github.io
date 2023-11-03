document.addEventListener("DOMContentLoaded", () => {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("toast-container", "position-absolute", "bottom-0", "end-0", "m-3");
    errorContainer.id = "ErrorContainer";
    document.body.appendChild(errorContainer);
});
function CreateErrorMsg(msg) {
    console.error(msg);
    const error = document.createElement("div");
    error.classList.add("toast");
    error.role = "alert";
    error.ariaLive = "assertive";
    error.ariaAtomic = "true";
    const errorHeader = document.createElement("div");
    errorHeader.classList.add("toast-header");
    const errorTitle = document.createElement("strong");
    errorTitle.classList.add("me-auto");
    errorTitle.textContent = "Error";
    const errorCloseButton = document.createElement("button");
    errorCloseButton.type = "button";
    errorCloseButton.classList.add("btn-close");
    errorCloseButton.dataset.bsDismiss = "toast";
    errorCloseButton.ariaLabel = "Close";
    const errorBody = document.createElement("div");
    errorBody.classList.add("toast-body");
    errorBody.textContent = msg;
    errorHeader.appendChild(errorTitle);
    errorHeader.appendChild(errorCloseButton);
    error.appendChild(errorHeader);
    error.appendChild(errorBody);
    const errorContainer = document.getElementById("ErrorContainer");
    if (errorContainer) {
        errorContainer.appendChild(error);
        const toast = bootstrap.Toast.getOrCreateInstance(error);
        toast.show();
    }
}
export default CreateErrorMsg;
//# sourceMappingURL=errorHandler.js.map