import CreateToast from "./CreateToast.js";
import ToastType from "./types/ToastType.js";
document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.querySelector("#sendRequest");
    sendButton.onclick = SendRequest;
});
async function SendRequest() {
    const method = document.querySelector("#requestMethod");
    const url = document.querySelector("#requestUrl");
    const body = document.querySelector("#editor");
    const response = document.querySelector("#serverResponse");
    response.textContent = "Loading...";
    let serverResponse;
    try {
        if (method.value === "GET" || body.textContent === "") {
            serverResponse = await MakeRequest(url.value, method.value);
        }
        else {
            const json = JSON.parse(body.textContent);
            serverResponse = await MakeRequest(url.value, method.value, json);
        }
    }
    catch {
        CreateToast("Error: Invalid Request", ToastType.Error);
        return;
    }
    if (serverResponse.ok) {
        const pretty = JSON.stringify(await serverResponse.json(), undefined, 4);
        response.textContent = pretty;
        response.removeAttribute("data-highlighted");
        hljs.highlightAll();
        CreateToast("Successfully sent request!", ToastType.Success);
    }
    else {
        CreateToast(`Error: ${serverResponse.status} ${serverResponse.statusText}`, ToastType.Error);
    }
    document.querySelector("#httpResponse").scrollIntoView();
}
async function MakeRequest(url, method, body = "") {
    let options;
    if (method === "GET") {
        options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        };
    }
    else {
        options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
    }
    const serverResponse = await fetch(url, options);
    return serverResponse;
}
//# sourceMappingURL=sender.js.map