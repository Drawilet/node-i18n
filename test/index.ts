import I18n from "../src/";
import GoogleStrategy from "../src/strategies/Google";

const i18n = new I18n(new GoogleStrategy("http://212.107.31.118:80"), {
  locales: ["es", "en"],
  defaultLocale: "en",
  dir: __dirname + "/i18n",
  files: __dirname + "/routes",
});

(async () => {
  await i18n.generate();
  await i18n.load();

  const client = i18n.createClient("es", "/customers/");

  console.log(client.get("title"));
})();
