import proxyServer from "../core/proxyServer";
import { serverHandlers } from "../ipc/serverHandlers";
import startIPCServer from "../ipc/ipcServer";

const start = ({ local }) => {
  if (local) {
    console.log("Starting in local only mode.");
  } else {
    console.log("Starting with UI server.");
  }

  const virtualServer = proxyServer.start();
  startIPCServer(virtualServer, serverHandlers);
};

export default start;
