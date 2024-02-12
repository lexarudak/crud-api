import { createServer, Server as S, request } from 'http'
import { Store } from './store/store'
import { cpus } from 'os';
import errorHandler from './handlers/errorHandler';
import { errors } from './utils/messages';


class ProxyServer {
  store: Store
  server: S
  activePort: number
  port: number
  lastPort: number
  constructor (store: Store, port: string) {
    this.port = Number(port)
    this.lastPort = this.port + cpus().length - 1
    this.activePort = this.port + 1
    this.store = store
    this.server = createServer((req, res) => {

      const proxy = request({ 
        hostname: 'localhost', 
        port: this.activePort, 
        path: req.url, 
        method: req.method 
      }, (targetRes) => {
        this.activeUp() 
        res.writeHead(targetRes.statusCode || 200, targetRes.headers);
        targetRes.pipe(res);
      });

      req.pipe(proxy);

      proxy.on('error', () => {
        errorHandler(res, 500, errors.proxyServerError)
      });

    })
  }

  activeUp() {
      this.activePort === this.lastPort ? this.activePort = this.port + 1 : this.activePort++;
  }

  start() {
    this.server.listen(this.port)
    console.log("Proxy", this.port);
  }
}

export default ProxyServer