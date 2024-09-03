import { Request, Response } from "express"

export interface IControladorUsuario {
    ip: (req:Request, res:Response) => Promise<void>
}
