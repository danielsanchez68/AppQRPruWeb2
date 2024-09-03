import { injectable } from "inversify"
import { Request, Response } from "express"
import { IControladorUsuario } from "./IUsuario"


@injectable()
export class ControladorUsuario implements IControladorUsuario {
    constructor() {}
    
    ip = async (req:Request, res:Response) => {
        try {
            const {ip} = req
            res.json({ip})
        }
        catch(error:any) {
            res.status(500).json({errMsg: error.message})
        }
    }    
}