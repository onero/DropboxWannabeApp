"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
exports.uploadedFileToStorage = functions.storage.object().onFinalize(event => {
    console.log('New file uploaded!');
});
//# sourceMappingURL=index.js.map