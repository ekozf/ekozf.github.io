function CalculateAge() {
	const born = new Date(2004, 7, 7);

	const now = new Date();

	let age = now.getFullYear() - born.getFullYear();

	const month = now.getMonth() - born.getMonth();

	if (month < 0 || (month === 0 && now.getDate() < born.getDate())) {
		age--;
	}

	const ageContainer = document.querySelectorAll(".age-container");

	for (let i = 0; i < ageContainer.length; i++) {
		ageContainer[i].textContent = age.toString();
	}
}

CalculateAge();
