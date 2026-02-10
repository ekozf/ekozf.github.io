"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Github, Linkedin } from "lucide-react";

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

export default function CallToActionSecondary() {
	const { t } = useTranslation();

	return (
		<motion.section
			variants={containerVariants}
			className='w-full flex flex-col items-center px-8 sm:px-16 py-20 lg:py-28 gap-8'
		>
			<motion.div
				variants={textVariants}
				className='text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center max-w-3xl [text-shadow:2px_4px_0_rgba(255,255,255,0.25)]'
			>
				{t("cta2_text")}
			</motion.div>

			<motion.div
				variants={textVariants}
				className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full'
			>
				<motion.a
					href='https://github.com/ekozf'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 border border-amber-500/30 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/50 text-base lg:text-lg'
				>
					<Github size={20} />
					{t("github")}
				</motion.a>
				<motion.a
					href='mailto:ozveremirkaan@gmail.com'
					className='flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/30 text-base lg:text-lg'
				>
					<Mail size={20} />
					{t("contact_me")}
				</motion.a>
				<motion.a
					href='https://www.linkedin.com/in/emir-kaan-ozver-a3ba09230/'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 border border-amber-500/30 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/50 text-base lg:text-lg'
				>
					<Linkedin size={20} />
					{t("linkedin")}
				</motion.a>
			</motion.div>
		</motion.section>
	);
}
