export interface ProjectLink {
	name: string;
	url: string;
}

export interface ProjectData {
	id: string;
	images: string[];
	techStack: string[];
	links: ProjectLink[];
}

export const projects: ProjectData[] = [
	{
		id: "mms",
		images: [
			"/mms_1.webp",
			"/mms_2.webp",
			"/mms_3.webp",
			"/mms_4.webp",
			"/mms_5.webp",
			"/mms_6.webp",
			"/mms_7.webp",
			"/mms_8.webp",
		],
		techStack: [
			"React Native",
			"Expo",
			"TypeScript",
			"React",
			"SQLite",
			"Mobile",
		],
		links: [
			{
				name: "GitHub",
				url: "https://github.com/ekozf/MyMedSchedule",
			},
		],
	},
	{
		id: "oi",
		images: ["/oi_1.webp", "/oi_2.webp", "/oi_3.webp", "/oi_4.webp"],
		techStack: ["Java", "TypeScript", "Vue", "Docker", "MySQL", "AI"],
		links: [
			{
				name: "Version 1",
				url: "https://staging.openinzicht.be/",
			},
			{
				name: "Version 2 (Release)",
				url: "https://openinzicht.be/",
			},
		],
	},
	{
		id: "portfolio",
		images: ["/portfolio_1.webp", "/portfolio_2.webp"],
		techStack: ["React", "Next.js", "Bun", "SSG", "TypeScript", "Web"],
		links: [
			{
				name: "GitHub",
				url: "https://github.com/ekozf/ekozf.github.io",
			},
			{
				name: "Portfolio",
				url: "https://emirkaan.be",
			},
			{
				name: "Blog",
				url: "https://emirkaan.be/blog",
			},
		],
	},
];
