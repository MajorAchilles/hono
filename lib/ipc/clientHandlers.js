import { EVENTS } from "./commands";

const serverHandlers = {
  [EVENTS.SERVER_LIST] : () => {
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
  [EVENTS.SERVER_ADD] : ({ data }) => {
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
  [EVENTS.SERVER_REMOVE] : ({ data }) => {
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
  [EVENTS.SERVER_START] : ({ data }) => {
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
  [EVENTS.SERVER_KILL] : ({ data }) => {
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
  [EVENTS.SERVER_RESTART] : ({ data }) => {
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
  }
};

export {
  serverHandlers
};
