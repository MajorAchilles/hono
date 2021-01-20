import { EVENTS } from "../ipc/commands";
import { sendCommand } from "../ipc/ipcClient";

const server = ({
  list, start, restart, kill, remove, name, port, command, manual, host, dir
}) => {
  console.log({
    list, start, restart, kill, remove, name, port, command, manual, host, dir
  })

  if (list) {
    sendCommand(EVENTS.SERVER_LIST);
    return;
  }

  
  if (start) {
    sendCommand(EVENTS.SERVER_KILL, start);
    return;
  }

  if (restart) {
    sendCommand(EVENTS.SERVER_RESTART, restart);
    return;
  }

  if (kill) {
    sendCommand(EVENTS.SERVER_KILL, kill);
    return;
  }

  if (remove) {
    sendCommand(EVENTS.SERVER_REMOVE, remove)
    return;
  }

  if (dir && command && port && host) {
    sendCommand(
      EVENTS.SERVER_ADD,
      {
        dir,
        command,
        port,
        host,
        name,
        manual
      }
    );
  }
};

export default server;

