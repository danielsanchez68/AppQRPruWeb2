"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const inversify_1 = require("inversify");
const mongoose_1 = __importDefault(require("mongoose"));
const DBMongo_1 = __importDefault(require("../DBMongo"));
let MaquinasDAO_MongoDB = class MaquinasDAO_MongoDB {
    constructor() {
        this.MaquinasModel = mongoose_1.default.model('maquinas', new mongoose_1.default.Schema({
            codigo: String,
            uuid: String,
            NombreFabricante: String,
            NombreJuego: String
        }, { versionKey: false }));
    }
    obtener() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!DBMongo_1.default.connectionOK)
                    throw new Error('[ERROR] DAO sin conexión a MongoDB');
                const maquinas = yield this.MaquinasModel.find({}).lean();
                return maquinas;
            }
            catch (error) {
                console.error('Error DAO Maquinas obtener(): ', error.message);
                return [];
            }
        });
    }
    actualizar(codigo, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!DBMongo_1.default.connectionOK)
                    throw new Error('[ERROR] DAO sin conexión a MongoDB');
                const productoActualizado = yield this.MaquinasModel.updateOne({ uuid: uuid }, { $set: { codigo } });
                return productoActualizado;
            }
            catch (error) {
                console.error('Error DAO Maquinas guardar(): ', error.message);
                return [];
            }
        });
    }
};
MaquinasDAO_MongoDB = __decorate([
    (0, inversify_1.injectable)()
], MaquinasDAO_MongoDB);
exports.default = MaquinasDAO_MongoDB;
