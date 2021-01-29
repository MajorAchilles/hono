import chalk from "chalk";
import { EVENTS } from "../ipc/events";
import { guestServer, STATUS } from "../core/guestServer";

/**
 * Formats the status with the correct color.
 * @param {String} status The status to be formatted.
 * @returns {String} A color formatted string
 */
const formatStatus = (status) => {
  switch (status) {
    case STATUS.STARTED:
      return chalk.green(status);
    case STATUS.RESTARTING:
      return chalk.yellow(status);
    default:
      return chalk.red(status);
  }
};

const guest = {
  [EVENTS.SERVER.SERVER_LIST]: ({ send }) => {
    let servers;
    return {
      handler: () => {
        servers = guestServer.getServerList();
      },
      onSuccess: (emit) => {
        const tableData = {
          head: ["ID", "Name", "Port", "Host Name", "Status", "PID"],
          data: servers.map((serverInfo) => [
            serverInfo.id,
            serverInfo.name,
            serverInfo.port,
            serverInfo.host,
            formatStatus(serverInfo.status),
            serverInfo.pid
          ])
        };

        send.table(tableData);
        emit(`${servers.length} server${servers.length === 1 ? " " : "(s) "}listed`);
      },
      onFail: (emit) => {
        emit("Failed to list servers.");
      }
    };
  },
  [EVENTS.SERVER.SERVER_ADD]: ({ data }) => {
    return {
      handler: () => {
        console.log("Added server", data.name);
      },
      onSuccess: (emit) => {
        emit("New Server added.");
      },
      onFail: (emit) => {
        emit("Failed to add server.");
      }
    };
  },
  [EVENTS.SERVER.SERVER_REMOVE]: ({ data }) => {
    return {
      handler: () => {
        console.log("Remove Server with id:", data);
        throw Error("Erroring");
      },
      onSuccess: (emit) => {
        emit("Server removed");
      },
      onFail: (emit) => {
        emit("Failed to remove servers.");
      }
    };
  },
  [EVENTS.SERVER.SERVER_START]: ({ data }) => {
    return {
      handler: () => {
        guestServer.startServers(data);
      },
      onSuccess: (emit) => {
        emit(`Server${data.length === 1 ? " " : "(s) "}started`);
      },
      onFail: (emit) => {
        emit("Failed to start servers.");
      }
    };
  },
  [EVENTS.SERVER.SERVER_KILL]: ({ data }) => {
    return {
      handler: () => {
        guestServer.killServers(data);
      },
      onSuccess: (emit) => {
        emit(`Server${data.length === 1 ? " " : "(s) "}killed`);
      },
      onFail: (emit) => {
        emit("Failed to kill servers.");
      }
    };
  },
  [EVENTS.SERVER.SERVER_RESTART]: ({ data, send }) => {
    return {
      handler: () => {
        send.message(`Remove Server with id: ${data}`);
      },
      onSuccess: (emit) => {
        emit("Server removed");
      },
      onFail: (emit) => {
        emit("Failed to remove servers.");
      }
    };
  }
};

export {
  guest
};
