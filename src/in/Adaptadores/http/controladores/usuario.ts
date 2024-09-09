import { injectable } from "inversify"
import { Request, Response } from "express"
import { IControladorUsuario } from "./IUsuario"


@injectable()
export class ControladorUsuario implements IControladorUsuario {
    constructor() {}
    
    headers = async (req:Request, res:Response) => {
        try {
            const {headers} = req
            res.json({headers})
        }
        catch(error:any) {
            res.status(500).json({errMsg: error.message})
        }
    }    
}