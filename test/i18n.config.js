const GoogleStrategy = require("../build/strategies/Google").default;

module.exports = {
  strategy: new GoogleStrategy("http://212.107.31.118:80"),
  locales: ["es", "en"],
  defaultLocale: "en",
  files: __dirname + "/routes",
  data_path: __dirname + "/i18n/routes.json",
  cache_path: __dirname + "/cache/i18n.json",
};
