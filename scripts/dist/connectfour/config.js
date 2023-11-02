export const GUID_EMPTY = "00000000-0000-0000-0000-000000000000";
const BACKEND_URL = "https://connectfour.emirkaan-web.eu/api/";
let backendUrl = BACKEND_URL;
if (localStorage.getItem("backendUrl") !== null) {
    backendUrl = localStorage.getItem("backendUrl");
    if (!backendUrl.endsWith("api/")) {
        backendUrl += "api/";
        localStorage.setItem("backendUrl", backendUrl);
    }
}
export { backendUrl as BACKEND_URL };
//# sourceMappingURL=config.js.map