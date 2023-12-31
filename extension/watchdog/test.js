const axios = require("axios");
const config = require("./config.js");
const { performance } = require("perf_hooks");

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

const startTime = performance.now();
const text = "Albert Camus once wrote that suicide is philosophically absurd";

const params = {
	messages: [
		{
			role: "system",
			content:
				"You are an application that responds only with a 'Yes.' or a 'No.' whether the given text is likely to be triggering or not.",
		},
		{
			role: "user",
			content: `Answer only with Yes or No. Will the following text individuals with the trigger/s 'Race-based hate' or 'Suicide and self-harm'? ${text}`,
		},
	],
	model: "gpt-3.5-turbo",
	max_tokens: 2,
	temperature: 0,
};
console.log(text);
console.log("Is this triggering?");
client
	.post("https://api.openai.com/v1/chat/completions", params)
	.then((response) => {
		console.log(response.data.choices[0].message.content);
		console.log(
			`Code execution time: ${performance.now() - startTime} milliseconds`
		);
	})
	.catch((err) => {
		console.log(err);
	});
