import { Request, Response } from "express"

export interface IControladorMaq {
    enviarConsultaMaquina: (req:Request, res:Response) => Promise<void>
}
