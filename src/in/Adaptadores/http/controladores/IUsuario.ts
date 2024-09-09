import { Request, Response } from "express"

export interface IControladorUsuario {
    headers: (req:Request, res:Response) => Promise<void>
}
