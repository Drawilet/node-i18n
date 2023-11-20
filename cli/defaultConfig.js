const GoogleStrategy = require("@drawilet/i18n/strategies/google").default;

module.exports = {
  strategy: new GoogleStrategy(),
  locales: ["es", "en"],
  defaultLocale: "en",
  input_path: __dirname + "/src/routes",
  output_path: __dirname + "/src/locales/routes.json",
  cache_path: __dirname + "/cache/i18n.json",
};
