import { EVENTS } from "../ipc/events";
import { sendCommand } from "../ipc/ipcClient";
import { startIPCServer } from "../ipc/ipcServer";
import handlers from "../ipcHandlers";

const start = ({ local }) => {
  startIPCServer(handlers);
  sendCommand(EVENTS.HONO.START, { local });
};

const stop = () => {
  sendCommand(EVENTS.HONO.STOP);
};

const restart = ({ local }) => {
  sendCommand(EVENTS.HONO.RESTART, { local });
};

const hono = {
  start,
  stop,
  restart
};

export default hono;
