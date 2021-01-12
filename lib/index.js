import http from 'http';
import httpProxy from "http-proxy";
import boxen from "boxen";
import chalk from 'chalk';

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  console.log("REQUEST CAME IN");
  proxy.web(req, res, { target: 'http://localhost:13000' });
});

const server12000 = http.createServer((_req, res) => {
  console.log("REQUEST CAME FOR 12000");
  res.write("SERVER 12000");
  res.end();
});

const server13000 = http.createServer((_req, res) => {
  console.log("REQUEST CAME FOR 13000");
  res.write("SERVER 13000");
  res.end();
});

server12000.listen(12000);
server13000.listen(13000);

server.listen(5050);

console.log(
  boxen(
    `Hono version ${chalk.red("1.0.0")}`,
    {
      padding: 1,
      margin: 1,
      borderStyle: "double",
      float: "center"
    }
  )
);

console.log(chalk.blue("Listening on port 5050"));
