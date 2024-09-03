"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = require("./container");
const container_types_1 = __importDefault(require("./container.types"));
const config_1 = __importDefault(require("./config"));
const DBMongo_1 = __importDefault(require("./DAO/DBMongo"));
process.on('uncaughtException', function (err) {
    console.log('EXCEPCIÓN:', err.message, err);
});
if (config_1.default.MODO_PERSISTENCIA == 'MONGODB') {
    ;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        yield DBMongo_1.default.conectar();
        startcontainer();
    }))();
}
else
    startcontainer();
function startcontainer() {
    container_1.container.get(container_types_1.default.IServer).start();
}
