export interface IMaquinas {
    obtenerPorCodigo(codigo):Promise<any>
    relacionarCodigo(codigo, uuid):Promise<any>
    filtrarPorUuid(uuidParcial):Promise<any>
}