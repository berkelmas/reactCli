"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateFile = (fileType) => {
    if (fileType === "component" || fileType === "service") {
        return true;
    }
    return false;
};
exports.default = validateFile;
