"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 30,
		scale: 0.95,
		filter: "blur(8px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		filter: "blur(0px)",
		transition: {
			duration: 0.6,
		},
	},
};

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const techTagVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
};

export default function TechnologiesSection() {
	const { t } = useTranslation();

	const techCategories = [
		{
			id: "languages",
			title: "tech_languages",
			items: ["C#", "Java", "JavaScript", "TypeScript", "HTML", "(S)CSS"],
			translationKeys: [
				"tech_csharp",
				"tech_java",
				"tech_javascript",
				"tech_typescript",
				"tech_html",
				"tech_css",
			],
		},
		{
			id: "frameworks",
			title: "tech_frameworks",
			items: [
				".NET",
				"ASP.NET",
				"MAUI",
				"Vue",
				"React",
				"Angular",
				"React Native",
				"Flutter",
				"Node.js",
				"Tailwind",
			],
			translationKeys: [
				"tech_dotnet",
				"tech_aspnet",
				"tech_maui",
				"tech_vue",
				"tech_react",
				"tech_angular",
				"tech_react_native",
				"tech_flutter",
				"tech_nodejs",
				"tech_tailwind",
			],
		},
		{
			id: "databases",
			title: "tech_databases",
			items: ["MySQL", "PostgreSQL", "SQL Server", "SQLite", "MongoDB"],
			translationKeys: [
				"tech_mysql",
				"tech_postgresql",
				"tech_sql_server",
				"tech_sqlite",
				"tech_mongodb",
			],
		},
		{
			id: "tools",
			title: "tech_tools_cloud",
			items: ["Git & GitHub", "VS Code", "Docker", "Azure"],
			translationKeys: ["tech_git", "tech_vscode", "tech_docker", "tech_azure"],
		},
		{
			id: "os",
			title: "tech_os",
			items: ["Linux", "Windows"],
			translationKeys: ["tech_linux", "tech_windows"],
		},
	];

	return (
		<section className='w-full px-8 sm:px-16 py-16 lg:py-24'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: "-100px" }}
				className='max-w-6xl mx-auto'
			>
				<motion.h2
					variants={cardVariants}
					className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-12 text-center [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'
				>
					{t("technologies_title")}
				</motion.h2>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{techCategories.map((category, categoryIndex) => (
						<motion.div
							key={category.id}
							variants={cardVariants}
							className='bg-neutral-800/50 rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/10 backdrop-blur-sm'
						>
							<h3 className='text-lg sm:text-xl font-bold text-amber-500 mb-4 [text-shadow:2px_4px_0_color-mix(in_srgb,var(--color-amber-500),transparent_50%)]'>
								{t(category.title)}
							</h3>
							<div className='flex flex-wrap gap-2'>
								{category.items.map((item, itemIndex) => (
									<motion.span
										key={`${category.id}-${itemIndex}`}
										variants={techTagVariants}
										initial='hidden'
										whileInView='visible'
										viewport={{ once: true }}
										transition={{
											delay: 0.1 * (categoryIndex * 2 + itemIndex),
										}}
										className='px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs sm:text-sm font-medium text-amber-500 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-200 cursor-default'
									>
										{t(category.translationKeys[itemIndex])}
									</motion.span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}
