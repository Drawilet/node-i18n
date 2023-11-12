import I18n from "@/index";
import GoogleStrategy from "@/strategies/Google";

const i18n = new I18n(new GoogleStrategy(), {
  locales: ["es", "en"],
  defaultLocale: "en",
  dir: __dirname + "/i18n",
  files: __dirname + "/routes",
});

(async () => {
  await i18n.load();

  const client = i18n.createClient("es", "/customers/");

  console.log(client.get("title"));
})();
