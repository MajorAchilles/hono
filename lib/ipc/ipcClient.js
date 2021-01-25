import ipc from "node-ipc";
import chalk from "chalk";
import { EVENTS } from "./events";

ipc.config.silent = true;

const handleSuccess = (data) => {
  console.log(chalk.greenBright("Success:\t"), data);
  ipc.disconnect("hono");
};

const handleMessage = (data) => {
  console.log(chalk.blueBright("Message:\t"), data);
};

/**
 *
 * @param {*} param0
 * @param {*} _socket
 */
const handleFail = ({ message, error }) => {
  console.log(chalk.redBright("Failure:\t"), message);

  if (error) {
    if (typeof error === "string") {
      console.log(chalk.redBright("Error details:\t"), error);
    } else {
      console.log(chalk.redBright("Error details:"));
      console.log(error);
    }
  }

  ipc.disconnect("hono");
};

const sendCommand = (command, params) => {
  if (command === EVENTS.HONO.START) {
    ipc.config.stopRetrying = false;
  } else {
    ipc.config.stopRetrying = 3;
  }

  ipc.connectTo(
    "hono",
    () => {
      ipc.of.hono.on(EVENTS.IPC.CONNECT, () => ipc.of.hono.emit(command, params));
      ipc.of.hono.on(EVENTS.STATUS.SUCCESS, handleSuccess);
      ipc.of.hono.on(EVENTS.STATUS.FAIL, handleFail);
      ipc.of.hono.on(EVENTS.IPC.MESSAGE, handleMessage);
    }
  );
};

export {
  sendCommand
};
