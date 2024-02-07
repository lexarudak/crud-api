import { config } from 'dotenv'
import server from "./src/server"

config()

server.start()