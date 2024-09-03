import { inject, injectable } from "inversify";
import { IMaquinas } from "../Puertos/IMaquinas";
import { IMaquinasDAO } from "../../DAO/Puertos/IMaquinasDAO";
import TYPES from "../../container.types";

@injectable()
class Maquinas  implements IMaquinas{
    constructor(
        @inject(TYPES.IMaquinasDAO) private maquinasDao:IMaquinasDAO
    ) {}

    public async obtenerPorCodigo(codigo) {
        try {
            const maquinas = await this.maquinasDao.obtener()
            const maquina = maquinas.find(maquina => maquina.codigo === codigo);
            if (!maquina) throw new Error(`código ${codigo} no relacionado a ninguna máquina`)
            return maquina;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    public async relacionarCodigo(codigo, uuid) {
        try {
            //console.log(codigo, uuid)
            //await this.maquinasDao.guardar(maquinas)
            await this.maquinasDao.actualizar(codigo, uuid)
            const maquinasActualizada = await this.maquinasDao.obtener()
            return maquinasActualizada
            //}
            //else throw new Error(`máquina ${uuid} ya relacionada con el código ${maquina.codigo}`)
        } catch (error: any) {
            return { error: error.message };
        }
    }

    public async filtrarPorUuid(uuidParcial) {
        try {
            const maquinas = await this.maquinasDao.obtener()
            //console.log(maquinas)
            const maquinasUuid = uuidParcial ? maquinas.filter(maq => maq.uuid.includes(uuidParcial)) : []
            if (!maquinasUuid) throw new Error(`uuid parcial ${uuidParcial} no coincide con ninguna máquina`)
            return maquinasUuid;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}

export default Maquinas