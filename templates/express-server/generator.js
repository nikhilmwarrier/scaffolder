const fs = require("fs");
const path = require("path");

function readFile(pathToFile) {
	return fs.readFileSync(path.join(__dirname, pathToFile)).toString();
}

module.exports = {
	files: function () {
		return {
			fileNames: [
				"index.js",
				"package.json",
				"public/index.html",
				"public/styles.css",
				"public/app.js",
				"public/favicon.ico",
			],
			fileContents: {
				"index.js": readFile("./index.js").toString(),
				"package.json": readFile("./package.json").toString(),
				"public/index.html": readFile("public/index.html").toString(),
				"public/styles.css": readFile("public/styles.css").toString(),
				"public/app.js": readFile("public/app.js").toString(),
				"public/favicon.ico": readFile("public/favicon.ico"),
			},
		};
	},
	finalMessage:
		"Open the project folder\nRun 'npm install' to install dependencies\nRun 'node index' start the server",
};
