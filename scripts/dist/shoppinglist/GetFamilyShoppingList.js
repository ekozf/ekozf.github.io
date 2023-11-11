import { BACKEND_URL } from "../shoppinglist/shared/config.js";
document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("shoppinglist-user"));
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
    const user = JSON.parse(localStorage.getItem("shoppinglist-user"));
    const getFamilyItemsRequest = {
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
    const familyItems = (await response.json());
    console.log(familyItems);
}
function SwitchPages(event) {
    let target = event.target;
    if (!(event.target instanceof HTMLAnchorElement)) {
        target = event.target.parentNode;
    }
    const navButtons = document.querySelectorAll("footer > a");
    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].classList.remove("active");
    }
    target.classList.add("active");
    const showPage = target.dataset.showPage;
    const pages = document.querySelectorAll("#main-container main");
    for (let i = 0; i < pages.length; i++) {
        const element = pages[i];
        if (element.dataset.pageId === showPage) {
            element.classList.remove("d-none");
        }
        else {
            element.classList.add("d-none");
        }
    }
}
//# sourceMappingURL=GetFamilyShoppingList.js.map