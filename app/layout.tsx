import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Emir Kaan Özver - Software Developer",
	description:
		"Software developer across web and mobile. Turning 'what if?' into 'done.'",
	openGraph: {
		title: "Emir Kaan Özver - Software Developer",
		description:
			"Software developer across web and mobile. Turning 'what if?' into 'done.', need a developer and architect for your project? Let's talk.",
		url: "https://emirkaan.be",
		siteName: "Emir Kaan Özver Portfolio",
		images: [
			{
				url: "https://emirkaan.be/emir.webp",
				width: 1200,
				height: 630,
				alt: "Emir Kaan Özver Portfolio",
			},
		],
		type: "website",
	},
	icons: {
		apple: "/metadata/apple-touch-icon.png",
		icon: "/metadata/favicon.ico",
		shortcut: "/metadata/favicon-32x32.png",
	},
	manifest: "/metadata/site.webmanifest",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${jetBrainsMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
