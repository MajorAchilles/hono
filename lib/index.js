// const http = require('http'),
import http from 'http';
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer(function(req, res) {
  console.log("REQUEST CAME IN");
  proxy.web(req, res, { target: 'http://localhost:12000' });
});

const server12000 = http.createServer(function(req, res) {
  console.log("REQUEST CAME FOR 12000");
  res.write("SERVER 12000");
  res.end();
});

const server13000 = http.createServer(function(req, res) {
  console.log("REQUEST CAME FOR 13000");
  res.write("SERVER 13000");
  res.end();
});

server12000.listen(12000);
server13000.listen(13000);

server.listen(5050);
console.log("listening on port 5050")
