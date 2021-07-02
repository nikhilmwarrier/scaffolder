const fs = require("fs");
const path = require("path");

function readFile(pathToFile) {
	return fs.readFileSync(path.join(__dirname, pathToFile));
}

module.exports = {
	files: function () {
		return {
			fileNames: ["index.html", "styles.css", "app.js", "favicon.ico"],
			fileContents: {
				"index.html": readFile("index.html").toString(),
				"styles.css": readFile("style.css").toString(),
				"app.js": readFile("app.js").toString(),
				"favicon.ico": readFile("favicon.ico"),
			},
		};
	},
};
