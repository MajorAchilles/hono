import http from "http";
import httpProxy from "http-proxy";

/**
 * This function is a generic error handler for EADDRINUSE error.
 * It prints the error message and closes the server instance.
 * @param {Object} error
 * @param {http.Server} server
 * @returns {void} This function doesn't return anything.
 */
const errorHandler = (error, server) => {
  if (error.code === "EADDRINUSE") {
    console.log("Server is already running at port", error.port);
  } else {
    console.log(error);
  }
  server.close();
};

/**
 * Starts a new HTTP proxy server
 * @returns {http.Server} The http server that was started
 */
const start = (portMap) => {
  const proxy = httpProxy.createProxyServer({});

  proxy.on("error", (error, _arg1, _arg2, target) => {
    if (error.code === "EHOSTUNREACH") {
      console.error(`Couldn't connect to: ${target.format()}`);
    }
  });

  const virtualHost = http.createServer((req, res) => {
    proxy.web(req, res, { target: portMap[req.headers.host] });
  });

  virtualHost.on("error", (error) => {
    errorHandler(error, virtualHost);
    process.exit(1);
  });

  virtualHost.listen(80);

  return virtualHost;
};

/**
 * Stops the given proxy server
 * @param {http.Server} server The server to stop
 * @param {Function} onClose The callback executed when the server is closed.
 * @returns {void} This function doesn't return anything
 */
const stop = (server, onClose) => {
  server.close(onClose);
};

const proxyServer = {
  start,
  stop
};

export default proxyServer;
