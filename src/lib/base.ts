import { Config } from "types/Config";
import path from "path";
import logger from "../util/logger";
import I18nConfig from "types/I18nConfig";

class I18nBase {
  public config: Config;

  public data: Record<
    string,
    Record<string, Record<string, Record<string, string>>>
  >;

  public cache: Record<string, Record<string, Record<string, string>>>;

  public defaultInput: string;
  public outputFilename = "data.json";

  constructor(pre?: (config: Config) => void) {
    logger.info("Loading config...");
    let config: I18nConfig;

    try {
      config = require(path.join(process.cwd(), "i18n.config.js"));
    } catch (e) {
      logger.error(
        "Failed to load config (i18n.config.js). Please run `i18n init` to create a config file."
      );

      throw e;
    }

    if (!config.cache_path.endsWith(".json"))
      throw new Error("cache_path must be a json file");

    config.output_path = path.join(config.output_path);
    config.cache_path = path.join(config.cache_path);

    const inputs: Record<string, string> = {};
    if (Array.isArray(config.inputs))
      config.inputs.forEach(
        (
          input:
            | string
            | {
                id: string;
                dir: string;
              }
        ) => {
          if (typeof input != "object")
            input = { id: path.basename(input), dir: input };

          inputs[input.id] = path.join(input.dir);
        }
      );
    if (pre) pre(config);

    this.defaultInput = Object.keys(inputs)[0];

    this.cache = require(config.cache_path);
    //this.data = require(config.output_path);
    this.data = {};

    this.cache[config.strategy.id] ??= {};

    logger.info(`Strategy: ${config.strategy.id}`);
    logger.info(`Locales: ${config.locales.join(", ")}`);
    logger.info(`Default locale: ${config.defaultLocale}`);
    logger.info(`Paths:`);
    logger.info(`  - Files: ${config.inputs}`);
    logger.info(`  - Data: ${config.output_path}`);
    logger.info(`  - Cache: ${config.cache_path}`);
    logger.info("Config loaded");
    console.log();

    this.config = config;
    if (Object.keys(inputs).length > 0) this.config.inputs = inputs;
  }
}

export default I18nBase;
