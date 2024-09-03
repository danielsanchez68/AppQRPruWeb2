import dotenv from 'dotenv'

dotenv.config()

const HOST_EXT = process.env.HOST_EXT || '127.0.0.1'
const PORT_EXT = process.env.PORT_EXT || 8081
const STRCNX = process.env.STRCNX || 'mongodb://127.0.0.1'
const BASE = process.env.BASE || 'test'
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'FILE'

export default {
    PORT_EXT,
    HOST_EXT,
    STRCNX,
    BASE,
    MODO_PERSISTENCIA
}