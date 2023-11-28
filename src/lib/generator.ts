import { mkdirSync, readdirSync, statSync, writeFile, writeFileSync } from "fs";

import path from "path";
import { Locale } from "types/Locale";
import I18nBase from "./base";
import logger from "../util/logger";
import validatePath from "../util/validatePath";
import { rimraf } from "rimraf";

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

  private getRelativeName(input: string, dir: string) {
    let name = dir.slice(this.config.inputs[input].length);
    name = name.replace(/\\/g, "/");
    name = name.replace(/index/g, "");
    name = name.split(".")[0];

    if (name.endsWith("/")) name = name.slice(0, -1);

    return name;
  }

  private async generateByDirectory(input: string, dir: string) {
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
          ` - ${filePath.slice(this.config.inputs[input].length)} (${e}))`
        );
        continue;
      }

      let fileData;
      if (filePath.endsWith(".json")) fileData = file;
      else fileData = file._i18n;

      if (!fileData) continue;

      const pathame = this.getRelativeName(input, filePath);
      this.data[input][pathame] ??= {};

      for (const locale of this.config.locales) {
        this.data[input][pathame][locale] ??= {};

        for (const key in fileData) {
          if (key == "_context") continue;

          const text = fileData[key];
          const res = await this.translate(text, {
            from: this.config.defaultLocale,
            to: locale,
            context: fileData._context,
          });
          this.data[input][pathame][locale][key] = res;
        }
      }

      logger.debug(
        ` + ${filePath.slice(this.config.inputs[input].length + 1)} (${
          Object.keys(fileData).length
        })`
      );
    }

    for (const dirname of dirs) await this.generateByDirectory(input, dirname);
  }

  public async generate() {
    logger.info("Generating...");
    this.data = {};
    await rimraf(this.config.output_path);
    mkdirSync(this.config.output_path, { recursive: true });

    for (const input in this.config.inputs) {
      logger.debug(`> ${input}`);
      this.data[input] ??= {};
      const dir = this.config.inputs[input];
      await this.generateByDirectory(input, dir);
    }

    this.saveCache();

    switch (this.config.output_mode) {
      case "merged":
        writeFileSync(
          path.join(this.config.output_path, this.outputFilename),
          JSON.stringify(this.data)
        );
        break;

      case "separated":
        for (const input in this.data) {
          const dir = path.join(this.config.output_path, `${input}.json`);
          writeFileSync(dir, JSON.stringify(this.data[input]));
        }
        break;
      default:
        break;
    }
  }
}

export default I18nGenerator;
