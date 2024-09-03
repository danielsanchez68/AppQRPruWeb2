import 'reflect-metadata';
import { container } from "./container";
import TYPES from "./container.types";
import { IServer } from "./IServer";

import config from './config';
import CnxMongoDB from './DAO/DBMongo';

process.on('uncaughtException', function (err) {
    console.log('EXCEPCIÓN:', err.message, err);
});

if(config.MODO_PERSISTENCIA == 'MONGODB') {
    ;(async () => {
        await CnxMongoDB.conectar()
        startcontainer()
    })()
}
else startcontainer()

function startcontainer() {
    container.get<IServer>(TYPES.IServer).start();
}

