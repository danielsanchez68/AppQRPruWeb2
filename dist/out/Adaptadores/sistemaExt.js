"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const net_1 = __importDefault(require("net"));
const inversify_1 = require("inversify");
const config_1 = __importDefault(require("../../config"));
class NetPromise {
    constructor(imei) {
        this.client = new net_1.default.Socket();
        this.imei = imei;
        this.client.on('close', () => {
            console.log(`net Connection closed - IMEI[${this.imei}]`);
        });
        this.client.on('error', (err) => {
            console.error('Connection error:', err);
        });
    }
    conectar() {
        return new Promise((resolve, reject) => {
            const host = config_1.default.HOST_EXT;
            const port = config_1.default.PORT_EXT;
            console.log(`\nConectando ${host}:${port} - IMEI[${this.imei}]`);
            this.client.connect(port, host, () => {
                try {
                    resolve();
                }
                catch (error) {
                    console.log('Error client.connect', error.message);
                    this.client = null;
                    reject('Error cnx TCP');
                }
            });
        });
    }
    send(datos = {}) {
        return new Promise(resolve => {
            // adaptador de datos TX
            const datosTx = Object.assign({}, datos);
            delete datosTx.FyH;
            delete datosTx.Timestamp;
            if (datosTx.EMEI)
                datosTx.IMEI = datosTx.EMEI;
            delete datosTx.EMEI;
            datosTx.imei = this.imei;
            console.log(`[${Date.now()} ${new Date().toLocaleString()}] ext> ${JSON.stringify(datosTx)}`);
            let buffer = '';
            const handlerRx = (data) => {
                const datos = data.toString();
                buffer += datos;
                try {
                    const datosRx = JSON.parse(buffer);
                    buffer = '';
                    this.client.removeListener('data', handlerRx);
                    console.log(`[${Date.now()} ${new Date().toLocaleString()}] ext< ${JSON.stringify(datosRx)}`);
                    this.close();
                    resolve(datosRx);
                }
                catch (_a) { }
            };
            this.client.addListener('data', handlerRx);
            this.client.write(JSON.stringify(datosTx));
        });
    }
    close() {
        this.client.destroy();
    }
}
let SistemaExt = class SistemaExt {
    constructor() {
        const host = config_1.default.HOST_EXT;
        const port = config_1.default.PORT_EXT;
        console.log(`External System TCP set in ${host}:${port}`);
    }
    consultaTerminal(headers, datos) {
        return __awaiter(this, void 0, void 0, function* () {
            const { imei } = headers;
            const socketTCP = new NetPromise(imei);
            yield socketTCP.conectar();
            return yield socketTCP.send(datos);
        });
    }
};
SistemaExt = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], SistemaExt);
exports.default = SistemaExt;
