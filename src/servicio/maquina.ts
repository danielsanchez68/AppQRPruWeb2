import { inject, injectable } from 'inversify'
import { IServicioMaquina } from './IServicioMaquina'

//import validar from './validaciones/producto'

import TYPES from '../container.types'
import { ISistemaExt } from '../out/Puertos/ISistemaExt'


@injectable()
class ServicioMaq implements IServicioMaquina {
    constructor(
        @inject(TYPES.ISistemaExt) private sistemaExt:ISistemaExt
    ) {}

    enviarConsultaMaquina = async (datosEntrada:string) => {
        const datosMaquina:Object = await this.sistemaExt.consultaTerminal(datosEntrada)
        return datosMaquina
    }
}

export default ServicioMaq