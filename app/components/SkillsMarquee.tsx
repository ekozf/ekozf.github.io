"use client";

import Marquee from "react-fast-marquee";

const skills = [
	"JavaScript",
	"TypeScript",
	"C#",
	"Java",
	"Angular",
	"Vue",
	"React Native",
	"React",
	"Node.js",
	"Git",
	"PostgreSQL",
	"Docker",
	"REST API",
];

export default function SkillsMarquee() {
	return (
		<section className='w-full bg-amber-500 py-6 overflow-hidden relative'>
			<Marquee className='overflow-hidden'>
				{[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
					<span
						key={index}
						className='inline-block px-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950'
					>
						{skill}
					</span>
				))}
			</Marquee>
		</section>
	);
}
