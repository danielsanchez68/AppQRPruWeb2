import net from 'net';
import { ISistemaExt } from '../Puertos/ISistemaExt';
import { injectable } from 'inversify';

import config from '../../config'


class NetPromise {
    client: any
    imei: any

    constructor(imei:any) {
        this.client = new net.Socket();
        this.imei = imei

        this.client.on('close', () => {
            console.log(`net Connection closed - IMEI[${this.imei}]`);
        });

        this.client.on('error', (err: any) => {
            console.error('Connection error:', err);
        });
    }

    conectar() {
        return new Promise<void>((resolve, reject) => {
            const host: any = config.HOST_EXT
            const port: any = config.PORT_EXT;

            console.log(`\nConectando ${host}:${port} - IMEI[${this.imei}]`);
            this.client.connect(port, host, () => {
                try {
                    resolve()
                }
                catch (error: any) {
                    console.log('Error client.connect', error.message);
                    this.client = null
                    reject('Error cnx TCP')
                }
            });
        })
    }

    send(datos: any = {}) {
        return new Promise<Object>(resolve => {
            // adaptador de datos TX
            const datosTx = { ...datos }
            delete datosTx.FyH
            delete datosTx.Timestamp
            const cmd = datosTx.Comando
            if(cmd == 'Login') {
                if (datosTx.EMEI) datosTx.IMEI = datosTx.EMEI
            }
            else {
                if (datosTx.EMEI) datosTx.IdSesion = datosTx.EMEI
            }
            delete datosTx.EMEI

            if(cmd == 'Login') {
                datosTx.imei = this.imei
            }
            else {
                datosTx.IdSesion = this.imei
            }

            console.log(`[${Date.now()} ${new Date().toLocaleString()}] ext> ${JSON.stringify(datosTx)}`)
            let buffer = ''

            const handlerRx = (data: any) => {
                const datos = data.toString()

                buffer += datos
                try {
                    const datosRx = JSON.parse(buffer)
                    buffer = ''
                    this.client.removeListener('data', handlerRx);
                    console.log(`[${Date.now()} ${new Date().toLocaleString()}] ext< ${JSON.stringify(datosRx)}`)
                    this.close()
                    resolve(datosRx)
                }
                catch {}
            }
            this.client.addListener('data', handlerRx);

            this.client.write(JSON.stringify(datosTx))
        })
    }

    close() {
        this.client.destroy()
    }
}


@injectable()
class SistemaExt implements ISistemaExt {
    constructor() {
        const host: any = config.HOST_EXT
        const port: any = config.PORT_EXT;
        console.log(`External System TCP set in ${host}:${port}`);
    }

    async consultaTerminal(headers: any, datos: any) {
        const { imei } = headers

        const socketTCP = new NetPromise(imei)
        await socketTCP.conectar()
        return await socketTCP.send(datos)
    }

}

export default SistemaExt