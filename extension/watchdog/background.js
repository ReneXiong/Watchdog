chrome.runtime.onInstalled.addListener(function () {
	// Default settings object
	const watchdogSettings = {
		facebook: false,
		twitter: false,
		reddit: false,
		ptsd: false,
		racism: false,
		sexism: false,
		dysmorphia: false,
		ss: false,
		selfharm: false,
	};

	// Save the default settings to Chrome storage
	chrome.storage.sync.set({ settings: watchdogSettings }, function () {
		console.log("Default settings initialized");
	});
});
