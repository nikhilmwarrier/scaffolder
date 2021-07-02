const fs = require("fs");
const path = require("path");

function readFile(pathToFile) {
	return fs.readFileSync(path.join(__dirname, pathToFile));
}

module.exports = {
	files: function () {
		return {
			fileNames: [
				"index.html",
				"styles.css",
				"app.js",
				"scss/main.scss",
				"favicon.ico",
			],
			fileContents: {
				"index.html": readFile("index.html").toString(),
				"styles.css": readFile("styles.css").toString(),
				"scss/main.scss": readFile("scss/main.scss").toString(),
				"app.js": readFile("app.js").toString(),
				"favicon.ico": readFile("favicon.ico"),
			},
		};
	},
	finalMessage:
		"Don't forget to run the Sass compiler:\n	sass scss/main.scss styles.css --watch",
};
