import { config } from "./config.js";
import axios from "axios";

const triggers = config.triggers.join(", ");

const client = axios.create({
	headers: {
		Authorization: "Bearer " + config.apiKey,
	},
});

function isTrigger(text) {
	let value = Math.random() <= 0.5;
	console.log(value);
	return value;
	// const params = {
	// 	prompt: `Answer with a Yes or a No only. Does the following text have the potential to upset an individual triggered by ${triggers}?\n +
	// 		${text}`,
	// 	model: "davinci-text-003",
	// 	max_tokens: 2,
	// 	temperature: 0,
	// };
	// console.log(config.apiKey);
	// client
	// 	.post("https://api.openai.com/v1/completions", params)
	// 	.then((result) => {
	// 		const response = result.data.choices[0].text;
	// 		console.log(params.prompt);
	// 		console.log("GPT says", response);
	// 		if (response === "Yes.") return true;
	// 		else return false;
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		return false;
	// 	});
}

function hideImageTweet(e) {
	function searchForImg(element) {
		if (element.tagName.toLowerCase() === "img") {
			element.style.display = "none";
			return;
		}
		for (let i = 0; i < element.childNodes.length; i++) {
			const child = element.childNodes[i];
			if (child.nodeType === Node.ELEMENT_NODE) {
				searchForImg(child);
			}
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
	// TWITTER
	const twt = "https://twitter.com";
	const regex_twt = new RegExp(`^${twt}`);
	if (regex_twt.test(window.location.href)) {
		const posts = document.querySelectorAll("article");
		posts.forEach((post) => {
			if (isTrigger(post.textContent)) {
				let topSpan = findSpans(post)[0].innerText.split(" ");
				if (topSpan[topSpan.length - 1] === "Retweeted") {
					findSpans(post)[8].innerHTML =
						innerHTML = `<i>This post contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog</b>.</small>`;
				} else {
					findSpans(
						post
					)[5].innerHTML = `<i>This post contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog</b>.</small>`;
				}
				hideImageTweet(post);
			}
		});
	}
	// FACEBOOK
	const fb = "https://facebook.com";
	const regex_fb = new RegExp(`^${fb}`);
	if (regex_fb.test(window.location.href)) {
		const posts = document.querySelectorAll('div[data-ad-preview="message"]');
		posts.forEach((post) => {
			if (isTrigger(post.textContent)) {
				findInnerFacebook(
					post
				).innerHTML = `<i>This post contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog.</b></small>`;
			}
		});
	}
}

setInterval(hidePosts, 2000);
