document.addEventListener("DOMContentLoaded", () => {
	const urls = {
		"connectfour-api": "https://connectfour.emirkaan-web.eu/status",
		"raspberrypi-api": "https://api.emirkaan-web.eu/status",
	};

	for (const [key, url] of Object.entries(urls)) {
		const wrapper = document.querySelector(
			`[data-service='${key}']`
		) as HTMLDivElement;

		CheckProject(wrapper, url);
	}
});

async function CheckProject(wrapper: HTMLDivElement, url: string) {
	const response = await fetch(url);

	let failed = false;

	try {
		await response.json();
	} catch {
		failed = true;
	}

	const icon = wrapper.querySelector(".status-icon") as HTMLImageElement;
	const status = wrapper.querySelector("span") as HTMLSpanElement;

	icon.classList.remove("bg-primary");

	if (!failed) {
		icon.classList.add("bg-success");
		icon.src = "/resources/icons/check-mark.svg";
		status.innerHTML = "Online";
	} else {
		icon.classList.add("bg-danger");
		icon.src = "/resources/icons/exclamation-mark.svg";
		status.innerHTML = "Offline";
	}
}
