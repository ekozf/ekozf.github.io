import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
	en: {
		translation: {
			hello_world: "Hello, World!",
			switch_language: "Switch to Dutch",
			intro_line_1: "Turning",
			intro_line_2: '"what if?"',
			intro_line_3: "into",
			intro_line_4: '"done."',
			cta_line_1: "Software developer across",
			cta_line_2: "web and mobile.",
			cta_line_3: "Looking for someone who can",
			cta_line_4: "own features end-to-end?",
			cta_line_5: "Let's talk",
			cta2_text:
				"Have a question or just want to say hi? I'd love to hear from you.",
			contact_me: "Contact Me",
			github: "GitHub",
			linkedin: "LinkedIn",
			download_cv: "Download CV",
			about_me: "About Me",
			// Paragraph 1
			about_para1_part1: "I am Emir Kaan Özver, a software developer from",
			about_para1_highlight1: "Heusden-Zolder",
			about_para1_part2: "focused on building software that",
			about_para1_highlight2: "solves real problems",
			about_para1_part3:
				". For me, development isn't just about writing code; it's about the result. The best part of the job is delivering a finished feature or a critical fix and seeing the immediate",
			about_para1_highlight3: "positive impact",
			about_para1_part4: "it has on the customer's workflow.",
			// Paragraph 2
			about_para2_part1:
				"I do my best work in high-pressure environments. Where others might find tight deadlines or complex production issues overwhelming, I find them clarifying. I have a knack for",
			about_para2_highlight1: "cutting through noise",
			about_para2_part2:
				"to deliver exactly what is needed when the timeline is strict. I don't just endure crunch time; I use it to focus and",
			about_para2_highlight2: "ship reliable solutions",
			about_para2_part3: ".",
			// Paragraph 3
			about_para3_part1: "My technical approach is versatile and",
			about_para3_highlight1: "business-first",
			about_para3_part2:
				". I move seamlessly between Frontend and Backend systems, while managing the necessary infrastructure to keep them running. Whether building web platforms or mobile apps, I always select the architecture that makes the",
			about_para3_highlight2: "most commercial sense for the client",
			about_para3_part3: ".",
			// Experience Section
			experience_title: "Experience & Education",
			work_experience: "Work Experience",
			education: "Education",
			// Work Experience
			work_period: "2022 - 2025",
			work_position: "Student Job Software Developer",
			work_company: "ElaN Languages Heusden",
			work_description:
				"Worked on a brand new online e-learning platform. Developed full-stack solutions including frontend interfaces, backend APIs, and database architecture.",
			// Education
			edu_period: "09/2022 - 02/2026",
			edu_degree: "Professional Bachelor",
			edu_field: "Applied Computer Science",
			edu_specialization: "Application Development",
			edu_institution: "Hogeschool PXL",
			// Projects
			projects_title: "My Projects",
			projects_subtitle: "Real-world applications I've built",
			view_details: "View Details",
			close: "Close",
			visit_project: "Visit Project",
			view_on_github: "View on GitHub",
			team_size: "Team Size",
			my_role: "My Role",
			tech_stack: "Tech Stack",
			features: "Features",
			my_experience: "My Experience",
			previous: "Previous",
			next: "Next",
			// MyMedSchedule
			mms_name: "MyMedSchedule",
			mms_tagline: "Health Management, Your Way",
			mms_description:
				"Mobile application for tracking and managing your medications and medication regimens. It helps you by notifying you when you need to take your medications and what / how much to take. Disclaimer: this does NOT give any advice or tell you what to take. It is just a personal tracker / diary in digital form.",
			mms_team: "Solo Project",
			mms_role: "Full Stack Developer",
			mms_feature1: "Medication Management",
			mms_feature2: "Advanced Scheduling Options",
			mms_feature3: "Inventory Management",
			mms_feature4: "Smart Notifications",
			mms_feature5: "Intake Logging & History",
			mms_feature6: "Multi-Profile Support",
			mms_feature7: "Biometric Security & Fully Privacy and Local",
			mms_feature8: "Data Export",
			mms_feature9: "Multilingual Support",
			mms_experience:
				"With MyMedSchedule, I focused on the intersection of data security and accessible design. I learned how to architect a fully offline application where users have 100% data ownership, utilizing encrypted local storage to handle sensitive medical information. A major part of my process was researching accessible UX, leading me to design a UI with oversized touch targets and high-legibility elements for elderly users. This project solidified my skills in building reliable, mission-critical mobile apps that prioritize user privacy above all else.",
			// OpenInzicht
			oi_name: "OpenInzicht",
			oi_tagline: "Community for Invisible Illnesses",
			oi_description:
				"Online community made for people with invisible illnesses. Here users can share their experiences and how they deal and live with their illness with other people and form communities to support each other. Made for Code4Belgium as a school project.",
			oi_team: "7 Developers",
			oi_role: "Fullstack Developer (Frontend + Backend)",
			oi_feature1: "Community Driven Forum",
			oi_feature2: "Adding and managing connections with others",
			oi_feature3: "Live chat using websockets",
			oi_feature4: "Responsive design for mobile and desktop",
			oi_feature5: "Heatmap of Flanders with community members",
			oi_feature6: "Private and secure",
			oi_experience:
				"Working on OpenInzicht for Code4Belgium, we developed a high-impact platform for users with invisible illnesses using Vue 3. We implemented complex features including real-time chat via WebSockets, geographical data visualization with Leaflet, and AI-driven content assistance (which I was largely responsible for). Beyond the code, I mastered Agile/Scrum workflows, ensured platform reliability through Selenium E2E testing, and managed secure development environments using WireGuard VPN. This project sharpened my ability to deliver secure, accessible, and technically sophisticated solutions for sensitive user data.",
			// Personal Portfolio
			portfolio_name: "Personal Portfolio",
			portfolio_tagline: "Modern Web Architecture in Action",
			portfolio_description:
				"The website you are currently on, made to tell you who I am and showcase my skills.",
			portfolio_team: "Solo Project",
			portfolio_role: "Full Stack Developer",
			portfolio_feature1: "Fully Static (SSG)",
			portfolio_feature2: "Multiple language support (NL + EN)",
			portfolio_feature3: "Responsive UI",
			portfolio_feature4: "Hosted using GitHub pages",
			portfolio_feature5: "Blog and an easy way to add new blog posts",
			portfolio_experience:
				"I evolved this project from a custom-built C# static site generator into a high-performance Next.js application. Having previously engineered my own markdown-to-HTML engine and templating system from scratch, I gained a deep 'under-the-hood' understanding of web architecture. I've now translated those fundamentals into a modern stack, leveraging Next.js to deliver a lightning-fast, accessible, and fully responsive experience that balances technical complexity with industry-standard best practices.",
			// Technologies Section
			technologies_title: "Technologies I Use",
			tech_languages: "Languages",
			tech_frameworks: "Frameworks & Libraries",
			tech_databases: "Databases",
			tech_tools_cloud: "Tools & Cloud",
			tech_os: "Operating Systems",
			// Languages
			tech_csharp: "C#",
			tech_java: "Java",
			tech_javascript: "JavaScript",
			tech_typescript: "TypeScript",
			tech_html: "HTML",
			tech_css: "(S)CSS",
			// Frameworks & Libraries
			tech_dotnet: ".NET",
			tech_aspnet: "ASP.NET",
			tech_maui: "MAUI",
			tech_vue: "Vue",
			tech_react: "React",
			tech_angular: "Angular",
			tech_react_native: "React Native",
			tech_flutter: "Flutter",
			tech_nodejs: "Node.js",
			tech_tailwind: "Tailwind",
			// Databases
			tech_mysql: "MySQL",
			tech_postgresql: "PostgreSQL",
			tech_sql_server: "SQL Server",
			tech_sqlite: "SQLite",
			tech_mongodb: "MongoDB",
			// Tools & Cloud
			tech_git: "Git & GitHub",
			tech_vscode: "VS Code",
			tech_docker: "Docker",
			tech_azure: "Azure",
			// Operating Systems
			tech_linux: "Linux",
			tech_windows: "Windows",
		},
	},
	nl: {
		translation: {
			hello_world: "Hallo, Wereld!",
			switch_language: "Schakel over naar Engels",
			intro_line_1: "Van",
			intro_line_2: '"wat als?"',
			intro_line_3: "naar",
			intro_line_4: '"klaar."',
			cta_line_1: "Software developer voor",
			cta_line_2: "web en mobile.",
			cta_line_3: "Zoekt u iemand die verantwoordelijkheid pakt",
			cta_line_4: "en doorbouwt tot het live staat?",
			cta_line_5: "Let's talk",
			cta2_text:
				"Heeft u een vraag of wilt u gewoon even kennismaken? Ik hoor graag van u.",
			contact_me: "Neem contact op",
			github: "GitHub",
			linkedin: "LinkedIn",
			download_cv: "Download CV",
			about_me: "Over mij",
			// Paragraph 1
			about_para1_part1: "Ik ben Emir Kaan Özver, een software developer uit",
			about_para1_highlight1: "Heusden-Zolder",
			about_para1_part2:
				"met een focus op applicaties die bedrijven vooruithelpen. Programmeren is voor mij een middel, geen doel; het gaat om de gebruiker die blij is met een nieuwe feature of een opgeloste bug. Ik haal mijn voldoening uit het",
			about_para1_highlight2: "leveren van werkende producten",
			about_para1_part3: "waar de klant direct mee aan de slag kan.",
			// Paragraph 2
			about_para2_part1:
				"In veeleisende situaties kom ik het best tot mijn recht. Strakke deadlines of onverwachte technische",
			about_para2_highlight1: "uitdagingen zorgen",
			about_para2_part2: "bij mij niet voor stress, maar",
			about_para2_highlight2: "voor focus",
			about_para2_part3:
				". Ik ben pragmatisch ingesteld: als de druk hoog is, zorg ik dat de",
			about_para2_highlight3:
				"essentie wordt opgeleverd zonder in te boeten op kwaliteit",
			about_para2_part4: ".",
			// Paragraph 3
			about_para3_part1:
				"Technisch ben ik breed onderlegd, wat mij toelaat om het",
			about_para3_highlight1: "hele plaatje te overzien",
			about_para3_part2: ". Ik heb ervaring met de",
			about_para3_highlight2: "volledige stack",
			about_para3_part3:
				": van frontend en backend tot de hosting en infrastructuur. Ook op mobiel vlak ken ik de weg. Ik kies niet blind voor de nieuwste hype, maar voor de",
			about_para3_highlight3:
				"oplossing die zakelijk het beste rendement oplevert voor uw project",
			about_para3_part4: ".",
			// Experience Section
			experience_title: "Ervaring & Opleiding",
			work_experience: "Werkervaring",
			education: "Opleiding",
			// Work Experience
			work_period: "2022 - 2025",
			work_position: "Studentenjob Software Developer",
			work_company: "ElaN Languages Heusden",
			work_description:
				"Gewerkt aan een gloednieuwe online e-learning platform. Ontwikkelde fullstack oplossingen inclusief frontend interfaces, backend APIs en database architectuur.",
			// Education
			edu_period: "09/2022 - 02/2026",
			edu_degree: "Professionele Bachelor",
			edu_field: "Toegepaste Informatica",
			edu_specialization: "Applicatieontwikkeling",
			edu_institution: "Hogeschool PXL",
			// Projects
			projects_title: "Mijn Projecten",
			projects_subtitle: "Software die ik ontwikkeld heb",
			view_details: "Bekijk Details",
			close: "Sluiten",
			visit_project: "Bezoek Project",
			view_on_github: "Bekijk op GitHub",
			team_size: "Teamgrootte",
			my_role: "Mijn Rol",
			tech_stack: "Technologieën",
			features: "Functionaliteiten",
			my_experience: "Mijn Ervaring",
			previous: "Vorige",
			next: "Volgende",
			// MyMedSchedule
			mms_name: "MyMedSchedule",
			mms_tagline: "Gezondheidsbeheer, Op Jouw Manier",
			mms_description:
				"Mobiele applicatie voor het bijhouden en beheren van medicatie en medicatieschema's. De app helpt door je te herinneren wanneer je medicatie moet innemen en wat/hoeveel je moet nemen. Belangrijk: de app geeft GEEN advies over welke medicatie je moet nemen. Het is enkel een persoonlijke tracker/dagboek in digitale vorm.",
			mms_team: "Solo Project",
			mms_role: "Full Stack Developer",
			mms_feature1: "Medicatiebeheer",
			mms_feature2: "Geavanceerde Planningsopties",
			mms_feature3: "Voorraadbeheer",
			mms_feature4: "Slimme Notificaties",
			mms_feature5: "Innamelogboek & Historiek",
			mms_feature6: "Ondersteuning voor Meerdere Profielen",
			mms_feature7: "Biometrische Beveiliging & Volledig Privé en Lokaal",
			mms_feature8: "Data Export",
			mms_feature9: "Meertalige Ondersteuning",
			mms_experience:
				"Bij de ontwikkeling van MyMedSchedule lag de focus op het snijvlak van databeveiliging en toegankelijk ontwerp. Ik heb geleerd hoe je een volledig 'local-first' applicatie architectuurt waarbij de gebruiker volledige controle over zijn data behoudt, ondersteund door versleutelde lokale opslag voor gevoelige medische informatie. Een cruciaal onderdeel van mijn proces was het onderzoek naar inclusieve UX; dit leidde tot een interface met extra grote klikvlakken en een hoge leesbaarheid, specifiek gericht op ouderen. Dit project heeft mijn expertise in het bouwen van betrouwbare, privacy-gedreven mobiele apps die de gebruiker centraal stellen, aanzienlijk versterkt.",
			// OpenInzicht
			oi_name: "OpenInzicht",
			oi_tagline: "Gemeenschap voor Onzichtbare Aandoeningen",
			oi_description:
				"Online gemeenschap gemaakt voor mensen met een onzichtbare aandoening. Hier kunnen gebruikers hun ervaringen delen over hoe ze omgaan met en leven met hun aandoening, en communities vormen om elkaar te ondersteunen. Ontwikkeld voor Code4Belgium als schoolproject.",
			oi_team: "7 Ontwikkelaars",
			oi_role: "Fullstack Developer (Frontend + Backend)",
			oi_feature1: "Community Gedreven Forum",
			oi_feature2: "Connecties toevoegen en beheren",
			oi_feature3: "Live chat met websockets",
			oi_feature4: "Responsive design voor mobiel en desktop",
			oi_feature5: "Heatmap van Vlaanderen met community leden",
			oi_feature6: "Privé en veilig",
			oi_experience:
				"Voor Code4Belgium heb ik gewerkt aan OpenInzicht, een platform voor mensen met een onzichtbare aandoening. We hebben hier de frontend architectuur opgezet met Vue 3. Naast de standaard functionaliteiten hebben we complexe onderdelen geïmplementeerd zoals een real-time chatsysteem via WebSockets, interactieve kaarten met Leaflet en AI-ondersteuning voor het schrijven van verhalen (waar ik voor grotendeels verantwoordelijk was). Door de gevoelige aard van de data lag de focus sterk op kwaliteit en veiligheid; ik heb dit gewaarborgd via Selenium E2E-testing en een beveiligde workflow met WireGuard VPN. Door te werken in een Agile/Scrum team heb ik geleerd hoe je technisch uitdagende features vertaalt naar een toegankelijk product dat echt impact maakt voor de eindgebruiker.",
			// Personal Portfolio
			portfolio_name: "Persoonlijke Portfolio",
			portfolio_tagline: "Moderne Web Architectuur in Actie",
			portfolio_description:
				"De website waar je nu op bent, gemaakt om te vertellen wie ik ben en mijn vaardigheden te tonen.",
			portfolio_team: "Solo Project",
			portfolio_role: "Full Stack Developer",
			portfolio_feature1: "Volledig Statisch (SSG)",
			portfolio_feature2: "Ondersteuning voor meerdere talen (NL + EN)",
			portfolio_feature3: "Responsive UI",
			portfolio_feature4: "Gehost via GitHub pages",
			portfolio_feature5:
				"Blog en een eenvoudige manier om nieuwe blogposts toe te voegen",
			portfolio_experience:
				"Ik heb dit project doorontwikkeld van een handgebouwde static site generator in C# naar een hoogwaardige Next.js-applicatie. Door in de eerdere versie zelf een markdown-engine en templating-systeem te bouwen, heb ik een diepgaand inzicht gekregen in wat er zich 'onder de motorkap' van moderne web-architectuur afspeelt. Deze fundamentele kennis heb ik vertaald naar een moderne stack, waarbij ik Next.js heb ingezet voor een razendsnelle, toegankelijke en volledig responsive gebruikerservaring die technische diepgang combineert met de huidige industrie-standaarden.",
			// Technologies Section
			technologies_title: "Technologieën die ik gebruik",
			tech_languages: "Talen",
			tech_frameworks: "Frameworks & Bibliotheken",
			tech_databases: "Databases",
			tech_tools_cloud: "Tools & Cloud",
			tech_os: "Besturingssystemen",
			// Languages
			tech_csharp: "C#",
			tech_java: "Java",
			tech_javascript: "JavaScript",
			tech_typescript: "TypeScript",
			tech_html: "HTML",
			tech_css: "(S)CSS",
			// Frameworks & Libraries
			tech_dotnet: ".NET",
			tech_aspnet: "ASP.NET",
			tech_maui: "MAUI",
			tech_vue: "Vue",
			tech_react: "React",
			tech_angular: "Angular",
			tech_react_native: "React Native",
			tech_flutter: "Flutter",
			tech_nodejs: "Node.js",
			tech_tailwind: "Tailwind",
			// Databases
			tech_mysql: "MySQL",
			tech_postgresql: "PostgreSQL",
			tech_sql_server: "SQL Server",
			tech_sqlite: "SQLite",
			tech_mongodb: "MongoDB",
			// Tools & Cloud
			tech_git: "Git & GitHub",
			tech_vscode: "VS Code",
			tech_docker: "Docker",
			tech_azure: "Azure",
			// Operating Systems
			tech_linux: "Linux",
			tech_windows: "Windows",
		},
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: (() => {
		if (typeof window === "undefined") {
			return "en";
		}

		const storedLanguage = localStorage.getItem("language");
		if (storedLanguage) {
			return storedLanguage;
		}

		const browserLanguages = navigator.languages?.length
			? navigator.languages
			: [navigator.language];

		const hasDutch = browserLanguages.some((language) => {
			const normalized = language.toLowerCase();
			return (
				normalized === "nl" ||
				normalized.startsWith("nl-") ||
				normalized === "nl-nl" ||
				normalized === "nl-be"
			);
		});

		const detectedLanguage = hasDutch ? "nl" : "en";
		localStorage.setItem("language", detectedLanguage);
		return detectedLanguage;
	})(),
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
