import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
	X,
	Github,
	ExternalLink,
	ChevronLeft,
	ChevronRight,
	Maximize2,
} from "lucide-react";
import { ProjectData } from "@/lib/projects";

interface ProjectModalProps {
	project: ProjectData | null;
	onClose: () => void;
	onImageZoom: (imageSrc: string) => void;
}

export default function ProjectModal({
	project,
	onClose,
	onImageZoom,
}: ProjectModalProps) {
	const { t } = useTranslation();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const nextImage = () => {
		if (project) {
			setCurrentImageIndex((prev) =>
				prev === project.images.length - 1 ? 0 : prev + 1,
			);
		}
	};

	const prevImage = () => {
		if (project) {
			setCurrentImageIndex((prev) =>
				prev === 0 ? project.images.length - 1 : prev - 1,
			);
		}
	};

	return (
		<AnimatePresence>
			{project && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className='relative w-full max-w-6xl max-h-[90vh] bg-neutral-900 rounded-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/20 overflow-hidden flex flex-col'
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={onClose}
							className='absolute top-4 right-4 z-30 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 shadow-lg'
						>
							<X size={24} className='text-white' />
						</button>

						{/* Image Gallery */}
						<div className='relative h-48 sm:h-64 lg:h-80 bg-neutral-950 overflow-hidden shrink-0 group'>
							<img
								src={project.images[currentImageIndex]}
								alt={`${t(`${project.id}_name`)} screenshot ${currentImageIndex + 1}`}
								className='w-full h-full object-contain cursor-zoom-in'
								onClick={() => onImageZoom(project.images[currentImageIndex])}
							/>
							{/* Zoom hint */}
							<div className='absolute top-2 left-2 bg-neutral-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
								<div className='flex items-center gap-1.5 text-xs text-white'>
									<Maximize2 size={14} className='text-amber-500' />
									<span>Click to zoom</span>
								</div>
							</div>
							{project.images.length > 1 && (
								<>
									<button
										onClick={(e) => {
											e.stopPropagation();
											prevImage();
										}}
										className='absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-neutral-800/80 hover:bg-neutral-700 rounded-full border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300'
									>
										<ChevronLeft size={24} className='text-white' />
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											nextImage();
										}}
										className='absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-neutral-800/80 hover:bg-neutral-700 rounded-full border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300'
									>
										<ChevronRight size={24} className='text-white' />
									</button>

									{/* Image indicators */}
									<div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
										{project.images.map((_, idx) => (
											<button
												key={idx}
												onClick={(e) => {
													e.stopPropagation();
													setCurrentImageIndex(idx);
												}}
												className={`w-2 h-2 rounded-full transition-all duration-300 ${
													idx === currentImageIndex
														? "bg-amber-500 w-8"
														: "bg-neutral-600 hover:bg-neutral-500"
												}`}
											/>
										))}
									</div>
								</>
							)}
						</div>

						{/* Content */}
						<div className='p-6 sm:p-8 lg:p-12 overflow-y-auto flex-1'>
							<div className='mb-6'>
								<div className='inline-block px-3 py-1 bg-amber-500 rounded-full text-xs font-bold text-neutral-950 mb-3'>
									{t(`${project.id}_tagline`)}
								</div>
								<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'>
									{t(`${project.id}_name`)}
								</h2>
								<p className='text-sm sm:text-base text-neutral-300 leading-relaxed'>
									{t(`${project.id}_description`)}
								</p>
							</div>

							{/* Project Info Grid */}
							<div className='grid sm:grid-cols-2 gap-6 mb-8'>
								<div className='bg-neutral-800/50 rounded-xl p-4 border border-amber-500/20'>
									<h4 className='text-sm font-bold text-amber-500 mb-2'>
										{t("team_size")}
									</h4>
									<p className='text-white font-medium'>
										{t(`${project.id}_team`)}
									</p>
								</div>
								<div className='bg-neutral-800/50 rounded-xl p-4 border border-amber-500/20'>
									<h4 className='text-sm font-bold text-amber-500 mb-2'>
										{t("my_role")}
									</h4>
									<p className='text-white font-medium'>
										{t(`${project.id}_role`)}
									</p>
								</div>
							</div>

							{/* Features */}
							<div className='mb-8'>
								<h3 className='text-xl sm:text-2xl font-bold text-white mb-4 [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'>
									{t("features")}
								</h3>
								<div className='grid sm:grid-cols-2 gap-3'>
									{Array.from({ length: 9 }).map((_, idx) => {
										const featureKey = `${project.id}_feature${idx + 1}`;
										const featureText = t(featureKey);

										// Only render if translation exists
										if (featureText === featureKey) return null;

										return (
											<div
												key={idx}
												className='flex items-start gap-2 text-neutral-300'
											>
												<span className='text-amber-500 mt-1 shrink-0'>•</span>
												<span className='text-sm'>{featureText}</span>
											</div>
										);
									})}
								</div>
							</div>

							{/* Tech Stack */}
							{project.techStack && project.techStack.length > 0 && (
								<div className='mb-8'>
									<h3 className='text-xl sm:text-2xl font-bold text-white mb-4 [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'>
										{t("tech_stack")}
									</h3>
									<div className='flex flex-wrap gap-2'>
										{project.techStack.map((tech) => (
											<span
												key={tech}
												className='px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-sm font-medium text-amber-500'
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							)}

							{/* My Experience */}
							<div className='mb-8'>
								<h3 className='text-xl sm:text-2xl font-bold text-white mb-4 [text-shadow:2px_4px_0_rgba(255,255,255,0.5)]'>
									{t("my_experience")}
								</h3>
								<p className='text-sm sm:text-base text-neutral-300 leading-relaxed'>
									{t(`${project.id}_experience`)}
								</p>
							</div>

							{/* Action Buttons */}
							{project.links && project.links.length > 0 && (
								<div className='flex flex-col sm:flex-row gap-4'>
									{project.links.map((link) => {
										const isGithub = link.name.toLowerCase() === "github";

										return (
											<a
												key={link.url}
												href={link.url}
												target='_blank'
												rel='noopener noreferrer'
												className={`flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-full transition-all duration-300 shadow-lg ${
													isGithub
														? "bg-neutral-800 hover:bg-neutral-700 border border-amber-500/30 text-white hover:shadow-amber-500/20 hover:border-amber-500/50"
														: "bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold hover:shadow-amber-500/30"
												}`}
											>
												{isGithub ? (
													<>
														<Github size={20} />
														{t("view_on_github")}
													</>
												) : (
													<>
														<ExternalLink size={20} />
														{link.name}
													</>
												)}
											</a>
										);
									})}
								</div>
							)}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
