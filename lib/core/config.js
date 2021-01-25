import fs from "fs";

const readConfig = () => JSON.parse(fs.readFileSync("./config/guests.json", "utf8"));

const writeConfig = (config) => fs.writeFileSync(
  "./config/guests.json",
  JSON.stringify(config, null, 2),
  { encoding: "utf8" }
);

export {
  readConfig,
  writeConfig
};
