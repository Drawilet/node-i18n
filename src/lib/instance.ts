import logger from "@/util/logger";
import I18nClient from "./client";
import path from "path";
import { Locale } from "types/Locale";

class I18nInstance {
  private client;
  private type;
  private data: Record<string, Record<string, Record<string, string>>>;
  constructor(client: I18nClient, type: string) {
    logger.info(`Creating ${type} instance...`);
    this.client = client;
    this.type = type;

    logger.info("Loading data...");
    this.data = this.load();
    logger.info("Data loaded");
  }

  private load() {
    try {
      switch (this.client.config.output_mode) {
        case "merged":
          return require(path.join(
            this.client.config.output_path,
            this.client.outputFilename
          ))[this.type];

        case "separated":
          return require(path.join(
            this.client.config.output_path,
            this.type + ".json"
          ));

        default:
          break;
      }

      logger.info("Data loaded");
    } catch (e) {
      logger.error(
        "Failed to load data. Please run `i18n generate` to generate data."
      );
      process.exit(1);
    }
  }

  private get(locale: Locale, pathname: string, key: string): string {
    if (!pathname.startsWith("/")) pathname = "/" + pathname;

    const pathdata = this.data[pathname];
    if (!pathdata) {
      logger.error(`Path ${pathname} not found in ${this.type}`);
      return key;
    }

    const localedata = pathdata[locale];
    if (!localedata) {
      logger.warning(`Locale ${locale} not found in ${pathname}`);
      return key;
    }

    const data = localedata[key];
    if (!data) {
      logger.warning(`Key ${key} not found in ${pathname} (${locale})`);
      return key;
    }

    return data;
  }

  public Controller(locale: Locale, pathname: string) {
    return {
      get: (key: string) => this.get(locale, pathname, key),
    };
  }
}

export default I18nInstance;
