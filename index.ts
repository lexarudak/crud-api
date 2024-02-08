import Server from "./src/server"
import { store } from "./src/store/store"
import os from 'os';
import cluster from 'cluster';
import { isMulti } from "./src/utils/helpers";

const port = process.env.PORT || "4000";
const server = new Server(store)

if (isMulti()) {
  if (cluster.isPrimary) {
    os.cpus().forEach((_, ind) => {
      cluster.fork({ PORT: Number(port) + ind });
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




