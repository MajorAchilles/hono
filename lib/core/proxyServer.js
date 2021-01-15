import http from 'http';
import httpProxy from "http-proxy";
import chalk from 'chalk';
import cliSpinners from "cli-spinners";
import ora from "ora";

const proxyServer = () => {
  const spinner = ora({
    prefixText: "Listening on port 5050",
    spinner: cliSpinners.point,
    color: null
  });

  const proxy = httpProxy.createProxyServer({});

  const server = http.createServer((req, res) => {
    const map = ({
      "localhost:5050": 'http://localhost:13000',
      "127.0.0.1:5050": 'http://localhost:12000',
    });
    proxy.web(req, res, { target: map[req.headers.host] });
  });

  const server12000 = http.createServer((_req, res) => {
    console.log("REQUEST CAME FOR 12000");
    res.write("SERVER 12000");
    res.end();
    spinner.start();
  });

  const server13000 = http.createServer((_req, res) => {
    console.log("REQUEST CAME FOR 13000");
    res.write("SERVER 13000");
    res.end();
    spinner.start();
  });

  server12000.listen(12000);
  server13000.listen(13000);

  server.listen(5050);

  // console.log(chalk.blue(`Listening on port 5050..., ${}`));
  // console.log(cliSpinners.bounce);

  spinner.start();
};

export default proxyServer;
