import { Config } from "types/Config";
import path from "path";
import logger from "./util/logger";

class I18nBase {
  protected config: Config;

  protected data: Record<string, Record<string, Record<string, string>>>;
  protected cache: Record<string, Record<string, Record<string, string>>>;

  constructor(pre?: (config: Config) => void) {
    logger.info("Loading config...");
    try {
      this.config = require(path.join(process.cwd(), "i18n.config.js"));
    } catch (e) {
      logger.error(
        "Failed to load config (i18n.config.js). Please run `i18n init` to create a config file."
      );

      throw e;
    }

    this.config.cache_path ??= path.resolve("cache/i18n.json");
    this.config.output_path ??= path.resolve(
      `src/i18n/${path.basename(this.config.input_path)}.json`
    );

    if (!this.config.cache_path.endsWith(".json"))
      throw new Error("cache_path must be a json file");
    if (!this.config.output_path.endsWith(".json"))
      throw new Error("output_path must be a json file");

    this.config.output_path = path.join(this.config.output_path);
    this.config.cache_path = path.join(this.config.cache_path);
    this.config.input_path = path.join(this.config.input_path);

    if (pre) pre(this.config);

    this.cache = require(this.config.cache_path);
    this.data = require(this.config.output_path);

    this.cache[this.config.strategy.id] ??= {};

    logger.info(`Strategy: ${this.config.strategy.id}`);
    logger.info(`Locales: ${this.config.locales.join(", ")}`);
    logger.info(`Default locale: ${this.config.defaultLocale}`);
    logger.info(`Paths:`);
    logger.info(`  - Files: ${this.config.input_path}`);
    logger.info(`  - Data: ${this.config.output_path}`);
    logger.info(`  - Cache: ${this.config.cache_path}`);
    logger.info("Config loaded");
    console.log();
  }
}

export default I18nBase;
