import React from "react";
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
	Link,
} from "@react-pdf/renderer";

const palette = {
	slate900: "#0f172a",
	slate800: "#1f2937",
	slate700: "#374151",
	slate500: "#6b7280",
	slate300: "#d1d5db",
	slate200: "#e5e7eb",
	white: "#ffffff",
	gray50: "#f9fafb",
	amber100: "#fef3c7",
	amber200: "#fde68a",
	amber500: "#f59e0b",
	amber600: "#d97706",
	amber700: "#b45309",
};

const styles = StyleSheet.create({
	page: {
		fontFamily: "Helvetica",
		backgroundColor: palette.white,
		color: palette.slate900,
	},
	// Top Bar Styles
	topBar: {
		backgroundColor: palette.slate900,
		color: palette.gray50,
		borderBottom: `4px solid ${palette.amber500}`,
		padding: "24px 32px",
	},
	topBarContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 24,
	},
	leftSection: {
		flex: 1,
	},
	mainTitle: {
		fontSize: 28,
		fontWeight: "bold",
		color: palette.gray50,
	},
	subtitle: {
		fontSize: 14,
		marginTop: 8,
		color: palette.slate300,
	},
	contactSection: {
		flexDirection: "row",
		gap: 24,
	},
	contactInfo: {
		fontSize: 11,
		color: palette.gray50,
	},
	contactRow: {
		flexDirection: "row",
		marginBottom: 6,
		alignItems: "center",
	},
	contactIcon: {
		width: 12,
		marginRight: 6,
		color: palette.amber500,
	},
	contactText: {
		fontSize: 11,
		color: palette.gray50,
	},
	contactLink: {
		color: palette.gray50,
		textDecoration: "none",
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		border: `4px solid ${palette.amber500}`,
	},
	// Body Styles
	body: {
		padding: "24px 32px",
	},
	bodyGrid: {
		flexDirection: "row",
		gap: 24,
	},
	leftColumn: {
		width: "40%",
	},
	rightColumn: {
		width: "60%",
	},
	// Section Styles
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 12,
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: 0.5,
		color: palette.amber700,
		marginBottom: 8,
	},
	// Education Styles
	educationItem: {
		marginBottom: 16,
	},
	educationTitle: {
		fontSize: 11,
		fontWeight: "bold",
		color: palette.slate900,
		marginBottom: 2,
	},
	educationSubtitle: {
		fontSize: 11,
		color: palette.slate700,
		marginBottom: 2,
	},
	educationMeta: {
		fontSize: 11,
		color: palette.slate500,
		marginBottom: 8,
	},
	educationDescription: {
		fontSize: 11,
		color: palette.slate700,
		lineHeight: 1.5,
	},
	// Experience Styles
	experienceItem: {
		marginBottom: 16,
	},
	experienceTitle: {
		fontSize: 12,
		fontWeight: "bold",
		color: palette.slate900,
		marginBottom: 2,
	},
	experienceCompany: {
		fontSize: 11,
		color: palette.slate700,
		marginBottom: 2,
	},
	experienceMeta: {
		fontSize: 10,
		color: palette.slate500,
		marginBottom: 6,
	},
	bulletPoint: {
		fontSize: 10,
		color: palette.slate700,
		marginBottom: 4,
		paddingLeft: 12,
		lineHeight: 1.4,
	},
	// Traits Styles
	traitRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	traitLabel: {
		fontSize: 12,
		color: palette.slate900,
	},
	traitStars: {
		flexDirection: "row",
		gap: 2,
	},
	star: {
		fontSize: 20,
		lineHeight: 1,
	},
	starFilled: {
		color: palette.amber500,
	},
	starEmpty: {
		color: palette.amber200,
	},
	// Profile Styles
	profileParagraph: {
		fontSize: 11,
		color: palette.slate700,
		lineHeight: 1.6,
		marginBottom: 8,
	},
	// Skills Styles
	skillItem: {
		marginBottom: 12,
	},
	skillHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	skillLabel: {
		fontSize: 11,
		color: palette.slate900,
	},
	skillPercentage: {
		fontSize: 11,
		color: palette.slate500,
	},
	skillBarContainer: {
		height: 6,
		backgroundColor: palette.slate200,
		borderRadius: 3,
		overflow: "hidden",
	},
	skillBarFill: {
		height: 6,
		backgroundColor: palette.amber600,
	},
	// Project Styles
	projectHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 4,
	},
	projectTitle: {
		fontSize: 12,
		fontWeight: "bold",
		color: palette.slate900,
		textDecoration: "none",
	},
	projectDescription: {
		fontSize: 11,
		color: palette.slate700,
		lineHeight: 1.5,
	},
});

interface IconData {
	mail?: string;
	phone?: string;
	globe?: string;
	linkedin?: string;
	github?: string;
	map?: string;
}

export default function CVDocumentPDF({
	imageData,
	iconData,
}: {
	imageData?: string;
	iconData?: IconData;
}) {
	const traits = [
		{ label: "Teamwork", rating: 5 },
		{ label: "Verantwoordelijk", rating: 5 },
		{ label: "Praktisch", rating: 4 },
		{ label: "Gefocust", rating: 4 },
		{ label: "Flexibel", rating: 4 },
		{ label: "Leergierig", rating: 5 },
	];

	const profileParagraphs = [
		"Full stack developer uit Heusden-Zolder met focus op betrouwbaar resultaat dat zakelijk impact maakt. Ik beweeg vlot tussen frontend, backend en infrastructuur om features end-to-end op te leveren.",
		"Ik floreer onder druk, scherp scope aan en focus op leesbare code, nette interfaces en snelle feedback. Ervaring met webplatformen en mobiele apps met aandacht voor security en toegankelijkheid.",
	];

	const skills = [
		{ label: "C# / .NET", level: 85 },
		{ label: "Java / Spring", level: 80 },
		{ label: "JavaScript / TypeScript", level: 85 },
		{ label: "React / React Native", level: 80 },
		{ label: "Vue", level: 85 },
		{ label: "Software Architectuur", level: 85 },
		{ label: "Cloud & DevOps", level: 65 },
	];

	const contactItems = [
		{
			key: "email",
			icon: iconData?.mail,
			text: "ozveremirkaan@gmail.com",
			href: "mailto:ozveremirkaan@gmail.com",
		},
		{
			key: "phone",
			icon: iconData?.phone,
			text: "+32 489 89 72 81",
			href: "tel:+32489897281",
		},
		{
			key: "site",
			icon: iconData?.globe,
			text: "emirkaan.be",
			href: "https://emirkaan.be",
		},
		{
			key: "linkedin",
			icon: iconData?.linkedin,
			text: "LinkedIn: Emir Kaan Ozver",
			href: "https://www.linkedin.com/in/emir-kaan-ozver",
		},
		{
			key: "github",
			icon: iconData?.github,
			text: "GitHub: ekozf",
			href: "https://github.com/ekozf",
		},
		{
			key: "location",
			icon: iconData?.map,
			text: "Heusden-Zolder, Belgie",
		},
	];

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				{/* Top Bar */}
				<View style={styles.topBar}>
					<View style={styles.topBarContent}>
						<View style={styles.leftSection}>
							<Text style={styles.mainTitle}>Emir Kaan Özver</Text>
							<Text style={styles.subtitle}>Full Stack Software Developer</Text>
						</View>
						<View style={styles.contactSection}>
							<View style={styles.contactInfo}>
								{contactItems.map((item) => (
									<View key={item.key} style={styles.contactRow}>
										{item.icon && (
											<Image
												src={item.icon}
												style={{ width: 12, height: 12, marginRight: 6 }}
											/>
										)}
										{item.href ? (
											<Link src={item.href} style={styles.contactLink}>
												<Text style={styles.contactText}>{item.text}</Text>
											</Link>
										) : (
											<Text style={styles.contactText}>{item.text}</Text>
										)}
									</View>
								))}
							</View>
							{imageData && (
								<Image src={imageData} style={styles.profileImage} />
							)}
						</View>
					</View>
				</View>

				{/* Body */}
				<View style={styles.body}>
					<View style={styles.bodyGrid}>
						{/* Left Column */}
						<View style={styles.leftColumn}>
							{/* Education */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Opleiding</Text>
								<View style={styles.educationItem}>
									<Text style={styles.educationTitle}>
										Professionele Bachelor
									</Text>
									<Text style={styles.educationSubtitle}>
										Toegepaste Informatica - Applicatieontwikkeling
									</Text>
									<Text style={styles.educationMeta}>
										Hogeschool PXL · 2022 - 2026
									</Text>
									<Text style={styles.educationDescription}>
										Focus op applicatieontwikkeling, architectuur en full-stack
										delivery.
									</Text>
								</View>
							</View>

							{/* Experience */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Werkervaring</Text>
								<View style={styles.experienceItem}>
									<Text style={styles.experienceTitle}>
										Studentenjob Software Developer
									</Text>
									<Text style={styles.experienceCompany}>
										ElaN Languages Heusden
									</Text>
									<Text style={styles.experienceMeta}>2022 - 2025</Text>
									<Text style={styles.bulletPoint}>
										• Full-stack features gebouwd voor een modern e-learning
										platform.
									</Text>
									<Text style={styles.bulletPoint}>
										• Geleverd: heldere APIs, stabiele UI en productieklare
										releases.
									</Text>
								</View>
							</View>

							{/* Traits */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Eigenschappen</Text>
								{traits.map((trait) => (
									<View key={trait.label} style={styles.traitRow}>
										<Text style={styles.traitLabel}>{trait.label}</Text>
										<View style={styles.traitStars}>
											{Array.from({ length: 5 }).map((_, index) => (
												<Text
													key={`${trait.label}-${index}`}
													style={[
														styles.star,
														index < trait.rating
															? styles.starFilled
															: styles.starEmpty,
													]}
												>
													*
												</Text>
											))}
										</View>
									</View>
								))}
							</View>
						</View>

						{/* Right Column */}
						<View style={styles.rightColumn}>
							{/* Profile */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Wie ben ik</Text>
								{profileParagraphs.map((paragraph, index) => (
									<Text key={index} style={styles.profileParagraph}>
										{paragraph}
									</Text>
								))}
							</View>

							{/* Skills */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Skills</Text>
								{skills.map((skill) => (
									<View key={skill.label} style={styles.skillItem}>
										<View style={styles.skillHeader}>
											<Text style={styles.skillLabel}>{skill.label}</Text>
											<Text style={styles.skillPercentage}>{skill.level}%</Text>
										</View>
										<View style={styles.skillBarContainer}>
											<View
												style={[
													styles.skillBarFill,
													{ width: `${skill.level}%` },
												]}
											/>
										</View>
									</View>
								))}
							</View>

							{/* Example Project */}
							<View style={styles.section}>
								<Text style={styles.sectionTitle}>Voorbeeldproject</Text>
								<View style={styles.projectHeader}>
									<Link
										src='https://github.com/ekozf/MyMedSchedule'
										style={styles.projectTitle}
									>
										MyMedSchedule
									</Link>
									<Text style={{ fontSize: 10, color: palette.amber600 }}>
										<Image
											src={iconData?.github}
											style={{ width: 12, height: 12, marginRight: 6 }}
										/>
									</Text>
								</View>
								<Text style={styles.projectDescription}>
									Offline-first app voor medicatiebeheer met versleutelde opslag
									en slimme reminders.
								</Text>
							</View>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
}
