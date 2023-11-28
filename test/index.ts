import I18n from "../src/";
const i18n = new I18n();

(async () => {
  /*<──  ───────    COMPONENTS   ───────  ──>*/
  const i18nComponents = i18n.Instance("components");
  const appComponentI18n = i18nComponents.Controller("en", "app");

  console.log(appComponentI18n.get("label"));

  /*<──  ───────    PAGES   ───────  ──>*/
  const i18nPages = i18n.Instance();

  const customersPageI18n = i18nPages.Controller("en", "customers");
  console.log(customersPageI18n.get("title"));

  const homePageI18n = i18nPages.Controller("en", "/");
  console.log(homePageI18n.get("title"));
})();
