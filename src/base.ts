import { Config } from "types/Config";
import path from "path";
import { validatePath } from "./util/validatePath";

class I18nBase {
  protected config: Config;

  protected data: Record<string, Record<string, Record<string, string>>>;
  protected cache: Record<string, Record<string, Record<string, string>>>;

  constructor(validatePaths?: boolean) {
    this.config = require(path.resolve("i18n.config.js"));

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
  }
}

export default I18nBase;
