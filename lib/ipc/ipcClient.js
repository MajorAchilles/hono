// import ipc from "node-ipc";
var ipc = require("node-ipc");
const { EVENTS } = require("./commands");

ipc.config.silent = true;

const handleMessage = (data, _socket) => {
  console.log(data);
  ipc.disconnect("hono")
};

const sendCommand = (command, params) => {
  ipc.connectTo(
    'hono',
    _socket => {
      ipc.of.hono.on(EVENTS.CONNECT, () => ipc.of.hono.emit(command, params));
      ipc.of.hono.on(EVENTS.SUCCESS, handleMessage);
      ipc.of.hono.on(EVENTS.FAIL, handleMessage);
    }
  );
}


export {
  sendCommand
};
