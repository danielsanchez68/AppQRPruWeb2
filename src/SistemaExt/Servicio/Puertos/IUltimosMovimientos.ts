export interface IUltimosMovimientos {
    obtener():Promise<any>
    obtenerPorUuid(uuid):Promise<any>
    agregar(movimiento):Promise<any>
}
