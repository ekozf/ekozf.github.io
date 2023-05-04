// @ts-ignore - use local mermaid lib
import mermaid from "/resources/libs/mermaid/mermaid.esm.min.mjs";
import { CustomWindow } from "./CustomWindow.js";
declare let window: CustomWindow;
// import mermaid from '../../node_modules/mermaid/dist/mermaid';

// Get the mermaid element with the diagram code
const mermaidElement = document.querySelector(".mermaid") as HTMLDivElement;

if (mermaidElement) {
  // Decode HTML entities
  const txt = document.createElement("textarea");
  txt.innerHTML = mermaidElement.innerHTML;
  const svgValue = txt.value;

  // Save to window object
  window.mermaidGeneratedSvg = svgValue;

  // Render mermaid diagram with the correct theme
  window.renderMermaid = async () => {
    // Remove old mermaid output
    document.querySelector("#mermaid-output")?.remove();

    const mermaidConfig = { startOnLoad: false, theme: "dark" };

    // Check if dark mode is enabled
    if (localStorage.getItem("dark-mode") === "false") {
      mermaidConfig.theme = "default";
    }

    // Initialize mermaid
    mermaid.initialize(mermaidConfig);

    // Create output div
    var output = document.createElement("div");

    output.id = "mermaid-output";

    // Insert the output div after the mermaid element
    mermaidElement.parentNode!.appendChild(output);

    // Insert the svg code into the output div
    const insertSvg = (svgCode: string) => {
      mermaidElement.innerHTML = svgCode;
    };

    // Render the diagram
    await mermaid.mermaidAPI.renderAsync("mermaid-output", window.mermaidGeneratedSvg, insertSvg);
  };

  // Render mermaid diagram
  window.renderMermaid();
}
