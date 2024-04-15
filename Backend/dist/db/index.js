"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define MongoDB schema and model for file information
const fileSchema = new mongoose_1.default.Schema({
    filename: String,
    cloudinaryUrl: String,
    size: Number,
});
const File = mongoose_1.default.model('File', fileSchema);
exports.default = { File };
