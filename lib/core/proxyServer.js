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

server12000.listen(12000);
server13000.listen(13000);


/**
 * Starts a new proxy server
 * @returns {http.Server} The http server that was started
 */
const startServer = () => {
  const proxy = httpProxy.createProxyServer({});

  const virtualHost = http.createServer((req, res) => {
    const map = ({
      "localhost:5050": 'http://localhost:13000',
      "127.0.0.1:5050": 'http://localhost:12000',
    });
    proxy.web(req, res, { target: map[req.headers.host] });
  });

  virtualHost.listen(5050);
  return virtualHost;
};

/**
 * Stops the given proxy server
 * @param {http.Server} server The server to stop
 * @param {Function} onClose The callback executed when the server is closed. 
 * @returns {undefined} This function doesn't return anything
 */
const stopServer = (server, onClose) => {
  server.close(onClose);
}

const proxyServer = {
  start: startServer,
  stop: stopServer
};

export default proxyServer;
