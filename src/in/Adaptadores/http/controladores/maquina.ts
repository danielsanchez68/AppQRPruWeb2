import { inject, injectable } from "inversify"
import TYPES from "../../../../container.types"
import { IServicioMaquina } from "../../../../servicio/IServicioMaquina"
import { IControladorMaq } from "./IMaquina"
import { Request, Response } from "express"

@injectable()
export class ControladorMaq implements IControladorMaq {
    constructor(@inject(TYPES.IServicioMaquina)private servicio:IServicioMaquina) {}
    
    enviarConsultaMaquina = async (req:Request, res:Response) => {
        try {
            const datosEntrada = req.body
            //console.log(datosEntrada)
            const headers = req.headers
            //console.log(headers)

            if(!Object.keys(datosEntrada).length) throw new Error('ERROR: datosEntrada vacío')
            const datosMaquina = await this.servicio.enviarConsultaMaquina(headers, datosEntrada)

            res.json(datosMaquina)
        }
        catch(error:any) {
            res.status(500).json({errMsg: error.message})
        }
    }
}