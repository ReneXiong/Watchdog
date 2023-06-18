import config from "./config.js";
import axios from "axios";

String.prototype.d = function () {
	var j;
	var h = this.match(/.{1,4}/g) || [];
	var back = "";
	for (j = 0; j < h.length; j++) {
		back += String.fromCharCode(parseInt(h[j], 16));
	}
	return back;
};

// GPT stuff
const client = axios.create({
	headers: {
		Authorization: "Bearer " + config.ak.d(),
	},
});

// Process each post as trigger or not
function isTrigger(text) {
	return new Promise((resolve, reject) => {
		// Parse triggers
		let triggers = [];
		chrome.storage.sync.get("settings", function (result) {
			const settings = result.settings;
			if (settings["ptsd"]) {
				triggers.push("War");
			}
			if (settings["racism"]) {
				triggers.push("Race-related hate");
			}
			if (settings["sexism"]) {
				triggers.push("Gender-related hate");
			}
			if (settings["dysmorphia"]) {
				triggers.push("Body-related hate");
			}
			if (settings["ss"]) {
				triggers.push("Sexual violence");
			}
			if (settings["selfharm"]) {
				triggers.push("Suicide and self-harm");
			}
			triggers = triggers.join(", ");

			// Call GPT
			const chat = `Answer only with 'Yes.' or 'No.'. Does the following tweet cover one of the following trigger categories: ${triggers}? "${text}"`;
			const params = {
				messages: [
					{
						role: "system",
						content:
							"You are an application that determines whether the given text might be triggering.",
					},
					{
						role: "user",
						content: chat,
					},
				],
				model: "gpt-3.5-turbo-16k-0613",
				max_tokens: chat.split(" ").length,
				temperature: 0,
			};
			client
				.post("https://api.openai.com/v1/chat/completions", params)
				.then((response) => {
					if (response.data.choices[0].message.content == "Yes.") {
						resolve(true);
					} else resolve(false);
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		});
	});
}

// Blur all videos and images
function hideImage(e) {
	function searchForImg(element) {
		if (
			(element.tagName.toLowerCase() === "img" && element.alt !== "") ||
			element.tagName.toLowerCase() === "video"
		) {
			element.style.filter = "blur(20px)";
			element.parentNode.style.filter = "blur(20px)";
		}
		for (let i = 0; i < element.children.length; i++) {
			const child = element.children[i];
			searchForImg(child);
		}
	}
	searchForImg(e);
}

function findSpans(e) {
	let spanElements = [];
	function searchForSpans(element) {
		if (element.tagName.toLowerCase() === "span") {
			spanElements.push(element);
		}
		for (let i = 0; i < element.childNodes.length; i++) {
			const child = element.childNodes[i];
			if (child.nodeType === Node.ELEMENT_NODE) {
				searchForSpans(child);
			}
		}
	}
	searchForSpans(e);
	return spanElements;
}

function findInnerFacebook(e) {
	let inner = e;
	while (inner.lastElementChild) {
		inner = inner.lastElementChild;
	}
	return inner;
}

function hidePosts() {
	chrome.storage.sync.get("settings", function (result) {
		const settings = result.settings;
		// TWITTER
		const twt = "https://twitter.com";
		const regex_twt = new RegExp(`^${twt}`);
		if (settings["twitter"] && regex_twt.test(window.location.href)) {
			const tweets = document.querySelectorAll("article");
			tweets.forEach((tweet) => {
				isTrigger(tweet.textContent).then((triggerDetected) => {
					if (triggerDetected) {
						let topSpan = findSpans(tweet)[0].innerText.split(" ");
						if (topSpan[topSpan.length - 1] === "Retweeted") {
							findSpans(tweet)[8].parentNode.innerHTML =
								innerHTML = `<i>This tweet contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog</b>.</small>`;
						} else {
							findSpans(
								tweet
							)[5].parentNode.innerHTML = `<i>This tweet contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog</b>.</small>`;
						}
						hideImage(tweet);
					}
				});
			});
		}
		// FACEBOOK
		const fb = "https://www.facebook.com";
		const regex_fb = new RegExp(`^${fb}`);
		if (settings["facebook"] && regex_fb.test(window.location.href)) {
			const posts = document.querySelectorAll('div[data-ad-preview="message"]');
			posts.forEach((post) => {
				isTrigger(post.textContent).then((triggerDetected) => {
					if (triggerDetected) {
						findInnerFacebook(
							post
						).innerHTML = `<i>This post contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog.</b></small>`;
						hideImage(post.parentNode.parentNode);
					}
				});
			});
		}
	});
}

setInterval(hidePosts, 10000);
