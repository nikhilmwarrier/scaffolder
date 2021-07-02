#!/usr/bin/env node

const inquirer = require("inquirer");
const colors = require("colors");
const fs = require("fs");
const { cwd } = require("process");

// Templates
const plain_HTML = require("./templates/plainHTML/generator");
const SCSS = require("./templates/scss/generator");
const nodejs_basic_server = require("./templates/nodejs-server/generator");
const express_server = require("./templates/express-server/generator");

const generators = { plain_HTML, SCSS, nodejs_basic_server, express_server };

inquirer
	.prompt([
		{
			type: "input",
			message: "Project Name",
			name: "projName",
		},
		{
			type: "list",
			message: "Pick Template",
			name: "template",
			choices: ["plain_HTML", "SCSS", "nodejs_basic_server", "express_server"],
		},
	])
	.then(answers => {
		const generator = generators[answers.template];
		if (!generator) {
			console.error("ERROR: Generator not found.".red);
			return;
		}
		if (fs.existsSync(`${cwd()}/${answers.projName}`)) {
			console.error("Directory already exists".red.underline);
			return;
		}
		fs.mkdirSync(`${cwd()}/${answers.projName}`);
		const fileNames = generator.files().fileNames;
		fileNames.forEach(file => {
			let content = generator.files().fileContents[file];
			if (typeof content === "string") {
				content = content.replace(/%%PROJECT_NAME%%/g, answers.projName);
			}
			if (
				file.includes("/") &&
				!fs.existsSync(`${cwd()}/${answers.projName}/${file.split("/")[0]}`)
			) {
				const newFolder = file.split("/")[0];
				file = file.split("/").reverse()[0];
				fs.mkdirSync(`${cwd()}/${answers.projName}/${newFolder}`);
				fs.writeFileSync(
					`${cwd()}/${answers.projName}/${newFolder}/${file}`,
					content,
					() => console.log(`File ${file} written`)
				);
			} else {
				fs.writeFileSync(`${cwd()}/${answers.projName}/${file}`, content, () =>
					console.log(`File ${file} written`.yellow)
				);
			}
		});

		console.log(`\nProject "${answers.projName}" created\n`.green);
		if (generator.finalMessage) console.log(`${generator.finalMessage}`.yellow);
	});
