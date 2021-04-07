#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const { cwd } = require("process");
const cssReset = `*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body{
    height: 100%;
    width: 100%;
}
body{
    background: #35495e;
}
h1{
    font-family: "Roboto", sans-serif;
    color: #41b883;
    font-weight: normal;
    text-align: center;
    padding: 30px;
}
`;

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
      choices: ["plainHTML", "SCSS"],
    },
  ])
  .then(answers => {
    fs.mkdirSync(`${cwd()}/${answers.projName}`);

    if (answers.template === "plainHTML") {
      fs.writeFileSync(
        `${cwd()}/${answers.projName}/index.html`,
        htmlTemplate(answers.projName),
        function () {
          console.log("Written index.html");
        }
      );
      fs.writeFileSync(
        `${cwd()}/${answers.projName}/styles.css`,
        cssReset,
        function () {
          console.log("Written styles.css");
        }
      );
    } else if (answers.template === "SCSS") {
      fs.writeFileSync(
        `${cwd()}/${answers.projName}/index.html`,
        htmlTemplate(answers.projName),
        function () {
          console.log("Written index.html");
        }
      );
      fs.writeFileSync(
        `${cwd()}/${answers.projName}/styles.css`,
        cssReset,
        function () {
          console.log("Written styles.css");
        }
      );
      fs.writeFileSync(
        `${cwd()}/${answers.projName}/styles.scss`,
        cssReset,
        function () {
          console.log("Written styles.scss");
        }
      );
      console.log("Don't forget to compile your SCSS!");
    }

    fs.writeFileSync(
      `${cwd()}/${answers.projName}/app.js`,
      'console.log("Hello World!")',
      function () {
        console.log("Written app.js");
      }
    );

    console.log(`Project "${answers.projName}" created`);
  });

function htmlTemplate(title) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="styles.css" />
      <script src="app.js" defer></script>
      <title>${title}</title>
    </head>
    <body>
        <h1>${title}</h1>
    </body>
  </html>
  `;
}
