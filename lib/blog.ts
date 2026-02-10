import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "public", "markdown");

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	cover?: string;
	content: string;
	date?: string;
}

export interface BlogPostMetadata {
	slug: string;
	title: string;
	description: string;
	cover?: string;
	date?: string;
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames
		.filter((fileName) => fileName.endsWith(".md"))
		.map((fileName) => fileName.replace(/\.md$/, ""));
}

// Parse date from dd-MM-yyyy format to Date object
function parseDate(dateString: string): Date {
	const parts = dateString.split("-");
	if (parts.length === 3) {
		const day = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
		const year = parseInt(parts[2], 10);
		return new Date(year, month, day);
	}
	return new Date(dateString); // Fallback to default parsing
}

// Get metadata for all posts (for listing page)
export function getAllPosts(): BlogPostMetadata[] {
	const slugs = getAllPostSlugs();
	const posts = slugs.map((slug) => {
		const fullPath = path.join(postsDirectory, `${slug}.md`);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data } = matter(fileContents);

		// Get file creation date as fallback
		const stats = fs.statSync(fullPath);
		const date = data.date || stats.birthtime.toISOString();

		return {
			slug,
			title: data.title || slug,
			description: data.description || "",
			cover: data.cover,
			date,
		};
	});

	// Sort posts by date (newest first)
	return posts.sort((a, b) => {
		if (a.date && b.date) {
			const dateA = parseDate(a.date);
			const dateB = parseDate(b.date);
			return dateB.getTime() - dateA.getTime();
		}
		return 0;
	});
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	// Get file creation date as fallback
	const stats = fs.statSync(fullPath);
	const date = data.date || stats.birthtime.toISOString();

	return {
		slug,
		title: data.title || slug,
		description: data.description || "",
		cover: data.cover,
		content,
		date,
	};
}
