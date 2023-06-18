import config from "./config.js";
import axios from "axios";

// GPT stuff
const client = axios.create({
	headers: {
		Authorization: "Bearer " + config.apiKey,
	},
});

// Process each post as trigger or not
function isTrigger(text) {
	// Parse triggers
	let triggers = [];
	chrome.storage.sync.get("settings", function (result) {
		const settings = result.settings;
		if (settings["ptsd"]) {
			triggers.push("War and gore");
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
	});
	const params = {
		messages: [
			{
				role: "system",
				content:
					"You are an application that responds only with a 'Yes.' or a 'No.' whether the given text is likely to be triggering or not.",
			},
			{
				role: "user",
				content: `Answer only with Yes or No. Will the following text individuals with the trigger/s ${triggers} ${text}`,
			},
		],
		model: "gpt-3.5-turbo-16k-0613",
		max_tokens: 2,
		temperature: 0,
	};

	// Call GPT
	client
		.post("https://api.openai.com/v1/chat/completions", params)
		.then((response) => {
			if (response.data.choices[0].message.content === "Yes.") {
				console.log("Trigger detected!");
				return true;
			} else return false;
		})
		.catch((err) => {
			console.log(err);
			return false;
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
		console.log(settings);
		// TWITTER
		const twt = "https://twitter.com";
		const regex_twt = new RegExp(`^${twt}`);
		if (settings["twitter"] && regex_twt.test(window.location.href)) {
			console.log("Checking tweets");
			const tweets = document.querySelectorAll("article");
			tweets.forEach((tweet) => {
				if (isTrigger(tweet.textContent)) {
					let topSpan = findSpans(tweet)[0].innerText.split(" ");
					if (topSpan[topSpan.length - 1] === "Retweeted") {
						findSpans(tweet)[8].innerHTML =
							innerHTML = `<i>This tweet contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog</b>.</small>`;
					} else {
						findSpans(
							tweet
						)[5].innerHTML = `<i>This tweet contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog</b>.</small>`;
					}
					hideImage(tweet);
				}
			});
		}
		// FACEBOOK
		const fb = "https://www.facebook.com";
		const regex_fb = new RegExp(`^${fb}`);
		if (settings["facebook"] && regex_fb.test(window.location.href)) {
			console.log("Checking posts");
			const posts = document.querySelectorAll('div[data-ad-preview="message"]');
			posts.forEach((post) => {
				if (isTrigger(post.textContent)) {
					post.innerHTML = `<i>This post contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog.</b></small>`;
				}
				hideImage(post.parentNode.parentNode);
			});
		}
	});
}

setInterval(hidePosts, 10000);
