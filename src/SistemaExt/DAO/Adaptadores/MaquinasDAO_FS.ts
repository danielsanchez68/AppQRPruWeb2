import fs from 'fs';
import { injectable } from 'inversify';
import { IMaquinasDAO } from '../Puertos/IMaquinasDAO';


@injectable()
class MaquinasDAO_FS implements IMaquinasDAO {
    // Ruta del archivo DB.Json
    private dbFilePath = './DB/maquinas.json';

    public async obtener() {
        try {
            const data = (await fs.promises.readFile(this.dbFilePath)).toString();
            const maquinas = JSON.parse(data);
            return maquinas
        } catch (error: any) {
            console.error('Error DAO Maquinas obtener(): ', error.message);
            return [];
        }
    }

    public async actualizar(codigo, uuid) {
        try {
            const maquinas = await this.obtener()
            const maquina = maquinas.find(maquina => maquina.uuid === uuid);
            //if(!maquina.codigo) {
            maquina.codigo = codigo
            await fs.promises.writeFile(this.dbFilePath, JSON.stringify(maquinas, null, '\t'))
        } catch (error: any) {
            console.error('Error DAO Maquinas guardar(): ', error.message);
            return [];
        }
    }
}

export default MaquinasDAO_FS