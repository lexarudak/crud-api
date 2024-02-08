import { createServer, Server as S } from 'http'
import { errors, getMessage } from './utils/messages'
import { splitUrl } from "./utils/helpers"
import requestHandler from './handlers/requestHandler'
import errorHandler from './handlers/errorHandler'
import { config } from 'dotenv'
import { Store } from './store/store'

const DEFAULT_PORT = '4000'

// const server2 = {
//     port: process.env.PORT || DEFAULT_PORT,
//     server: createServer((req, res) => {
//       const { url, method } = req
//       const { uuid, isUrlValid } = splitUrl(url);

//       (method && method in requestHandler && isUrlValid) ?
//         requestHandler[method](res, uuid, req) : errorHandler(res, 404, errors.noResource)
//     }),

//   async start() {
//     this.server.listen(this.port)
//     const { listenPort, listenDefaultPort } = getMessage(this.port)

//     console.log(process.env.PORT ? listenPort : listenDefaultPort);
//   }
// } 

class Server {
  port: string
  store: Store
  server: S
  constructor (store: Store) {
    config()
    this.port = process.env.PORT || DEFAULT_PORT
    this.store = store
    this.server = createServer((req, res) => {
      const { url, method } = req
      const { uuid, isUrlValid } = splitUrl(url);

      (method && method in requestHandler && isUrlValid) ?
        requestHandler[method](res, uuid, req, this.store) : errorHandler(res, 404, errors.noResource)
    })
  }

  start() {
    this.server.listen(this.port)
    const { listenPort, listenDefaultPort } = getMessage(this.port)

    console.log(process.env.PORT ? listenPort : listenDefaultPort);
  }
}

export default Server