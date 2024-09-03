import fs from 'fs';
import { IUltimosMovimientosDAO } from '../Puertos/IUltimosMovimientosDAO';
import { injectable } from 'inversify';


@injectable()
class UltimosMovimientosDAO_FS implements IUltimosMovimientosDAO {
    // Ruta del archivo DB.Json
    private dbFilePath = './DB/UM.json';

    public async obtener() {
        try {
            const data = (await fs.promises.readFile(this.dbFilePath)).toString();
            const ultimosMovimientos = JSON.parse(data);
            return ultimosMovimientos
        } catch (error: any) {
            console.error('Error DAO ultimosMovimientos this.obtener(): ', error.message);
            return [];
        }
    }

    public async guardar(movimiento) {
        try {
            const ultimosMovimientos = await this.obtener()
            ultimosMovimientos.push(movimiento)
            await fs.promises.writeFile(this.dbFilePath, JSON.stringify(ultimosMovimientos, null, '\t'))
        } catch (error: any) {
            console.error('Error DAO ultimosMovimientos this.this.guardar(): ', error.message);
            return [];
        }
    }
}

export default UltimosMovimientosDAO_FS