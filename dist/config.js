"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8080;
const HOST_EXT = process.env.HOST_EXT || '127.0.0.1';
const PORT_EXT = process.env.PORT_EXT || 8081;
exports.default = {
    PORT,
    PORT_EXT,
    HOST_EXT,
};
