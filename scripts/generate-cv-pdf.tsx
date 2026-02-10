import React from "react";
import { renderToFile } from "@react-pdf/renderer";
import CVDocumentPDF from "../app/components/CVDocumentPDF";
import path from "path";
import fs from "fs";
import sharp from "sharp";

async function generateCV() {
	try {
		const publicDir = path.join(process.cwd(), "public");

		// Ensure public directory exists
		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir, { recursive: true });
		}

		// Read and convert profile image to PNG base64
		const imagePath = path.join(publicDir, "emir.webp");
		let imageData: string | undefined;

		if (fs.existsSync(imagePath)) {
			// Convert webp to PNG and then to base64
			const pngBuffer = await sharp(imagePath).png().toBuffer();
			imageData = `data:image/png;base64,${pngBuffer.toString("base64")}`;
		}

		// Load icon images
		const loadIcon = async (filename: string) => {
			const iconPath = path.join(publicDir, filename);
			if (fs.existsSync(iconPath)) {
				const buffer = fs.readFileSync(iconPath);
				return `data:image/png;base64,${buffer.toString("base64")}`;
			}
			return undefined;
		};

		const iconData = {
			mail: await loadIcon("mail.png"),
			phone: await loadIcon("phone.png"),
			globe: await loadIcon("globe.png"),
			linkedin: await loadIcon("linkedin.png"),
			github: await loadIcon("github.png"),
			map: await loadIcon("map.png"),
		};

		const outputPath = path.join(publicDir, "Emir_Kaan_Ozver_CV.pdf");

		console.log("Generating CV PDF...");
		await renderToFile(
			<CVDocumentPDF imageData={imageData} iconData={iconData} />,
			outputPath,
		);
		console.log(`✅ CV PDF generated successfully at: ${outputPath}`);
	} catch (error) {
		console.error("❌ Error generating CV PDF:", error);
		process.exit(1);
	}
}

generateCV();
