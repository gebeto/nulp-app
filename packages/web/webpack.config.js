const path = require("path");


module.exports = {
	entry: path.resolve(__dirname, "src", "index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js"
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "babel-loader"
			}
		]
	}
}