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
let UltimosMovimientosDAO_MongoDB = class UltimosMovimientosDAO_MongoDB {
    constructor() {
        this.MovimientosModel = mongoose_1.default.model('movimientos', new mongoose_1.default.Schema({
            Fabricante: String,
            Juego: String,
            UID: String,
            Importe: Number,
            FechaHora: String
        }, { versionKey: false }));
    }
    obtener() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!DBMongo_1.default.connectionOK)
                    throw new Error('[ERROR] DAO sin conexión a MongoDB');
                const movimientos = yield this.MovimientosModel.find({}).lean();
                return movimientos;
            }
            catch (error) {
                console.error('Error DAO ultimosMovimientos this.obtener(): ', error.message);
                return [];
            }
        });
    }
    guardar(movimiento) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!DBMongo_1.default.connectionOK)
                    throw new Error('[ERROR] DAO sin conexión a MongoDB');
                const movimientosModel = new this.MovimientosModel(movimiento);
                const movimientoGuardado = yield movimientosModel.save();
                return movimientoGuardado;
            }
            catch (error) {
                console.error('Error DAO ultimosMovimientos this.this.guardar(): ', error.message);
                return [];
            }
        });
    }
};
UltimosMovimientosDAO_MongoDB = __decorate([
    (0, inversify_1.injectable)()
], UltimosMovimientosDAO_MongoDB);
exports.default = UltimosMovimientosDAO_MongoDB;
