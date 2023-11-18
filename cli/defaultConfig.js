const GoogleStrategy = require("@drawilet/i18n/strategies/google").default;

module.exports = {
  strategy: new GoogleStrategy(),
  locales: ["es", "en"],
  defaultLocale: "en",
  files: __dirname + "/src/routes",
  data_path: __dirname + "/src/i18n/routes.json",
  cache_path: __dirname + "/cache/i18n.json",
};
