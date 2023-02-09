import mermaid from '../../resources/libs/mermaid/mermaid.esm.min.mjs';
const mermaidElement = document.querySelector(".mermaid");
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
    mermaidElement.parentNode.appendChild(output);
    const insertSvg = (svgCode) => {
        mermaidElement.innerHTML = svgCode;
    };
    await mermaid.mermaidAPI.renderAsync("mermaid-output", window.mermaidGeneratedSvg, insertSvg);
};
window.renderMermaid();
//# sourceMappingURL=MermaidThemeSwitcher.js.map