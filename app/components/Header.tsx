"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import BlobBackground from "./BlobBackground";

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

const nameVariants = {
	hidden: {
		opacity: 0,
		y: -20,
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

export default function Header() {
	const { t } = useTranslation();

	return (
		<motion.header
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className='relative isolate flex max-w-3xl flex-col gap-8 text-center w-full mb-12 overflow-visible'
		>
			<BlobBackground />

			<motion.div
				variants={nameVariants}
				className='text-xl font-semibold tracking-wide text-white/75 mb-2 sm:text-2xl'
			>
				Emir Kaan Özver
			</motion.div>

			<motion.div
				variants={textVariants}
				className='text-4xl font-bold text-white [text-shadow:2px_4px_0_rgba(255,255,255,0.5)] sm:text-5xl lg:text-6xl'
			>
				{t("intro_line_1")}
			</motion.div>
			<motion.div
				variants={textVariants}
				className='text-4xl font-bold italic text-amber-500 [text-shadow:2px_4px_0_color-mix(in_srgb,var(--color-amber-500),transparent_50%)] sm:ms-5 sm:text-5xl lg:text-6xl'
			>
				{t("intro_line_2")}
			</motion.div>
			<motion.div
				variants={textVariants}
				className='text-4xl font-bold text-white [text-shadow:2px_4px_0_rgba(255,255,255,0.5)] sm:text-5xl lg:text-6xl'
			>
				{t("intro_line_3")}
			</motion.div>
			<motion.div
				variants={textVariants}
				className='text-4xl font-bold italic text-amber-500 [text-shadow:2px_4px_0_color-mix(in_srgb,var(--color-amber-500),transparent_50%)] sm:ms-5 sm:text-5xl lg:text-6xl'
			>
				{t("intro_line_4")}
			</motion.div>
		</motion.header>
	);
}
