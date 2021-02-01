import boxen from "boxen";
import chalk from "chalk";
import { guestServer } from "../core/guestServer";
import proxyServer from "../core/proxyServer";
import { EVENTS } from "../ipc/events";

const { version: VERSION } = require("../../package.json");

const hono = {
  [EVENTS.HONO.START]: () => {
    return {
      handler: () => {
        console.log(
          boxen(
            `Hono version ${chalk.red(VERSION)}`,
            {
              padding: 1,
              margin: 1,
              borderStyle: "double",
              float: "center"
            }
          )
        );

        guestServer.initializeState();
        return proxyServer.start(guestServer.getPortMap());
      },
      onSuccess: (emit) => {
        emit("Server started.");
      },
      onFail: (emit) => {
        emit("Failed to start server.");
      }
    };
  },
  [EVENTS.HONO.STOP]: ({ vHost }) => {
    return {
      handler: () => {
        proxyServer.stop(
          vHost,
          setTimeout(() => {
            process.exit(0);
          }, 500)
        );
      },
      onSuccess: (emit) => {
        emit("Hono stopped!");
      },
      onFail: (emit) => {
        emit("Failed to stop server.");
      }
    };
  }
};

export {
  hono
};
