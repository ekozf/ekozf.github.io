import { BACKEND_URL } from "../shoppinglist/shared/config.js";
document.addEventListener("DOMContentLoaded", () => {
    const createFamilyButton = document.querySelector("#create");
    createFamilyButton.addEventListener("click", CreateFamily);
});
async function CreateFamily() {
    const code = document.querySelector("#code").value.trim();
    if (code.length === 0) {
        return;
    }
    const user = JSON.parse(localStorage.getItem("shoppinglist-user"));
    const createFamilyRequest = {
        familyCode: code,
    };
    const responseCreate = await fetch(BACKEND_URL + "Family/create-family", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createFamilyRequest),
    });
    if (responseCreate.status !== 200) {
        const error = await responseCreate.text();
        console.error(error);
        return;
    }
    const joinFamilyRequest = {
        userId: user.id,
        familyCode: code,
    };
    const responseJoin = await fetch(BACKEND_URL + "Family/join-family", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(joinFamilyRequest),
    });
    if (responseJoin.status !== 200) {
        const error = await responseJoin.text();
        console.error(error);
        return;
    }
    const family = (await responseJoin.json());
    console.log(joinFamilyRequest);
    user.familyCode = family.familyCode;
    localStorage.setItem("shoppinglist-user", JSON.stringify(user));
    window.location.href = "/projects/shopping-list/pages/items-list";
}
//# sourceMappingURL=CreateFamily.js.map