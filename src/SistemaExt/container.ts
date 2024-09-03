import { Container } from 'inversify';
import TYPES from './container.types';

// Adapters
import Server from './server';

import Maquinas from './Servicio/Adaptadores/Maquinas';
import UltimosMovimientos from './Servicio/Adaptadores/UltimosMovimientos';

import MaquinasDAO_FS from './DAO/Adaptadores/MaquinasDAO_FS';
import UltimosMovimientosDAO_FS from './DAO/Adaptadores/UltimosMovimientosDAO_FS';

//interfaces
import { IServer } from './IServer';

import { IMaquinas } from './Servicio/Puertos/IMaquinas';
import { IUltimosMovimientos } from './Servicio/Puertos/IUltimosMovimientos';

import { IMaquinasDAO } from './DAO/Puertos/IMaquinasDAO';
import { IUltimosMovimientosDAO } from './DAO/Puertos/IUltimosMovimientosDAO';
import MaquinasDAO_MongoDB from './DAO/Adaptadores/MaquinasDAO_MongoDB';
import UltimosMovimientosDAO_MongoDB from './DAO/Adaptadores/UltimosMovimientosDAO_MongoDB';
import config from './config';


export const container = new Container();

//services
container.bind<IMaquinas>(TYPES.IMaquinas).to(Maquinas);
container.bind<IUltimosMovimientos>(TYPES.IUltimosMovimientos).to(UltimosMovimientos);

//DAOs
if(config.MODO_PERSISTENCIA == 'MONGODB') {
    container.bind<IMaquinasDAO>(TYPES.IMaquinasDAO).to(MaquinasDAO_MongoDB);
    container.bind<IUltimosMovimientosDAO>(TYPES.IUltimosMovimientosDAO).to(UltimosMovimientosDAO_MongoDB);
}
else {
    container.bind<IMaquinasDAO>(TYPES.IMaquinasDAO).to(MaquinasDAO_FS);
    container.bind<IUltimosMovimientosDAO>(TYPES.IUltimosMovimientosDAO).to(UltimosMovimientosDAO_FS);
}

//server
container.bind<IServer>(TYPES.IServer).to(Server);
