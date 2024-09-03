export interface IMaquinasDAO {
    obtener():Promise<any>
    actualizar(codigo, uuid):Promise<any>
}