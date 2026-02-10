"use client";

import { motion } from "framer-motion";

export default function BlobBackground() {
	return (
		<div className='absolute inset-0 -z-10 overflow-visible pointer-events-none'>
			<motion.svg
				viewBox='0 0 800 800'
				xmlns='http://www.w3.org/2000/svg'
				className='absolute top-0 left-1/2 -translate-x-1/2 w-[200%] sm:w-[150%] lg:w-[120%] h-auto'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.2, ease: "easeOut" }}
			>
				{/* Layer 1 - Largest blob - amber-500 */}
				<motion.ellipse
					cx='400'
					cy='400'
					rx='280'
					ry='320'
					fill='#f59e0b'
					fillOpacity='0.1'
					animate={{
						rx: [280, 300, 260, 280],
						ry: [320, 300, 340, 320],
						rotate: [0, 5, -5, 0],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>

				{/* Layer 2 - Medium blob - amber-400 */}
				<motion.ellipse
					cx='420'
					cy='380'
					rx='240'
					ry='280'
					fill='#fbbf24'
					fillOpacity='0.05'
					animate={{
						rx: [240, 260, 220, 240],
						ry: [280, 260, 300, 280],
						rotate: [0, -8, 8, 0],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 0.5,
					}}
				/>

				{/* Layer 3 - Smaller blob - amber-600 */}
				<motion.ellipse
					cx='380'
					cy='420'
					rx='200'
					ry='240'
					fill='#d97706'
					fillOpacity='0.05'
					animate={{
						rx: [200, 220, 180, 200],
						ry: [240, 220, 260, 240],
						rotate: [0, 10, -10, 0],
					}}
					transition={{
						duration: 12,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1,
					}}
				/>

				{/* Layer 4 - Smallest blob - amber-300 */}
				<motion.ellipse
					cx='400'
					cy='400'
					rx='160'
					ry='200'
					fill='#fcd34d'
					fillOpacity='0.05'
					animate={{
						rx: [160, 180, 140, 160],
						ry: [200, 180, 220, 200],
						rotate: [0, -12, 12, 0],
					}}
					transition={{
						duration: 14,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1.5,
					}}
				/>
			</motion.svg>
		</div>
	);
}
