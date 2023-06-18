// Add event listeners to the checkboxes once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", () => {
			checkboxChanged(checkbox.id);
		});
	});
});

function checkboxChanged(checkboxId) {
	const checkbox = document.getElementById(checkboxId);

	chrome.storage.local.get("settings", function (result) {
		const settings = result.settings;
		settings[`${checkboxId}`] = !settings[`${checkboxId}`];
		chrome.storage.local.set({ settings: settings }, function () {
			console.log("Settings updated");
			console.log(settings);
		});
	});

	// if (checkbox.checked) {
	// 	console.log(`Checkbox ${checkboxId} is checked.`);
	// 	// Perform any action or call any function you want here
	// } else {
	// 	console.log(`Checkbox ${checkboxId} is unchecked.`);
	// 	// Perform any action or call any function you want here
	// }
}
