"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import ImageZoomModal from "./ImageZoomModal";

interface MarkdownRendererProps {
	content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	useEffect(() => {
		// Initialize Mermaid diagrams
		const initMermaid = async () => {
			const mermaid = (await import("mermaid")).default;
			mermaid.initialize({
				startOnLoad: true,
				theme: "dark",
				themeVariables: {
					primaryColor: "#f59e0b",
					primaryTextColor: "#fff",
					primaryBorderColor: "#f59e0b",
					lineColor: "#f59e0b",
					secondaryColor: "#1f2937",
					tertiaryColor: "#374151",
				},
			});

			// Find all mermaid code blocks and render them
			if (containerRef.current) {
				const mermaidBlocks = containerRef.current.querySelectorAll(
					"code.language-mermaid",
				);
				mermaidBlocks.forEach((block, index) => {
					const code = block.textContent || "";
					const id = `mermaid-${index}`;
					const pre = block.parentElement;
					if (pre && pre.tagName === "PRE") {
						const wrapper = document.createElement("div");
						wrapper.className = "mermaid-wrapper my-8";
						wrapper.id = id;
						wrapper.textContent = code;
						pre.replaceWith(wrapper);
					}
				});
				mermaid.run();
			}
		};

		initMermaid();

		// Add click handlers to images
		const imageClickHandlers = new Map<HTMLImageElement, () => void>();

		if (containerRef.current) {
			const images = containerRef.current.querySelectorAll("img");
			images.forEach((img) => {
				img.style.cursor = "pointer";
				const handler = () => setSelectedImage(img.src);
				imageClickHandlers.set(img, handler);
				img.addEventListener("click", handler);
			});
		}

		// Cleanup
		return () => {
			imageClickHandlers.forEach((handler, img) => {
				img.removeEventListener("click", handler);
			});
		};
	}, [content]);

	return (
		<>
			<div ref={containerRef} className='prose max-w-none'>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={[rehypeRaw, rehypeHighlight]}
				>
					{content}
				</ReactMarkdown>
			</div>
			<ImageZoomModal
				imageSrc={selectedImage}
				onClose={() => setSelectedImage(null)}
			/>
		</>
	);
}
