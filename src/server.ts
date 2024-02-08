import { createServer } from 'http'
import { errors, getMessage } from './utils/messages'
import { splitUrl } from "./utils/helpers"
import requestHandler from './handlers/requestHandler'
import errorHandler from './handlers/errorHandler'

const DEFAULT_PORT = '4000'


const  server = {
    port: process.env.PORT || DEFAULT_PORT,
    server: createServer((req, res) => {
      const { url, method } = req
      const { uuid, isUrlValid } = splitUrl(url);

      (method && method in requestHandler && isUrlValid) ?
        requestHandler[method](res, uuid, req) : errorHandler(res, 404, errors.noResource)
    }),

  async start() {
    this.server.listen(this.port)
    console.log(getMessage(this.port).listenPort);
  }
} 

export default server