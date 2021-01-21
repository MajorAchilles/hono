import chalk from "chalk";
import ipc from "node-ipc";
import { EVENTS } from "./events";

let virtualHost = null;

const startIPCServer = (handlers) => {
  ipc.config.id = "hono";
  ipc.config.silent = true;

  ipc.serve(
    () => {
      Object
        .keys(handlers)
        .forEach((eventName) => {
          ipc.server.on(eventName, (data, socket) => {
            console.log(chalk.blueBright("Received command:"), eventName);
            if (data) {
              console.log(chalk.blueBright("Data:"), data);
            }
            console.log("\n");

            const sendMessage = (message) => {
              ipc.server.emit(socket, EVENTS.IPC.MESSAGE, message);
            };

            const {
              handler,
              onSuccess,
              onFail
            } = handlers[eventName](
              {
                data,
                ipc,
                vHost: virtualHost,
                sendMessage
              }
            );

            try {
              if (eventName === EVENTS.HONO.START) {
                virtualHost = handler();
              } else if (virtualHost === null) {
                throw Error("Hono server is not running. Use 'hono start' to start Hono");
              } else {
                handler();
              }
            } catch (error) {
              console.error(chalk.red("Error:\t", error));
              console.error(error.stack || "No further details available");
              console.log("\n");

              const errorStruct = {
                name: error.name || "Error",
                message: error.message || error.toString(),
                stack: error.stack || ""
              };

              if (onFail) {
                onFail((message) => {
                  ipc.server.emit(socket, EVENTS.STATUS.FAIL, { message, error: errorStruct });
                });
              } else {
                ipc.server.emit(socket, EVENTS.STATUS.FAIL, { message: "Failed", error: errorStruct });
              }
            }

            onSuccess((message) => {
              ipc.server.emit(socket, EVENTS.STATUS.SUCCESS, message);
            });

            console.log(chalk.blueBright("Command processed\n\n"));
          });
        });
    }
  );

  ipc.server.start();
};

const stopIPCServer = () => {
  ipc.disconnect();
  ipc.server.stop();
};

export {
  startIPCServer,
  stopIPCServer
};
