import { Config } from "types/Config";
import path from "path";
import { validatePath } from "./util/validatePath";
import logger from "./util/logger";

class I18nBase {
  protected config: Config;

  protected data: Record<string, Record<string, Record<string, string>>>;
  protected cache: Record<string, Record<string, Record<string, string>>>;

  constructor(validatePaths?: boolean) {
    logger.info("Loading config...");
    try {
      this.config = require(path.join(process.cwd(), "i18n.config.js"));
    } catch (e) {
      logger.error(
        "Failed to load config (i18n.config.js). Please run `i18n init` to create a config file."
      );
      process.exit(1);
    }

    this.config.cache_path ??= path.resolve("cache/i18n.json");
    this.config.data_path ??= path.resolve(
      `src/i18n/${path.basename(this.config.files)}.json`
    );

    if (!this.config.cache_path.endsWith(".json"))
      throw new Error("cache_path must be a json file");
    if (!this.config.data_path.endsWith(".json"))
      throw new Error("data_path must be a json file");

    this.config.data_path = path.join(this.config.data_path);
    this.config.cache_path = path.join(this.config.cache_path);
    this.config.files = path.join(this.config.files);

    if (validatePaths) {
      validatePath(this.config.cache_path, JSON.stringify({}));
      validatePath(this.config.data_path, JSON.stringify({}));
    }

    this.cache = require(this.config.cache_path);
    this.data = require(this.config.data_path);

    this.cache[this.config.strategy.id] ??= {};

    logger.info(`Strategy: ${this.config.strategy.id}`);
    logger.info(`Locales: ${this.config.locales.join(", ")}`);
    logger.info(`Default locale: ${this.config.defaultLocale}`);
    logger.info(`Paths:`);
    logger.info(`  - Files: ${this.config.files}`);
    logger.info(`  - Data: ${this.config.data_path}`);
    logger.info(`  - Cache: ${this.config.cache_path}`);
    logger.info("Config loaded");
    console.log();
  }
}

export default I18nBase;
