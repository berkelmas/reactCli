"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capitalizeCamelCase = (str) => {
    const newStr = str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
};
exports.default = capitalizeCamelCase;
