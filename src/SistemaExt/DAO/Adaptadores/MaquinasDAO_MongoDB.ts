import { injectable } from 'inversify';
import { IMaquinasDAO } from '../Puertos/IMaquinasDAO';

import mongoose from "mongoose";
import CnxMongoDB from '../DBMongo';


@injectable()
class MaquinasDAO_MongoDB implements IMaquinasDAO {
    private MaquinasModel = mongoose.model('maquinas', new mongoose.Schema({
        codigo: String,
		uuid: String,
		NombreFabricante: String,
		NombreJuego: String
    }, { versionKey: false }))

    public async obtener() {
        try {
            if (!CnxMongoDB.connectionOK) throw new Error('[ERROR] DAO sin conexión a MongoDB')
            const maquinas = await this.MaquinasModel.find({}).lean()
            return maquinas
        } catch (error: any) {
            console.error('Error DAO Maquinas obtener(): ', error.message);
            return [];
        }
    }

    public async actualizar(codigo, uuid:any) {
        try {
            if(!CnxMongoDB.connectionOK)  throw new Error('[ERROR] DAO sin conexión a MongoDB')

                const productoActualizado = await this.MaquinasModel.updateOne(
                    {uuid: uuid }, 
                    { $set: {codigo} }
                )
                return productoActualizado
        } catch (error: any) {
            console.error('Error DAO Maquinas guardar(): ', error.message);
            return [];
        }
    }
}

export default MaquinasDAO_MongoDB