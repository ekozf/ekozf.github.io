"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const allStretched = document.querySelectorAll(".stretched-link");
    allStretched.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const id = item.getAttribute("data-target");
            showDialog(id);
        });
    });
    const allDialogs = document.querySelectorAll("dialog");
    allDialogs.forEach((item) => {
        const button = item.querySelector("button.close-dialog");
        button.addEventListener("click", () => {
            item.close();
        });
    });
});
function showDialog(id) {
    const modal = document.getElementById(id);
    modal.showModal();
}
//# sourceMappingURL=modalHandler.js.map