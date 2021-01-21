import ipc from "node-ipc";
import chalk from "chalk";
import { EVENTS } from "./events";

ipc.config.silent = true;

const handleSuccess = (data, _socket) => {
  console.log(chalk.greenBright("Success:\t"), data);
  ipc.disconnect("hono");
};

const handleMessage = (data, _socket) => {
  console.log(chalk.blueBright("Message:\t"), data);
};

const handleFail = ({ message, error }, _socket) => {
  console.log(chalk.redBright("Failure:\t"), message);
  if (error) {
    console.log(chalk.redBright("Error data:\t"), error);
  }

  ipc.disconnect("hono");
};

const sendCommand = (command, params) => {
  ipc.connectTo(
    'hono',
    _socket => {
      ipc.of.hono.on(EVENTS.IPC.CONNECT, () => ipc.of.hono.emit(command, params));
      ipc.of.hono.on(EVENTS.STATUS.SUCCESS, handleSuccess);
      ipc.of.hono.on(EVENTS.STATUS.FAIL, handleFail);
      ipc.of.hono.on(EVENTS.IPC.MESSAGE, handleMessage);
    }
  );
}


export {
  sendCommand
};
