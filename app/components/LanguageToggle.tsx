"use client";

import { motion } from "framer-motion";
import { BE, GB } from "country-flag-icons/react/3x2";

interface LanguageToggleProps {
	currentLanguage: string;
	onToggle: () => void;
}

export default function LanguageToggle({
	currentLanguage,
	onToggle,
}: LanguageToggleProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.8, duration: 0.5 }}
			className='absolute top-6 right-6 z-20'
		>
			<motion.button
				onClick={onToggle}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className='flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-amber-500/30 rounded-full text-white font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/50'
			>
				<span className='text-lg'>
					{currentLanguage === "en" ? (
						<GB title='English' height={16} radius={16} />
					) : (
						<BE title='Dutch' height={16} radius={16} />
					)}
				</span>
			</motion.button>
		</motion.div>
	);
}
