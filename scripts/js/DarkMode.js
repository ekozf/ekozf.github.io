"use strict";
function toggleDarkMode(isToggled) {
    const moon = document.querySelector("#moon");
    const sun = document.querySelector("#sun");
    if (!isToggled) {
        document.body.classList.add("light-mode");
        document.body.dataset.bsTheme = "";
        moon.style.display = "block";
        sun.style.display = "none";
    }
    else {
        document.body.classList.remove("light-mode");
        document.body.dataset.bsTheme = "dark";
        moon.style.display = "none";
        sun.style.display = "block";
    }
}
(function () {
    const toggle = document.querySelector("#dark-toggle");
    toggle.onchange = () => {
        toggleDarkMode(toggle.checked);
    };
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;
    toggleDarkMode(prefersDarkMode);
})();
//# sourceMappingURL=DarkMode.js.map