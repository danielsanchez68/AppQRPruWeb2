import { Container } from 'inversify';
import TYPES from './container.types';

// Adapters
import Server from './server';
import UI_HTTP from './in/Adaptadores/http/UI';

import { ControladorMaq } from './in/Adaptadores/http/controladores/maquina';

import ServicioMaq from './servicio/maquina';

import SistemaExt from './out/Adaptadores/sistemaExt';

//interfaces
import { IServer } from './IServer';

import { IUI } from './in/Puertos/IUI';

import { IControladorMaq } from './in/Adaptadores/http/controladores/IMaquina';

import { IServicioMaquina } from './servicio/IServicioMaquina';

import { ISistemaExt } from './out/Puertos/ISistemaExt';
import { IControladorUsuario } from './in/Adaptadores/http/controladores/IUsuario';
import { ControladorUsuario } from './in/Adaptadores/http/controladores/usuario';



export const container = new Container();

//ui
container.bind<IUI>(TYPES.IUI).to(UI_HTTP);

//controllers ui
container.bind<IControladorMaq>(TYPES.IControladorMaq).to(ControladorMaq);
container.bind<IControladorUsuario>(TYPES.IControladorUsuario).to(ControladorUsuario);

//services
container.bind<IServicioMaquina>(TYPES.IServicioMaquina).to(ServicioMaq);

//servicio TCP
container.bind<ISistemaExt>(TYPES.ISistemaExt).to(SistemaExt).inSingletonScope();

//server
container.bind<IServer>(TYPES.IServer).to(Server);
