export interface IUltimosMovimientosDAO {
    obtener():Promise<any>
    guardar(movimientos):Promise<any>
}
