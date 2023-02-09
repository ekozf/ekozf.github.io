function toggleDarkMode(isToggled) {
    const moon = document.querySelector("#moon");
    const sun = document.querySelector("#sun");
    const lightCode = document.querySelector("#light-code");
    const darkCode = document.querySelector("#dark-code");
    if (!isToggled) {
        document.body.classList.add("light-mode");
        document.body.dataset.bsTheme = "";
        moon.style.display = "none";
        sun.style.display = "block";
        if (lightCode && darkCode) {
            lightCode.disabled = false;
            darkCode.disabled = true;
        }
    }
    else {
        document.body.classList.remove("light-mode");
        document.body.dataset.bsTheme = "dark";
        moon.style.display = "block";
        sun.style.display = "none";
        if (lightCode && darkCode) {
            lightCode.disabled = true;
            darkCode.disabled = false;
        }
    }
    localStorage.setItem("dark-mode", isToggled ? "true" : "false");
}
(function () {
    const toggle = document.querySelector("#dark-toggle");
    toggle.onchange = () => {
        toggleDarkMode(toggle.checked);
        window.renderMermaid();
    };
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
    toggleDarkMode(!(localStorage.getItem('dark-mode') === "false" || (!('theme' in localStorage) && !prefersDarkMode)));
})();
export {};
//# sourceMappingURL=DarkMode.js.map