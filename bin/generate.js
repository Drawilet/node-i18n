#!/usr/bin/env node
const I18nGenerator = require("../build/Generator").default;

(async () => {
  const i18nGenerator = new I18nGenerator();
  i18nGenerator.generate();
})();
