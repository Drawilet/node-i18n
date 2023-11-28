const GoogleStrategy = require("@drawilet/i18n/strategies/google").default;

module.exports = {
  strategy: new GoogleStrategy(),
  locales: ["es", "en"],
  defaultLocale: "en",

  output_path: __dirname + "/src/locales/",
  cache_path: __dirname + "/cache/i18n.json",

  output_mode: "separated",

  inputs: [__dirname + "/src/routes"],
};
