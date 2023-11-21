#!/usr/bin/env tsx
import { program } from "commander";
import data from "../package.json";

import I18nGenerator from "../src/lib/generator";
import { copyFile } from "fs";
import path from "path";
import logger from "../src/util/logger";
import { textSync } from "figlet";

console.log(textSync("I 1 8 N"));
program.version(data.version).description(data.description);

program
  .command("generate")
  .description("Generate i18n files")
  .action(async () => {
    const i18nGenerator = new I18nGenerator();
    i18nGenerator.generate();
  });

program
  .command("init")
  .description("Initialize i18n files")
  .action(async () => {
    logger.info("Initializing i18n.config.js...");

    try {
      require(path.join(process.cwd(), "./i18n.config.js"));
      logger.error("i18n.config.js already exists");
    } catch (e) {
      copyFile(
        path.join(__dirname, "defaultConfig.js"),
        path.join(process.cwd(), "./i18n.config.js"),
        (e: any) => {
          if (e) logger.error(e);
          else logger.info("Initialized i18n.config.js");
        }
      );
    }
  });

program.command("*", { noHelp: true }).action(() => {
  console.log("No command specified. Showing menu...");
});

program.parse(process.argv);
