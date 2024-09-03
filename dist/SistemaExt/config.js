"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const HOST_EXT = process.env.HOST_EXT || '127.0.0.1';
const PORT_EXT = process.env.PORT_EXT || 8081;
const STRCNX = process.env.STRCNX || 'mongodb://127.0.0.1';
const BASE = process.env.BASE || 'test';
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'FILE';
exports.default = {
    PORT_EXT,
    HOST_EXT,
    STRCNX,
    BASE,
    MODO_PERSISTENCIA
};
