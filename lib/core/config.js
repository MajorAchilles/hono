import fs from "fs";
import path from "path";

const readConfig = () => {
  return JSON.parse(
    fs.readFileSync(
      path.resolve(
        __dirname,
        "../config/guests.json"
      ),
      "utf8"
    )
  );
};

const writeConfig = (config) => fs.writeFileSync(
  "./config/guests.json",
  JSON.stringify(config, null, 2),
  { encoding: "utf8" }
);

export {
  readConfig,
  writeConfig
};
