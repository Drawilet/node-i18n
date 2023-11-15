import { Locale } from "types/Locale";

import I18nBase from "./base";

class I18nClient extends I18nBase {
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

export default I18nClient;
