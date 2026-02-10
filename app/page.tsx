"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import "./i18n/i18n";
import LanguageToggle from "./components/LanguageToggle";
import Header from "./components/Header";
import CallToAction from "./components/CallToAction";
import CallToActionSecondary from "./components/CallToActionSecondary";
import SkillsMarquee from "./components/SkillsMarquee";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import TechnologiesSection from "./components/TechnologiesSection";
import ProjectsSection from "./components/ProjectsSection";
import ProjectModal from "./components/ProjectModal";
import ImageZoomModal from "./components/ImageZoomModal";
import { projects, ProjectData } from "@/lib/projects";

export default function Home() {
	const { i18n } = useTranslation();
	const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
		null,
	);
	const [zoomedImage, setZoomedImage] = useState<string | null>(null);

	useEffect(() => {
		// Initialize language from localStorage on mount
		const savedLanguage = localStorage.getItem("language");
		if (savedLanguage && savedLanguage !== i18n.language) {
			i18n.changeLanguage(savedLanguage);
		}
	}, [i18n]);

	const toggleLanguage = () => {
		const newLang = i18n.language === "en" ? "nl" : "en";
		i18n.changeLanguage(newLang);
		localStorage.setItem("language", newLang);
	};

	const openProject = (project: ProjectData) => {
		setSelectedProject(project);
		document.body.style.overflow = "hidden";
	};

	const closeProject = () => {
		setSelectedProject(null);
		document.body.style.overflow = "unset";
	};

	const openZoomModal = (imageSrc: string) => {
		setZoomedImage(imageSrc);
	};

	const closeZoomModal = () => {
		setZoomedImage(null);
	};

	return (
		<div className='flex min-h-screen items-center justify-center font-sans bg-neutral-900'>
			<main className='relative flex min-h-screen w-full max-w-6xl flex-col items-center justify-between xl:mt-8 xl:mb-8 xl:rounded-2xl bg-neutral-950 shadow-2xl shadow-neutral-950 overflow-hidden'>
				<div className='absolute top-4 left-4 z-10'>
					<img
						src='/eko-logo.webp'
						alt='eko.zf'
						width={48}
						height={48}
						className='rounded-lg'
					/>
				</div>
				<LanguageToggle
					currentLanguage={i18n.language}
					onToggle={toggleLanguage}
				/>

				<div className='w-full flex flex-col items-center px-8 sm:px-16 py-20 lg:py-28 gap-16'>
					<Header />
					<CallToAction />
				</div>

				<SkillsMarquee />
				<AboutSection />
				<ExperienceSection />
				<TechnologiesSection />
				<ProjectsSection projects={projects} onProjectClick={openProject} />
				<CallToActionSecondary />

				<ProjectModal
					project={selectedProject}
					onClose={closeProject}
					onImageZoom={openZoomModal}
				/>
				<ImageZoomModal imageSrc={zoomedImage} onClose={closeZoomModal} />
			</main>
		</div>
	);
}
