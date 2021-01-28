"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const parse_filepath_1 = __importDefault(require("parse-filepath"));
const ensureDirectoryExistance_1 = __importDefault(require("./utility/ensureDirectoryExistance"));
const CapitalizeCamelCase_1 = __importDefault(require("./utility/CapitalizeCamelCase"));
const getTemplate = (fileType) => {
    if (fileType === ".js") {
        return fs
            .readFileSync(path.join(__dirname, "./templates/functional-template"), {
            encoding: "utf-8",
        })
            .toString();
    }
    else {
        return fs
            .readFileSync(path.join(__dirname, "./templates/functional-template-typescript"), {
            encoding: "utf-8",
        })
            .toString();
    }
};
const createComponent = (path, styleSheetProcessor, styleSheetType) => {
    ensureDirectoryExistance_1.default(path);
    const { name, extname, dir } = parse_filepath_1.default(path);
    const fileName = `${CapitalizeCamelCase_1.default(name)}`;
    let data = getTemplate(extname);
    data = data.replace(/{% name %}/gi, fileName);
    if (styleSheetType === "module") {
        data = data.replace(/{% stylesheetPath %}/gi, `./${name}.module.${styleSheetProcessor}`);
        fs.writeFileSync(`${dir}/${name}.module.${styleSheetProcessor}`, "");
    }
    else {
        data = data.replace(/{% stylesheetPath %}/gi, `./${name}.${styleSheetProcessor}`);
        fs.writeFileSync(`${dir}/${name}.${styleSheetProcessor}`, "");
    }
    fs.writeFileSync(path, data);
};
const argv = yargs_1.default
    .usage("Usage: generate <component | service> ")
    .command("component [path]", "File type to be created", (yargs) => {
    yargs.positional("path", {
        type: "string",
        default: "./",
        describe: "filepath to create",
    });
}, function (argv) {
    createComponent(path.join(process.cwd(), argv.path), argv.stylesheetprocessor, argv.stylesheet);
})
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
