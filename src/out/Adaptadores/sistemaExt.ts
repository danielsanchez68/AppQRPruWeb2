import net from 'net';
import { ISistemaExt } from '../Puertos/ISistemaExt';
import { injectable } from 'inversify';

import config from '../../config'


class NetPromise {
    client:any

    constructor() {
        this.client = new net.Socket();

        const host:any = config.HOST_EXT
        const port:any = config.PORT_EXT;

        this.client.on('close', () => {
            //console.log('net Connection closed');
        });
        
        this.client.on('error', (err:any) => {
            console.error('Connection error:', err);
        });    
        
        this.client.connect(port, host, () => {
            try {
                //console.log(`Connect net ${host}:${port}`);
            }
            catch(error:any) {
                console.log('Error client.connect', error.message);
                this.client = null
            }
        });
    }    

    send(cmd:any, datos:any = {}) {
        
        // adaptador de datos TX
        const datosTx = {...datos}
        delete datosTx.FyH
        delete datosTx.Timestamp
        if(datosTx.EMEI) datosTx.IMEI = datosTx.EMEI
        delete datosTx.EMEI

        //console.log('>tx:', datosTx)

        return new Promise<Object>(resolve => {
            let buffer = ''
            this.client.write(JSON.stringify(datosTx))
            this.client.on('data', (data:any) => {
                buffer += data.toString()
                try {
                    const datosRx = JSON.parse(buffer)
                    this.client.destroy()

                    //console.log('<rx:', datosRx, '\n')
                    resolve(datosRx)
                }
                catch {}
            });
        })
    }
}


@injectable()
class SistemaExt implements ISistemaExt {

    constructor() {
        const host:any = config.HOST_EXT
        const port:any = config.PORT_EXT;
        console.log(`External System TCP set in ${host}:${port}`);
    }

    consultaTerminal(datos:any) {
        return new NetPromise().send(datos.Comando, datos)
    }    
}

export default SistemaExt