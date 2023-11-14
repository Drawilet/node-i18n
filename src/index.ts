import { Locale } from "types/Locale";
import { Strategy } from "types/Strategy";

import path from "path";
import { readdirSync, statSync, writeFile, writeFileSync } from "fs";

import { validatePath } from "./util/validatePath";

class I18n {
  private strategy;
  private config;

  private cache: Record<string, Record<string, Record<string, string>>>;
  private data: Record<string, Record<string, Record<string, string>>>;

  constructor(
    strategy: Strategy,
    config: {
      locales: Locale[];
      defaultLocale: Locale;
      files: string;
      cache_path?: string;
      data_path?: string;
    }
  ) {
    config.cache_path ??= path.resolve("cache/i18n.json");
    config.data_path ??= path.resolve(
      `src/i18n/${path.basename(config.files)}.json`
    );

    if (!config.cache_path.endsWith(".json"))
      throw new Error("cache_path must be a json file");
    if (!config.data_path.endsWith(".json"))
      throw new Error("data_path must be a json file");

    config.data_path = path.join(config.data_path);
    config.cache_path = path.join(config.cache_path);
    config.files = path.join(config.files);

    validatePath(config.cache_path, JSON.stringify({}));
    validatePath(config.data_path, JSON.stringify({}));

    this.cache = require(config.cache_path);
    this.data = require(config.data_path);

    this.cache[strategy.id] ??= {};

    this.strategy = strategy;
    this.config = config as {
      locales: Locale[];
      defaultLocale: Locale;
      files: string;
      cache_path: string;
      data_path: string;
    };
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

    this.cache[this.strategy.id][to] ??= {};
    if (this.cache[this.strategy.id][to][key])
      return this.cache[this.strategy.id][to][key];

    const res = await this.strategy.get(text, { from, to, context });

    this.cache[this.strategy.id][to][key] = res;
    return res;
  }

  private getRelativeName(dir: string) {
    let name = dir.slice(this.config.files.length);
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
      const file = require(filePath);

      let fileData;
      if (filePath.endsWith(".json")) fileData = file;
      else fileData = file.i18nData;

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
    }

    for (const dirname of dirs) await this.generateByDirectory(dirname);
  }

  public async generate() {
    this.data = {};

    await this.generateByDirectory(this.config.files);

    writeFileSync(this.config.data_path, JSON.stringify(this.data));
    this.saveCache();
  }

  public async load() {
    this.data = require(this.config.data_path);
  }

  public get(locale: Locale, pathname: string, key: string) {
    if (!pathname.endsWith("/")) pathname += "/";

    return (
      this.data[pathname][key][locale] ??
      this.data[pathname][key][this.config.defaultLocale] ??
      key
    );
  }

  public createClient(locale: Locale, pathname: string) {
    return {
      get: (key: string) => this.get(locale, pathname, key),
    };
  }
}

export default I18n;
