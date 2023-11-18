import { Locale } from "types/Locale";

import I18nBase from "./Base";
import logger from "./util/logger";

class I18nClient extends I18nBase {
  public load() {
    logger.info("Loading data...");
    try {
      this.data = require(this.config.data_path);
      logger.info("Data loaded");
    } catch (e) {
      logger.error(
        "Failed to load data. Please run `i18n generate` to generate data."
      );
    }
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

export default I18nClient;
