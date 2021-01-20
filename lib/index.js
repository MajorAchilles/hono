import boxen from "boxen";
import chalk from "chalk";
import open from "open";
import { hono, server } from "./cli";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
const { version: VERSION } = require("../package.json");

const checkOptions = (argv, optionKeys) => {
  const total = optionKeys.reduce((prev, option) => {
    if (argv.hasOwnProperty(option)) {
      return prev + 1;
    }
    return prev;
  }, 0);

  if (total == 0) {
    throw Error("At least one option is required.");
  }

  if (total > 1) {
    throw Error("Only one option can be passed at a time");
  }

  return true;
}

console.log(
  boxen(
    `Hono version ${chalk.red(VERSION)}`,
    {
      padding: 1,
      margin: 1,
      borderStyle: "double",
      float: "center"
    }
  )
);

yargs(hideBin(process.argv))
  .usage('Usage: hono <command> [options]')

  .command(
    ['start'],
    'Start the hono server',
    builder => builder
      .boolean('local')
      .alias('local', ['l'])
      .describe("local", "Whether to start in local only mode"),
      hono.start
  )
  .example('hono start', 'Start hono with UI server')
  .example('hono start --local', 'Start hono in local only mode (No UI Server)')

  .command(
    ['stop'],
    'Stops the hono server',
    hono.stop
  )
  .example('hono stop', 'Stop hono')

  .command(
    ['restart'],
    'Restart the hono server',
    builder => builder
      .boolean('local')
      .alias('local', ['l'])
      .describe("local", "Whether to restart in local only mode"),
    hono.restart
  )
  .example('hono restart', 'Restart hono with UI server')
  .example('hono restart --local', 'Restart hono in local only mode (No UI Server)')

  .command(
    ['server'],
    'Manage servers',
    builder => builder
      .strict()
      .option('list', { alias: 'l', type: 'boolean', describe: "List all servers and their status" })
      .option('start', { alias: 's', type: 'array', describe: "Start server with given id(s)" })
      .option('restart', { alias: 'r', type: 'array', describe: "Restart server with given id(s)" })
      .option('kill', { alias: 'k', type: 'array', describe: "Kill server with given id(s)" })
      .option('delete', { alias: ['d', 'remove'], type: "array", describe: "Delete server with given id(s)"})
      .check(argv => checkOptions(argv, ["list", "start", "restart", "kill", "add", "delete"])),
      server
  )
  .example('hono server --list', 'List all servers and their status')
  .example('hono server --start 123', 'Start server with id 123')
  .example('hono server --start 123 abc', 'Start server with ids 123 and abc')
  .example('hono server --restart 123', 'Restart server with id 123')
  .example('hono server --restart 123 abc', 'Restart server with ids 123 and abc')
  .example('hono server --kill 123', 'Kill server with id 123')
  .example('hono server --kill 123 abc', 'Kill server with ids 123 and abc')
  .example('hono server --remove 123', 'Remove server with id 123. This action is permanent.')
  .example('hono server --remove 123 abc', 'Remove servers with ids 123 and abc. This action is permanent.')

  .command(
    ['add'],
    'Add a server',
    builder => builder
      .strict()
      .demandOption(["dir", "command", "port", "host"])
      .option('name', { alias: 'n', type: 'string', describe: "Name of the server" })
      .option('dir', { alias: 'd', type: 'string', describe: "The command to start the server" })
      .option('command', { alias: 'c', type: 'string', describe: "The command to start the server" })
      .option('port', { alias: 'p', type: 'number', describe: "Port of the server" })
      .option('host', { alias: 's', type: 'string', describe: "Hostname of the server. This is used to recognize and proxy the requests to the appropriate server." })
      .option('manual', { alias: 'm', type: 'boolean', describe: "Whether to start this server manually on start of hono" }),
      server
  )
  .example('hono add --port 12345 --command "yarn start" --dir "/users/me/servers/myserver" --host myserver.mydomain.com', 'Add a server that starts automatically with hono using the command "yarn start", from the directory "/users/me/servers/myserver", using port 12345 and hostname "myserver.mydomain.com"')
  .example('hono add --port 12345 --command "yarn start" --dir "/users/me/servers/myserver" --host myserver.mydomain.com --name "My Awesome Server" --manual', 'Add a server that can be started manually using the command "yarn start", from the directory "/users/me/servers/myserver", using port 12345 and hostname "myserver.mydomain.com". It is recommeneded to use a user recognizable name. In this instance it is "My Awesome Server"')
  
  .command('docs', 'Go to the documentation at https://github.com/MajorAchilles/hono', () => open("https://github.com/MajorAchilles/hono"))
  
  .help('h')
  .alias('h', 'help')
  
  .version(VERSION)
  .alias("v", "version")
  
  .demandCommand(1, 'You need at least one command before moving on')
  .epilogue('For more information, find the documentation at https://github.com/MajorAchilles/hono')
  .argv;