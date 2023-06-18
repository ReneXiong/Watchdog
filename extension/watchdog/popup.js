// Get the settings from local storage
chrome.storage.sync.get("settings", function (result) {
	const settings = result.settings || {};

	// Set the initial state of toggle switches for enabled sites
	const enabledSites = ["twitter", "facebook"];
	enabledSites.forEach((site) => {
		const toggleSwitch = document.getElementById(site);
		if (toggleSwitch) {
			toggleSwitch.checked = settings[site] || false;
		}
	});

	// Set the initial state of checkbox triggers
	const triggers = ["ptsd", "racism", "sexism", "dysmorphia", "ss", "selfharm"];
	triggers.forEach((trigger) => {
		const checkbox = document.getElementById(trigger);
		if (checkbox) {
			checkbox.checked = settings[trigger] || false;
		}
	});
});

// Handle changes in toggle switches for enabled sites
const toggleSwitches = document.querySelectorAll(
	'.toggle-item input[type="checkbox"]'
);
toggleSwitches.forEach((switchElement) => {
	switchElement.addEventListener("change", function () {
		const site = this.id;
		const value = this.checked;

		// Get the current settings from local storage
		chrome.storage.sync.get("settings", function (result) {
			const settings = result.settings || {};

			// Update the settings for the specific site
			settings[site] = value;

			// Save the updated settings to local storage
			chrome.storage.sync.set({ settings }, function () {
				console.log("Settings updated:", settings);
			});
		});
	});
});
