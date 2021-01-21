import http from 'http';
import httpProxy from "http-proxy";

const server12000 = http.createServer((_req, res) => {
  res.write("SERVER 12000");
  res.end();
});

const server13000 = http.createServer((_req, res) => {
  res.write("SERVER 13000");
  res.end();
});

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
}

server12000.on("error", (error) => errorHandler(error, server12000));
server13000.on("error", (error) => errorHandler(error, server13000));

/**
 * Starts a new HTTP proxy server
 * @returns {http.Server} The http server that was started
 */
const start = () => {
  server12000.listen(12000);
  server13000.listen(13000);
  
  const proxy = httpProxy.createProxyServer({});
  const virtualHost = http.createServer((req, res) => {
    const map = ({
      "localhost:5050": 'http://localhost:13000',
      "127.0.0.1:5050": 'http://localhost:12000',
    });
    proxy.web(req, res, { target: map[req.headers.host] });
  });

  virtualHost.on("error", (error) => {
    errorHandler(error, virtualHost);
    process.exit(1);
  });

  virtualHost.listen(5050);

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
}

const proxyServer = {
  start,
  stop
};

export default proxyServer;
