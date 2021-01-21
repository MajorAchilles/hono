import proxyServer from "../core/proxyServer";
import { serverHandlers } from "../ipc/serverHandlers";
import { startIPCServer, stopIPCServer } from "../ipc/ipcServer";

let virtualServer;

const start = ({ local }) => {
  if (local) {
    console.log("Starting in local only mode.");
  } else {
    console.log("Starting with UI server.");
  }

  virtualServer = proxyServer.start();
  startIPCServer(virtualServer, serverHandlers);
};

const stop = () => {
  proxySxerver.stop(virtualServer);
  stopIPCServer();
};

const restart = ({ local }) => {
  if (local) {
    console.log("Restarting in local only mode...");
  } else {
    console.log("Restarting with UI server...");
  }
};

const hono = {
  start,
  stop,
  restart
};

export default hono;
