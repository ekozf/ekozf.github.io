"use client";

import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";

export default function CVDownloadButton() {
	const { t } = useTranslation();

	const downloadPDF = () => {
		// Create a link element and trigger download
		const link = document.createElement("a");
		link.href = "/Emir_Kaan_Ozver_CV.pdf";
		link.download = "Emir_Kaan_Ozver_CV.pdf";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<button
			onClick={downloadPDF}
			className='flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 border border-amber-500/30 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/20 hover:border-amber-500/50 text-base lg:text-lg'
		>
			<Download size={20} />
			{t("download_cv")}
		</button>
	);
}
