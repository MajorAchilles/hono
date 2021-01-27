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
    guestServer.initializeState();

    return !Object
      .keys(honostate.servers)
      .some((id) => honostate.servers[id].port === port);
  },
  /**
   * Gets the list of servers and their status
   * @returns {Array<Object>} An array of servers and their status
   */
  getServerList: () => {
    const honostate = getState();
    guestServer.initializeState();

    return Object.keys(honostate.servers).map((id) => {
      return {
        id,
        name: honostate.servers[id].name,
        port: honostate.servers[id].port,
        host: honostate.servers[id].host,
        status: honostate.servers[id].process ? STATUS.STARTED : STATUS.STOPPED
      };
    });
  }
};

export {
  guestServer,
  STATUS
};
