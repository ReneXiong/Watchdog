import config from "./config.js";
import axios from "axios";
const triggers = config.triggers.join(", ");
let queries = 0;

// const client = axios.create({
// 	headers: {
// 		Authorization: "Bearer " + config.apiKey,
// 	},
// });

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

function hideImage(e) {
	function searchForImg(element) {
		if (element.tagName.toLowerCase() === "img" && element.alt !== "") {
			console.log(element);
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
	queries++;
	console.log(queries);
	// TWITTER
	const twt = "https://twitter.com";
	const regex_twt = new RegExp(`^${twt}`);
	if (regex_twt.test(window.location.href)) {
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
	if (regex_fb.test(window.location.href)) {
		console.log("Matches fb!");
		console.log("Checking posts");
		const posts = document.querySelectorAll('div[data-ad-preview="message"]');
		posts.forEach((post) => {
			if (isTrigger(post.textContent)) {
				post.innerHTML = `<i>This post contains themes that may upset you.</i><br/><br/><small>This warning was brought to you by <b>Watchdog.</b></small>`;
			}
			hideImage(post.parentNode.parentNode);
		});
	}
}

setInterval(hidePosts, 2000);
