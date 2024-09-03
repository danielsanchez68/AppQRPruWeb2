import { inject, injectable } from 'inversify';
import { IUltimosMovimientos } from '../Puertos/IUltimosMovimientos';
import TYPES from '../../container.types';
import { IUltimosMovimientosDAO } from '../../DAO/Puertos/IUltimosMovimientosDAO';


@injectable()
class UltimosMovimientos implements IUltimosMovimientos {
    constructor(
        @inject(TYPES.IUltimosMovimientosDAO) private ultimosMovimientosDao:IUltimosMovimientosDAO
    ) {}

    public async obtener() {
        return await this.ultimosMovimientosDao.obtener()
    }

    public async obtenerPorUuid(uuid) {
        try {
            const ultimosMovimientos = await this.ultimosMovimientosDao.obtener()
            //console.log(maquinas)
            const movimiento = ultimosMovimientos.find(movimiento => movimiento.uuid === uuid);
            if (!movimiento) throw new Error(`uuid ${uuid} no relacionado a ningún movimiento`)
            return movimiento;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    public async agregar(movimiento) {
        try {
            await this.ultimosMovimientosDao.guardar(movimiento)
        } catch (error: any) {
            return { error: error.message };
        }
    }
}

export default UltimosMovimientos