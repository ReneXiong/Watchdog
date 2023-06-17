const path = require("path");

module.exports = {
	entry: "./contentScript.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "contentScript.bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
		],
	},
};
