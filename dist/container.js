"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const container_types_1 = __importDefault(require("./container.types"));
// Adapters
const server_1 = __importDefault(require("./server"));
const UI_1 = __importDefault(require("./in/Adaptadores/http/UI"));
const maquina_1 = require("./in/Adaptadores/http/controladores/maquina");
const maquina_2 = __importDefault(require("./servicio/maquina"));
const sistemaExt_1 = __importDefault(require("./out/Adaptadores/sistemaExt"));
const usuario_1 = require("./in/Adaptadores/http/controladores/usuario");
exports.container = new inversify_1.Container();
//ui
exports.container.bind(container_types_1.default.IUI).to(UI_1.default);
//controllers ui
exports.container.bind(container_types_1.default.IControladorMaq).to(maquina_1.ControladorMaq);
exports.container.bind(container_types_1.default.IControladorUsuario).to(usuario_1.ControladorUsuario);
//services
exports.container.bind(container_types_1.default.IServicioMaquina).to(maquina_2.default);
//servicio TCP
exports.container.bind(container_types_1.default.ISistemaExt).to(sistemaExt_1.default).inSingletonScope();
//server
exports.container.bind(container_types_1.default.IServer).to(server_1.default);
