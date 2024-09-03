import { injectable } from 'inversify';
import { IUltimosMovimientosDAO } from '../Puertos/IUltimosMovimientosDAO';

import mongoose from "mongoose";
import CnxMongoDB from '../DBMongo';


@injectable()
class UltimosMovimientosDAO_MongoDB implements IUltimosMovimientosDAO {
    private MovimientosModel = mongoose.model('movimientos', new mongoose.Schema({
        Fabricante: String,
		Juego: String,
		UID: String,
		Importe: Number,
		FechaHora: String
    }, { versionKey: false }))

    public async obtener() {
        try {
            if (!CnxMongoDB.connectionOK) throw new Error('[ERROR] DAO sin conexión a MongoDB')
            const movimientos = await this.MovimientosModel.find({}).lean()
            return movimientos
        } catch (error: any) {
            console.error('Error DAO ultimosMovimientos this.obtener(): ', error.message);
            return [];
        }
    }

    public async guardar(movimiento) {
        try {
            if (!CnxMongoDB.connectionOK) throw new Error('[ERROR] DAO sin conexión a MongoDB')

            const movimientosModel = new this.MovimientosModel(movimiento)
            const movimientoGuardado = await movimientosModel.save()
            return movimientoGuardado
        }
        catch (error: any) {
            console.error('Error DAO ultimosMovimientos this.this.guardar(): ', error.message);
            return [];
        }
    }
}

export default UltimosMovimientosDAO_MongoDB