import yargs from "yargs";
import * as fs from "fs";
import * as path from "path";
import parsePath from "parse-filepath";
import ensureDirectoryExistence from "./utility/ensureDirectoryExistance";
import capitalizeCamelCase from "./utility/CapitalizeCamelCase";

const getTemplate = (fileType: ".js" | ".tsx"): string => {
  if (fileType === ".js") {
    return fs
      .readFileSync("./templates/functional-template", {
        encoding: "utf-8",
      })
      .toString();
  } else {
    return fs
      .readFileSync("./templates/functional-template-typescript", {
        encoding: "utf-8",
      })
      .toString();
  }
};

const createComponent = (
  path: string,
  styleSheetProcessor: "css" | "scss" | "less",
  styleSheetType: "module" | "normal"
) => {
  ensureDirectoryExistence(path);
  const { name, extname, dir } = parsePath(path);
  const fileName = `${capitalizeCamelCase(name)}`;
  let data = getTemplate(extname as ".js" | ".tsx");
  data = data.replace(/{% name %}/gi, fileName);
  if (styleSheetType === "module") {
    data = data.replace(
      /{% stylesheetPath %}/gi,
      `./${name}.module.${styleSheetProcessor}`
    );
    fs.writeFileSync(`${dir}/${name}.module.${styleSheetProcessor}`, "");
  } else {
    data = data.replace(
      /{% stylesheetPath %}/gi,
      `./${name}.${styleSheetProcessor}`
    );
    fs.writeFileSync(`${dir}/${name}.${styleSheetProcessor}`, "");
  }

  fs.writeFileSync(path, data);
};
const argv = yargs
  .usage("Usage: generate <component | service> ")
  .command(
    "component [path]",
    "File type to be created",
    (yargs) => {
      yargs.positional("path", {
        type: "string",
        default: "./",
        describe: "filepath to create",
      });
    },
    function (argv) {
      createComponent(
        argv.path as string,
        argv.stylesheetprocessor as "css" | "scss" | "less",
        argv.stylesheet as "module" | "normal"
      );
    }
  )
  .alias("s", "stylesheet")
  .describe("s", "choose stylesheet type")
  .choices("s", ["module", "normal"])
  .default({ s: "module" })
  .alias("sp", "stylesheetprocessor")
  .describe("sp", "choose style processor type")
  .choices("sp", ["css", "scss", "less"])
  .default({ sp: "scss" })
  .help("h")
  .alias("h", "help")
  .epilog("copyright 2019").argv;

// console.log(argv);

// var fs = require("fs");
// console.log(argv.file);
// var s = fs.createReadStream(argv.file);

// var lines = 0;
// s.on("data", function (buf: any) {
//   lines += buf.toString().match(/\n/g).length;
// });

// s.on("end", function () {
//   console.log(lines);
// });

// import * as fs from "fs";
// import * as path from "path";
// import parsePath from "parse-filepath";
// import ensureDirectoryExistence from "./utility/ensureDirectoryExistance";
// import capitalizeCamelCase from "./utility/CapitalizeCamelCase";

// // print process.argv
// const parsedObj: { [key: string]: string | null } = process.argv.reduce(
//   (prev, curr, index, arr) => {
//     // console.log(`${index}: ${val}`);
//     if (index < 2) {
//       return prev;
//     }
//     if (index === 3) {
//       return { ...prev, path: curr };
//     }
//     return { ...prev, [curr]: 1 };
//   },
//   {}
// );

// if (parsedObj["component"] && parsedObj["path"]) {
//   ensureDirectoryExistence(parsedObj.path);
//   const { name, extname } = parsePath(parsedObj["path"]);
//   const fileName = `${capitalizeCamelCase(name)}`;
//   // console.log(fileName);
//   let data = fs
//     .readFileSync("./templates/functional-template", {
//       encoding: "utf-8",
//     })
//     .toString();
//   data = data.replace(/{% name %}/gi, fileName);
//   // console.log(data);
//   fs.writeFileSync(parsedObj.path as string, data);
// } else {
//   console.log("INVALID");
// }
