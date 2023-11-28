const GoogleStrategy = require("./dist/strategies/Google").default;

/**@type {import("./types/I18nConfig").default*/
module.exports = {
  strategy: new GoogleStrategy("http://212.107.31.118:80"),
  locales: ["es", "en"],
  defaultLocale: "en",

  output_path: __dirname + "/test/locales/",
  cache_path: __dirname + "/test/cache/i18n.json",

  output_mode: "merged",

  inputs: [__dirname + "/test/routes", __dirname + "/test/components"],
};
