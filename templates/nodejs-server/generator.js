const fs = require("fs");
const path = require("path");

function readFile(pathToFile) {
	return fs.readFileSync(path.join(__dirname, pathToFile)).toString();
}

module.exports = {
	files: function () {
		return {
			fileNames: ["index.js", "package.json"],
			fileContents: {
				"index.js": readFile("./index.js"),
				"package.json": readFile("./package.json"),
			},
		};
	},
	finalMessage:
		"Open the project folder and run 'node index' to start the server",
};
