// @ts-ignore - use local mermaid lib
import mermaid from '../../resources/libs/mermaid/mermaid.esm.min.mjs';
import { CustomWindow } from './CustomWindow.js';
declare let window: CustomWindow;
// import mermaid from '../../node_modules/mermaid/dist/mermaid';

const mermaidElement = document.querySelector(".mermaid") as HTMLDivElement;
  
const txt = document.createElement("textarea");
txt.innerHTML = mermaidElement.innerHTML;
const svgValue = txt.value;

window.mermaidGeneratedSvg = svgValue;

window.renderMermaid = async () => {

  document.querySelector("#mermaid-output")?.remove();

  const mermaidConfig = { startOnLoad: false, theme: "dark" };
  
  if (localStorage.getItem('dark-mode') === "false") {
    mermaidConfig.theme = "default";
  }
  
  mermaid.initialize(mermaidConfig);
  
  var output = document.createElement("div");
  
  output.id = "mermaid-output";
  
  mermaidElement.parentNode!.appendChild(output);
  
  const insertSvg = (svgCode: string) => {
    mermaidElement.innerHTML = svgCode;
  };

  await mermaid.mermaidAPI.renderAsync("mermaid-output", window.mermaidGeneratedSvg, insertSvg);
}

window.renderMermaid();