"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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

export default function ExperienceSection() {
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
					className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-12 text-center [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'
				>
					{t("experience_title")}
				</motion.h2>

				<div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
					{/* Work Experience */}
					<motion.div variants={textVariants} className='space-y-6'>
						<h3 className='text-xl sm:text-2xl font-bold text-amber-500 mb-6 [text-shadow:2px_4px_0_color-mix(in_srgb,var(--color-amber-500),transparent_50%)]'>
							{t("work_experience")}
						</h3>

						<div className='bg-neutral-800/50 rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/10'>
							<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2'>
								<div>
									<h4 className='text-lg font-bold text-white'>
										{t("work_position")}
									</h4>
									<p className='text-amber-500 font-medium'>
										{t("work_company")}
									</p>
								</div>
								<span className='text-sm text-neutral-400 font-medium whitespace-nowrap'>
									{t("work_period")}
								</span>
							</div>

							<p className='text-sm text-neutral-300 mb-4 leading-relaxed'>
								{t("work_description")}
							</p>

							<div className='flex flex-wrap gap-2'>
								{[
									"C#",
									".NET",
									"JavaScript",
									"HTML",
									"CSS",
									"SQL Server",
									"Azure",
									"Web APIs",
								].map((tech) => (
									<span
										key={tech}
										className='px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-medium text-amber-500'
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</motion.div>

					{/* Education */}
					<motion.div variants={textVariants} className='space-y-6'>
						<h3 className='text-xl sm:text-2xl font-bold text-amber-500 mb-6 [text-shadow:2px_4px_0_color-mix(in_srgb,var(--color-amber-500),transparent_50%)]'>
							{t("education")}
						</h3>

						<div className='bg-neutral-800/50 rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-lg hover:shadow-amber-500/10'>
							<div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2'>
								<div>
									<h4 className='text-lg font-bold text-white'>
										{t("edu_degree")}
									</h4>
									<p className='text-amber-500 font-medium'>{t("edu_field")}</p>
									<p className='text-sm text-neutral-400'>
										{t("edu_specialization")}
									</p>
								</div>
								<span className='text-sm text-neutral-400 font-medium whitespace-nowrap'>
									{t("edu_period")}
								</span>
							</div>

							<p className='text-sm text-neutral-300 mb-4'>
								{t("edu_institution")}
							</p>

							<div className='flex flex-wrap gap-2'>
								{[
									"C#",
									".NET",
									"Docker",
									"Java",
									"JavaScript",
									"TypeScript",
									"React Native",
									"Angular",
									"Vue",
									"Node.js",
									"SQL",
									"Git",
								].map((tech) => (
									<span
										key={tech}
										className='px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-medium text-amber-500'
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
