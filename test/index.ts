import I18n from "../src/";
const i18n = new I18n();

(async () => {
  await i18n.load();



  const client = i18n.createClient("es", "/customers/");

  console.log(client.get("title"));
})();
