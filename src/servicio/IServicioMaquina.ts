export interface IServicioMaquina {
    enviarConsultaMaquina: (headers:any, codigo:string) => Promise<Object>
}