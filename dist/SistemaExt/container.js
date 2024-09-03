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
const Maquinas_1 = __importDefault(require("./Servicio/Adaptadores/Maquinas"));
const UltimosMovimientos_1 = __importDefault(require("./Servicio/Adaptadores/UltimosMovimientos"));
const MaquinasDAO_FS_1 = __importDefault(require("./DAO/Adaptadores/MaquinasDAO_FS"));
const UltimosMovimientosDAO_FS_1 = __importDefault(require("./DAO/Adaptadores/UltimosMovimientosDAO_FS"));
const MaquinasDAO_MongoDB_1 = __importDefault(require("./DAO/Adaptadores/MaquinasDAO_MongoDB"));
const UltimosMovimientosDAO_MongoDB_1 = __importDefault(require("./DAO/Adaptadores/UltimosMovimientosDAO_MongoDB"));
const config_1 = __importDefault(require("./config"));
exports.container = new inversify_1.Container();
//services
exports.container.bind(container_types_1.default.IMaquinas).to(Maquinas_1.default);
exports.container.bind(container_types_1.default.IUltimosMovimientos).to(UltimosMovimientos_1.default);
//DAOs
if (config_1.default.MODO_PERSISTENCIA == 'MONGODB') {
    exports.container.bind(container_types_1.default.IMaquinasDAO).to(MaquinasDAO_MongoDB_1.default);
    exports.container.bind(container_types_1.default.IUltimosMovimientosDAO).to(UltimosMovimientosDAO_MongoDB_1.default);
}
else {
    exports.container.bind(container_types_1.default.IMaquinasDAO).to(MaquinasDAO_FS_1.default);
    exports.container.bind(container_types_1.default.IUltimosMovimientosDAO).to(UltimosMovimientosDAO_FS_1.default);
}
//server
exports.container.bind(container_types_1.default.IServer).to(server_1.default);
