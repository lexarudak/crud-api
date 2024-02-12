import Server from "./src/server"
import ProxyServer from "./src/proxy"
import { store } from "./src/store/store"
import os from 'os';
import cluster from 'cluster';
import { isMulti } from "./src/utils/helpers";
import { config } from 'dotenv'

config()

const port = process.env.PORT || "4000";
const server = new Server(store)
const proxy = new ProxyServer(store, port)

if (isMulti()) {
  if (cluster.isPrimary) {
    os.cpus().forEach((_, ind) => {
      ind ? cluster.fork({ PORT: Number(port) + ind }) : proxy.start()
    });

    cluster.on('exit', (worker) => {
      cluster.fork({ PORT: Number(port) + worker.id - 1 });
    });
  } else {
    server.start(port)
  }
} else {
  server.start(port)
}




