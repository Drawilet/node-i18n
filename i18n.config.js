const GoogleStrategy = require("./dist/strategies/Google").default;

module.exports = {
  strategy: new GoogleStrategy("http://212.107.31.118:80"),
  locales: ["es", "en"],
  defaultLocale: "en",
  input_path: __dirname + "/test/routes",
  output_path: __dirname + "/test/locales/routes.json",
  cache_path: __dirname + "/test/cache/i18n.json",
};
