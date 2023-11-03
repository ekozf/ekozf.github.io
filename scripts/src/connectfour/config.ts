// Empty GUID
export const GUID_EMPTY = "00000000-0000-0000-0000-000000000000";

// Backend URL -- Change this to your own backend URL,
// currently using my own backend on the domain emirkaan-web.eu hosted via Raspberry Pi on Docker
const BACKEND_URL = "https://connectfour.emirkaan-web.eu/api/";

let backendUrl = BACKEND_URL;

// Check if the backend URL is set in the local storage
if (localStorage.getItem("backendUrl") !== null) {
	backendUrl = localStorage.getItem("backendUrl")!;

	// Check if the backend URL ends with 'api/'
	if (!backendUrl.endsWith("api/")) {
		backendUrl += "api/";

		// Set the backend URL in the local storage
		localStorage.setItem("backendUrl", backendUrl);
	}
}

// Export the backend URL
export { backendUrl as BACKEND_URL };
