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

export default function AboutSection() {
	const { t, i18n } = useTranslation();

	return (
		<section className='w-full px-8 sm:px-16 py-16 lg:py-24'>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: "-100px" }}
				className='flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto'
			>
				<motion.div variants={textVariants} className='flex-1 w-full'>
					<h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'>
						{t("about_me")}
					</h2>
					{i18n.language === "en" ? (
						<div className='space-y-6 text-sm sm:text-md text-neutral-200 leading-relaxed'>
							<p>
								{t("about_para1_part1")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para1_highlight1")}
								</span>{" "}
								{t("about_para1_part2")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para1_highlight2")}
								</span>
								{t("about_para1_part3")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para1_highlight3")}
								</span>{" "}
								{t("about_para1_part4")}
							</p>
							<p>
								{t("about_para2_part1")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para2_highlight1")}
								</span>{" "}
								{t("about_para2_part2")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para2_highlight2")}
								</span>
								{t("about_para2_part3")}
							</p>
							<p>
								{t("about_para3_part1")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para3_highlight1")}
								</span>
								{t("about_para3_part2")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para3_highlight2")}
								</span>
								{t("about_para3_part3")}
							</p>
						</div>
					) : (
						<div className='space-y-6 text-sm sm:text-md text-neutral-200 leading-relaxed'>
							<p>
								{t("about_para1_part1")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para1_highlight1")}
								</span>{" "}
								{t("about_para1_part2")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para1_highlight2")}
								</span>{" "}
								{t("about_para1_part3")}
							</p>
							<p>
								{t("about_para2_part1")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para2_highlight1")}
								</span>{" "}
								{t("about_para2_part2")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para2_highlight2")}
								</span>
								{t("about_para2_part3")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para2_highlight3")}
								</span>
								{t("about_para2_part4")}
							</p>
							<p>
								{t("about_para3_part1")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para3_highlight1")}
								</span>
								{t("about_para3_part2")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para3_highlight2")}
								</span>
								{t("about_para3_part3")}{" "}
								<span className='text-amber-500 font-bold'>
									{t("about_para3_highlight3")}
								</span>
								{t("about_para3_part4")}
							</p>
						</div>
					)}
				</motion.div>
				<motion.div
					variants={textVariants}
					className='flex-1 w-full flex justify-center lg:justify-end'
				>
					<div className='relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96'>
						<div className='absolute inset-0 bg-amber-500/20 rounded-3xl blur-2xl'></div>
						<div className='relative w-full h-full rounded-3xl overflow-hidden border-4 border-amber-500/50 shadow-2xl shadow-amber-500/20'>
							<img
								src='/emir.webp'
								alt='Emir Kaan Özver'
								className='w-full h-full object-cover'
							/>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}
