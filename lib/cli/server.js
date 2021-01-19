import proxyServer from "../core/proxyServer";

// const server = ({ list, start, restart, kill, add, delete }) => {
const server = ({
  list, start, restart, kill, remove, name, port, command, manual, host, dir
}) => {
  console.log({
    list, start, restart, kill, remove, name, port, command, manual, host, dir
  })

  if (kill) {
    proxyServer.stop();
  }
};

export default server;
