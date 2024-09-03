"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delay = ms => new Promise(r => setTimeout(r, ms));
exports.default = delay;
