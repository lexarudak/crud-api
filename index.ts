import Server from "./src/server"
import { store } from "./src/store/store"

const server = new Server(store)
server.start()