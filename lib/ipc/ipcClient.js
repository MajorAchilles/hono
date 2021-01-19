// import ipc from "node-ipc";
var ipc = require("node-ipc");
const { EVENTS } = require("./commands");

ipc.config.silent = true;

ipc.connectTo(
  'hono',
  _socket => {
    ipc.of.hono.on(
      EVENTS.CONNECT,
      () => ipc.of.hono.emit(EVENTS.SERVER_REMOVE, "123")
    );

    ipc.of.hono.on(
      EVENTS.SUCCESS,
      () => ipc.disconnect("hono")
    );

    ipc.of.hono.on(
      EVENTS.FAIL,
      (data, _socket) => ipc.disconnect("hono")
    );
  }
);
