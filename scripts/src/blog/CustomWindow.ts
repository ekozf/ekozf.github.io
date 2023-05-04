export interface CustomWindow extends Window {
  mermaidGeneratedSvg: string;
  renderMermaid: () => void;
}