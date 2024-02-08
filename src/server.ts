import { createServer, Server as S } from 'http'
import { errors, getMessage } from './utils/messages'
import { isMulti, splitUrl } from "./utils/helpers"
import requestHandler from './handlers/requestHandler'
import errorHandler from './handlers/errorHandler'
import { config } from 'dotenv'
import { Store } from './store/store'
import cluster from 'cluster';

class Server {
  store: Store
  server: S
  constructor (store: Store) {
    config()
    this.store = store
    this.server = createServer((req, res) => {
      if (isMulti()) console.log(`Request handled by worker ${cluster?.worker?.id}`);
      const { url, method } = req
      const { uuid, isUrlValid } = splitUrl(url);

      (method && method in requestHandler && isUrlValid) ?
        requestHandler[method](res, uuid, req, this.store) : errorHandler(res, 404, errors.noResource)
    })
  }

  start(port: string) {
    this.server.listen(port)
    const { listenPort, listenDefaultPort } = getMessage(port)

    console.log(process.env.PORT ? listenPort : listenDefaultPort);
  }
}

export default Server