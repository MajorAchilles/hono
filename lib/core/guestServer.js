import { exec } from "child_process";
import { SIGKILL } from "constants";
import { readConfig } from "./config";
import { getState } from "./state";

const STATUS = {
  STOPPED: "stopped",
  STARTED: "started",
  RESTARTING: "restarting"
};

const guestServer = {
  /**
   * Initializes the state of guest servers
   */
  initializeState: () => {
    const config = readConfig();
    const servers = {};
    const honostate = getState();

    config.guests.forEach((guest) => {
      servers[guest.id] = {
        processId: 0,
        process: null,
        manual: guest.manual,
        name: guest.name || guest.id,
        host: guest.host,
        port: guest.port,
        dir: guest.dir,
        command: guest.command
      };
    });

    honostate.initialized = true;
    honostate.servers = servers;
  },

  /**
   * Checks if the given port is available
   * @param {Number} port The port number to check.
   * @returns {Boolean} `true` if available, `false` if already in use by some other guest server.
   */
  isPortAvailable: (port) => {
    const honostate = getState();

    return !Object
      .keys(honostate.servers)
      .some((id) => honostate.servers[id].port === port);
  },

  /**
   * Gets the server by ID
   * @param {String} id The ID of the server
   * @returns {Object} An object repreenting the guest server
   */
  getServer: (id) => getState().servers[id],

  /**
   * Gets the list of servers and their status
   * @returns {Array<Object>} An array of servers and their status
   */
  getServerList: () => {
    const honostate = getState();

    return Object.keys(honostate.servers).map((id) => {
      return {
        id,
        name: honostate.servers[id].name,
        port: honostate.servers[id].port,
        host: honostate.servers[id].host,
        status: honostate.servers[id].process ? STATUS.STARTED : STATUS.STOPPED,
        pid: honostate.servers[id].process ? honostate.servers[id].process.pid : "NA"
      };
    });
  },

  /**
   * Start the server with the given id.
   * @param {String} id ID of the server to start.
   * @returns {Boolean} `true` if process started, `false` is failed to start process.
   */
  startServer: (id) => {
    const guest = guestServer.getServer(id);

    if (guest && !guest.process) {
      guest.process = exec(`${guest.command}`, {
        cwd: guest.dir,
        detached: true
      });

      return true;
    }

    return false;
  },

  /**
   * Start the servers with the given id.
   * @param {Array<String>} ids IDs of the servers to start.
   * @returns {Array<Boolean>} Array representing the started state of the servers
   */
  startServers: (ids) => {
    return ids.map(guestServer.startServer);
  },

  /**
   * Kill the server with the given id
   * @param {String} id ID of the server to kill
   * @returns {Boolean} `true` if process killed, `false` is failed to kill process.
   */
  killServer: (id) => {
    const guest = guestServer.getServer(id);

    if (guest && guest.process) {
      exec(`pKill -P ${guest.process.pid}`);
      delete guest.process;
      return true;
    }

    return false;
  },

  /**
   * Kill the servers with the given id.
   * @param {Array<String>} ids IDs of the servers to kill.
   * @returns {Array<Boolean>} Array representing the killed state of the servers
   */
  killServers: (ids) => {
    return ids.map(guestServer.killServer);
  }
};

export {
  guestServer,
  STATUS
};
