"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = require("./container");
const container_types_1 = __importDefault(require("./container.types"));
require("./SistemaExt/index");
process.on('uncaughtException', function (err) {
    console.log('EXCEPCIÓN:', err.message, err);
});
container_1.container.get(container_types_1.default.IServer).start();
