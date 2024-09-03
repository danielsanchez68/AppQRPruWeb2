export interface IServicioMaquina {
    enviarConsultaMaquina: (codigo:string) => Promise<Object>
}