"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Github, ExternalLink } from "lucide-react";
import { ProjectData } from "@/lib/projects";

const textVariants = {
	hidden: {
		opacity: 0,
		y: 40,
		filter: "blur(8px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.8,
		},
	},
};

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

export type { ProjectData };

interface ProjectsSectionProps {
	projects: ProjectData[];
	onProjectClick: (project: ProjectData) => void;
}

export default function ProjectsSection({
	projects,
	onProjectClick,
}: ProjectsSectionProps) {
	const { t } = useTranslation();

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
					variants={textVariants}
					className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-center [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'
				>
					{t("projects_title")}
				</motion.h2>
				<motion.p
					variants={textVariants}
					className='text-sm sm:text-base text-neutral-400 mb-12 text-center'
				>
					{t("projects_subtitle")}
				</motion.p>

				<div className='grid md:grid-cols-2 gap-8'>
					{projects.map((project) => (
						<motion.div
							key={project.id}
							variants={textVariants}
							className='group relative bg-neutral-800/50 rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-500/20'
							onClick={() => onProjectClick(project)}
						>
							<div className='relative h-64 sm:h-80 overflow-hidden'>
								<div className='absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent z-10'></div>
								<img
									src={project.images[0]}
									alt={t(`${project.id}_name`)}
									className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
								/>
							</div>

							<div className='relative z-20 -mt-24 px-6 pb-6'>
								<div className='inline-block px-3 py-1 bg-amber-500 rounded-full text-xs font-bold text-neutral-950 mb-3'>
									{t(`${project.id}_tagline`)}
								</div>
								<h3 className='text-2xl sm:text-3xl font-bold text-white mb-3 [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'>
									{t(`${project.id}_name`)}
								</h3>
								<p className='text-sm sm:text-base text-neutral-300 mb-4 line-clamp-3'>
									{t(`${project.id}_description`)}
								</p>

								<div className='flex items-center justify-between'>
									<span className='text-sm text-amber-500 font-medium group-hover:text-amber-400 transition-colors'>
										{t("view_details")} →
									</span>
									<div className='flex gap-2'>
										{project.links.some(
											(link) => link.name.toLowerCase() === "github",
										) && (
											<div className='px-2 py-1 bg-neutral-700/50 rounded-md'>
												<Github size={16} className='text-neutral-400' />
											</div>
										)}
										{project.links.some(
											(link) => link.name.toLowerCase() !== "github",
										) && (
											<div className='px-2 py-1 bg-neutral-700/50 rounded-md'>
												<ExternalLink size={16} className='text-neutral-400' />
											</div>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}
