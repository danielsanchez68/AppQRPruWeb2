import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080
const HOST_EXT = process.env.HOST_EXT || '127.0.0.1'
const PORT_EXT = process.env.PORT_EXT || 8081

export default {
    PORT,
    PORT_EXT,
    HOST_EXT,
}