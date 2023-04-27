import { CustomWindow } from './CustomWindow.js';
declare let window: CustomWindow;

/**
 * Toggles dark mode
 * @param isToggled Whether dark mode is toggled or not
 */
function toggleDarkMode(isToggled: boolean) {
  const moon = document.querySelector("#moon") as HTMLElement;
  const sun = document.querySelector("#sun") as HTMLElement;
  const lightCode = document.querySelector("#light-code") as HTMLLinkElement | null;
  const darkCode = document.querySelector("#dark-code") as HTMLLinkElement | null;

  if (!isToggled) {
    document.body.classList.add("light-mode");
    document.body.dataset.bsTheme = "";
    moon.style.display = "none";
    sun.style.display = "block";

    if (lightCode && darkCode) {
      lightCode.disabled = false;
      darkCode.disabled = true;
    }
  } else {
    document.body.classList.remove("light-mode");
    document.body.dataset.bsTheme = "dark";
    moon.style.display = "block";
    sun.style.display = "none";
    if (lightCode && darkCode) {
      lightCode.disabled = true;
      darkCode.disabled = false;
    }
  }

  // Save dark mode state to local storage
  localStorage.setItem("dark-mode", isToggled ? "true" : "false");
}

(function () {
  // Get the dark mode toggle
  const toggle = document.querySelector("#dark-toggle") as HTMLInputElement;

  // Add event listener to toggle dark mode and render mermaid diagram
  toggle.onchange = () => {
    toggleDarkMode(toggle.checked);

    if (window.renderMermaid) {
      window.renderMermaid();
    }
  };

  // Check if dark mode is enabled
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme:dark)").matches;

  // Set the toggle to the correct state
  toggleDarkMode(!(localStorage.getItem('dark-mode') === "false" || (!('theme' in localStorage) && !prefersDarkMode)));

})();