import { EVENTS } from "../ipc/events";

const guest = {
  [EVENTS.SERVER.SERVER_LIST] : () => {
    return {
      handler: () => {
        console.log("List Servers");
      },
      onSuccess: (emit) => {
        emit("Servers listed.");
      },
      onFail: (emit) => {
        emit("Failed to list servers.");
      }
    }
  },
  [EVENTS.SERVER.SERVER_ADD] : ({ data }) => {
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
  [EVENTS.SERVER.SERVER_REMOVE] : ({ data }) => {
    return {
      handler: () => {
        console.log("Remove Server with id:", data);
        throw "ERRORING";
      },
      onSuccess: (emit) => {
        emit("Server removed");
      },
      onFail: (emit) => {
        emit("Failed to remove servers.");
      }
    }
  },
  [EVENTS.SERVER.SERVER_START] : ({ data }) => {
    return {
      handler: () => {
        console.log("Remove Server with id:", data);
      },
      onSuccess: (emit) => {
        emit("Server removed");
      },
      onFail: (emit) => {
        emit("Failed to remove servers.");
      }
    }
  },
  [EVENTS.SERVER.SERVER_KILL] : ({ data }) => {
    return {
      handler: () => {
        console.log("Killed Server", data);
      },
      onSuccess: (emit) => {
        emit("Server killed.");
      },
      onFail: (emit) => {
        emit("Failed to kill server.");
      }
    }
  },
  [EVENTS.SERVER.SERVER_RESTART] : ({ ipc, data, sendMessage }) => {
    return {
      handler: () => {
        sendMessage(`Remove Server with id: ${data}`);
      },
      onSuccess: (emit) => {
        emit("Server removed");
      },
      onFail: (emit) => {
        emit("Failed to remove servers.");
      }
    }
  }
};

export {
  guest
};
