import 'reflect-metadata';
import { container } from "./container";
import TYPES from "./container.types";
import { IServer } from "./IServer";

process.on('uncaughtException', function (err) {
    console.log('EXCEPCIÓN:', err.message, err);
});

container.get<IServer>(TYPES.IServer).start();

