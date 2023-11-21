import { readdirSync, statSync, writeFile, writeFileSync } from "fs";

import path from "path";
import { Locale } from "types/Locale";
import I18nBase from "./Base";
import logger from "./util/logger";
import validatePath from "./util/validatePath";

class I18nGenerator extends I18nBase {
  constructor() {
    super((config) => {
      validatePath(config.cache_path, JSON.stringify({}));
      validatePath(config.output_path, JSON.stringify({}));
    });
  }

  private saveCache() {
    writeFile(this.config.cache_path, JSON.stringify(this.cache), (err) => {
      if (err) throw err;
    });
  }

  public async translate(
    text: string,
    { from, to, context }: { from: Locale; to: Locale; context?: string }
  ) {
    const key = `${text}#${context ?? ""}`;

    this.cache[this.config.strategy.id][to] ??= {};
    if (this.cache[this.config.strategy.id][to][key])
      return this.cache[this.config.strategy.id][to][key];

    const res = await this.config.strategy.get(text, { from, to, context });

    this.cache[this.config.strategy.id][to][key] = res;
    return res;
  }

  private getRelativeName(dir: string) {
    let name = dir.slice(this.config.input_path.length);
    name = name.replace(/\\/g, "/");
    name = name.replace(/index/g, "");
    name = name.split(".")[0];

    return name;
  }

  private async generateByDirectory(dir: string) {
    const files: string[] = [];
    const dirs: string[] = [];

    readdirSync(dir).forEach((item) => {
      const itemPath = path.join(dir, item);
      if (statSync(itemPath).isDirectory()) dirs.push(itemPath);
      else files.push(itemPath);
    });

    for (const filePath of files) {
      let file;
      try {
        file = await require(filePath);
      } catch (e) {
        logger.error(
          ` - ${filePath.slice(this.config.input_path.length)} (${e}))`
        );
        continue;
      }

      let fileData;
      if (filePath.endsWith(".json")) fileData = file;
      else fileData = file._i18n;

      if (!fileData) continue;

      const name = this.getRelativeName(filePath);
      this.data[name] ??= {};

      for (const key in fileData) {
        if (key == "_context") continue;

        this.data[name][key] ??= {};
        for (const locale of this.config.locales) {
          const text = fileData[key];
          const res = await this.translate(text, {
            from: this.config.defaultLocale,
            to: locale,
            context: fileData._context,
          });
          this.data[name][key][locale] = res;
        }
      }

      logger.debug(
        ` + ${filePath.slice(this.config.input_path.length + 1)} (${
          Object.keys(fileData).length
        })`
      );
    }

    for (const dirname of dirs) await this.generateByDirectory(dirname);
  }

  public async generate() {
    logger.info("Generating...");
    this.data = {};

    await this.generateByDirectory(this.config.input_path);

    writeFileSync(this.config.output_path, JSON.stringify(this.data));
    this.saveCache();
  }
}

export default I18nGenerator;
