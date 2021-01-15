import proxyServer from "../core/proxyServer";

const start = ({ local }) => {
  if (local) {
    console.log("Starting in local only mode.");
    proxyServer();
  } else {
    console.log("Starting with UI server.");
    proxyServer();
  }
};

export default start;
