import net from 'net';
import fs from 'fs';

import delay from './util/delay';

import config from './config'
import { IServer } from './IServer';
import { inject, injectable } from 'inversify';
import TYPES from './container.types';
import { IMaquinas } from './Servicio/Puertos/IMaquinas';
import { IUltimosMovimientos } from './Servicio/Puertos/IUltimosMovimientos';

@injectable()
class Server implements IServer {

    constructor(
        @inject(TYPES.IMaquinas) private maquinas:IMaquinas,
        @inject(TYPES.IUltimosMovimientos) private ultimosMovimientos:IUltimosMovimientos
    ) {}

    start() {
        const options = {
            keepAlive: true
        }
        
        // Crear el servidor TCP
        const server = net.createServer(options, socket => {
            //console.log('Client connected');
        
            // Evento para manejar datos recibidos del cliente
            socket.on('data', async (data:any) => {
                try {
                    const datosRecibidos = JSON.parse(data);
                    //console.log('\n> Datos recibidos', JSON.stringify(datosRecibidos), new Date().toLocaleString());
        
                    let datosEnviados = {}
        
                    const cmd = JSON.parse(await fs.promises.readFile('./Comandos/listado.json','utf-8'))
        
                    //nuevo server TCP
                    const comando = datosRecibidos?.Comando
                    //console.log(comando)
                    if(cmd[comando]?.tx?.Comando) {
                        //console.log(comando)
                        /* if(
                            comando === 'Operacion_SubirDinero' ||
                            comando === 'VinculaTerminal' ||
                            comando === 'ConsultaTerminal' ||
                            comando === 'ListaUID' ||
                            comando === 'UltimosMovimientos'
                        ) */ await delay(200)
        
                        if(comando == 'ConsultaTerminal') {
                            const codigo = datosRecibidos?.QR
                            const maquina = await this.maquinas.obtenerPorCodigo(codigo)
        
                            cmd[comando].rx.Fabricante = maquina.NombreFabricante
                            cmd[comando].rx.Juego = maquina.NombreJuego
                            cmd[comando].rx.UID = maquina.uuid
                        }
                        else if(comando == 'ListaUID') {
                            const uuid = datosRecibidos?.UID
                            const maquinas = await this.maquinas.filtrarPorUuid(uuid)
        
                            cmd[comando].rx.Terminales = maquinas.map( maq => {
                                return {
                                    Vinculada: maq.codigo,
                                    UID: maq.uuid,
                                    Fabricante: maq.NombreFabricante,
                                    Juego: maq.NombreJuego
                                } 
                            })
                        }
                        else if(comando == 'Operacion_SubirDinero') {
                            const codigo = datosRecibidos?.QR
                            const importe = datosRecibidos?.Importe
                            const FyH = new Date().toLocaleString().replace(',','')
                            const maquina = await this.maquinas.obtenerPorCodigo(codigo)
        
                            const movimiento = {
                                Fabricante: maquina.NombreFabricante,
                                Juego: maquina.NombreJuego,
                                UID: maquina.uuid,
                                Importe: importe,
                                FechaHora: FyH
                            }
                            await this.ultimosMovimientos.agregar(movimiento)
                        }
                        else if(comando == 'UltimosMovimientos') {
                            cmd[comando].rx.Movimientos = (await this.ultimosMovimientos.obtener()).map(mov => ({
                                ...mov, 
                                ticket: '12345678',
                                impuesto: 69.82,
                                neto: mov.Importe - 69.82
                            }))
                        }
                        else if(comando == 'VinculaTerminal') {
                            const codigo = datosRecibidos?.QR
                            const uuid = datosRecibidos?.UID
                            await this.maquinas.relacionarCodigo(codigo, uuid)
        
                            const maquina = (await this.maquinas.filtrarPorUuid(uuid))[0]
                            cmd[comando].rx.Fabricante = maquina.NombreFabricante
                            cmd[comando].rx.Juego = maquina.NombreJuego
                            cmd[comando].rx.UID = uuid
                        }
                        datosEnviados = cmd[comando]?.rx
                    }
                    //console.log('< Datos enviados', JSON.stringify(datosEnviados), new Date().toLocaleString());
        
                    // Enviar datos de vuelta al cliente
                    socket.write(JSON.stringify(datosEnviados));
                } catch (error:any) {
                    console.log('ERROR:', error.message);
                }
            });
        
            // Evento cuando se cierra la conexi�n del cliente
            socket.on('close', () => {
                //console.log('Client disconnected');
            });
        
            // Manejar errores de conexi�n
            socket.on('error', (err) => {
                console.error('Connection error:', err);
            });
        });
        
        const PORT = config.PORT_EXT;
        server.listen(PORT, () => {
            console.log(`Servicio TCP AppQR escuchando en el puerto ${PORT} (persistencia en ${config.MODO_PERSISTENCIA})`);
        });    
    }
}

export default Server
