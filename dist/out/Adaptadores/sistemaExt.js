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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const inversify_1 = require("inversify");
const config_1 = __importDefault(require("../../config"));
class NetPromise {
    constructor() {
        this.client = new net_1.default.Socket();
        const host = config_1.default.HOST_EXT;
        const port = config_1.default.PORT_EXT;
        this.client.on('close', () => {
            //console.log('net Connection closed');
        });
        this.client.on('error', (err) => {
            console.error('Connection error:', err);
        });
        this.client.connect(port, host, () => {
            try {
                //console.log(`Connect net ${host}:${port}`);
            }
            catch (error) {
                console.log('Error client.connect', error.message);
                this.client = null;
            }
        });
    }
    send(cmd, datos = {}) {
        // adaptador de datos TX
        const datosTx = Object.assign({}, datos);
        delete datosTx.FyH;
        delete datosTx.Timestamp;
        if (datosTx.EMEI)
            datosTx.IMEI = datosTx.EMEI;
        delete datosTx.EMEI;
        //console.log('>tx:', datosTx)
        return new Promise(resolve => {
            let buffer = '';
            this.client.write(JSON.stringify(datosTx));
            this.client.on('data', (data) => {
                buffer += data.toString();
                try {
                    const datosRx = JSON.parse(buffer);
                    this.client.destroy();
                    //console.log('<rx:', datosRx, '\n')
                    resolve(datosRx);
                }
                catch (_a) { }
            });
        });
    }
}
let SistemaExt = class SistemaExt {
    constructor() {
        const host = config_1.default.HOST_EXT;
        const port = config_1.default.PORT_EXT;
        console.log(`External System TCP set in ${host}:${port}`);
    }
    consultaTerminal(datos) {
        return new NetPromise().send(datos.Comando, datos);
    }
};
SistemaExt = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], SistemaExt);
exports.default = SistemaExt;
