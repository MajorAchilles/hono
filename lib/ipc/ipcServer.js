// import ipc from "node-ipc";
var ipc = require("node-ipc");
const { EVENTS } = require("./commands");

let _virtualHost;

const startIPCServer = (virtualHost, handlers) => {
  _virtualHost = virtualHost;

  ipc.config.id  = 'hono';
  ipc.config.silent  = true;

  ipc.serve(
    () => {
      Object
        .keys(handlers)
        .forEach(eventName => {
          ipc.server.on(eventName, (data, socket) => {
            console.log(eventName, data);
            const {
              handler,
              onSuccess,
              onFail
            } = handlers[eventName]({data, ipc, vHost: _virtualHost});

            try {
              handler();
            } catch (error) {
              if (onFail) {
                onFail((message) => {
                  ipc.server.emit(socket, EVENTS.FAIL, { message, error });
                });
              } else {
                ipc.server.emit(socket, EVENTS.FAIL, { message: "Failed", error });
              }
              return;
            }

            onSuccess((message) => {
              ipc.server.emit(socket, EVENTS.SUCCESS, message);
            })
          })
        });
    }
  );

  ipc.server.start();
}

const stopIPCServer = () => {
  ipc.disconnect();
  ipc.server.stop();
}

export {
  startIPCServer,
  stopIPCServer
};