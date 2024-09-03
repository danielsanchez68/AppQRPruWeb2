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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const container_types_1 = __importDefault(require("../../container.types"));
let Maquinas = class Maquinas {
    constructor(maquinasDao) {
        this.maquinasDao = maquinasDao;
    }
    obtenerPorCodigo(codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const maquinas = yield this.maquinasDao.obtener();
                const maquina = maquinas.find(maquina => maquina.codigo === codigo);
                if (!maquina)
                    throw new Error(`código ${codigo} no relacionado a ninguna máquina`);
                return maquina;
            }
            catch (error) {
                return { error: error.message };
            }
        });
    }
    relacionarCodigo(codigo, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(codigo, uuid)
                //await this.maquinasDao.guardar(maquinas)
                yield this.maquinasDao.actualizar(codigo, uuid);
                const maquinasActualizada = yield this.maquinasDao.obtener();
                return maquinasActualizada;
                //}
                //else throw new Error(`máquina ${uuid} ya relacionada con el código ${maquina.codigo}`)
            }
            catch (error) {
                return { error: error.message };
            }
        });
    }
    filtrarPorUuid(uuidParcial) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const maquinas = yield this.maquinasDao.obtener();
                //console.log(maquinas)
                const maquinasUuid = uuidParcial ? maquinas.filter(maq => maq.uuid.includes(uuidParcial)) : [];
                if (!maquinasUuid)
                    throw new Error(`uuid parcial ${uuidParcial} no coincide con ninguna máquina`);
                return maquinasUuid;
            }
            catch (error) {
                return { error: error.message };
            }
        });
    }
};
Maquinas = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(container_types_1.default.IMaquinasDAO)),
    __metadata("design:paramtypes", [Object])
], Maquinas);
exports.default = Maquinas;
