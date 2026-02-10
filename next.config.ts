import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	// Uncomment the line below if deploying to GitHub Pages with a repository name
	// basePath: '/your-repo-name',
};

export default nextConfig;
