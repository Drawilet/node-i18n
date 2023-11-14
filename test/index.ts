import I18n from "../src/";
import GoogleStrategy from "../src/strategies/Google";

const i18n = new I18n(new GoogleStrategy("http://212.107.31.118:80"), {
  locales: ["es", "en"],
  defaultLocale: "en",
  files: __dirname + "/routes",
  data_path: __dirname + "/i18n/routes.json",
  cache_path: __dirname + "/cache/i18n.json",
});

(async () => {
  await i18n.generate();
  await i18n.load();

  const client = i18n.createClient("es", "/customers/");

  console.log(client.get("title"));
})();
