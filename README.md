# :globe_with_meridians: node-i18n

Effortlessly internationalize your app with our npm i18n package. Easily manage translations for diverse audiences, ensuring a user-friendly, global experience.

## Installation

```bash
# npm
npm install @drawilet/i18n

# yarn
yarn add @drawilet/i18n
```

## Getting started

As a first step, you must choose a translation strategy.

### Avaiable [strategies](#strategies)

| Name              | api key | limits             | Proxy agent |
| ----------------- | ------- | ------------------ | ----------- |
| [Google](#google) | ❌      | :heavy_check_mark: | ✅          |

1. Execute the following command to create the configuration file.

   ```bash
   npx i18n init
   ```

   This should generate a configuration file i18n.config.js similar to this:

   ```js
   const GoogleStrategy = require("@drawilet/i18n/strategies/google").default;

   module.exports = {
     strategy: new GoogleStrategy(),
     locales: ["es", "en"],
     defaultLocale: "en",
     input_path: __dirname + "/src/routes",
     output_path: __dirname + "/src/locales/routes.json",
     cache_path: __dirname + "/cache/i18n.json",
   };
   ```

   Configure it according your project requirements.

2. In each file (page, route) of your project, you should export `_i18n` in this way:

   ```ts
   export const _i18n = {
     key: "value",
   };
   ```

3. Run `npx i18n generate` to generate the files.

4. Use the i18n client to get the translations.
    > ## Pro tip
   > Use our [clients](#clients) for a native-like experience. :star2:

   ```ts
   import I18nClient from "@drawilet/i18n/Client";
   const I18N = new I18nClient();

   // You can get the translatiions using the "get" method
   I18N.get("locale", "path", "key");

   // or creating a subclient (ideal for pages or routes)
   const i18n = I18N.createClient("locale", "path");

   // and use it infite times
   i18n.get("title");
   i18n.get("description");
   ```



---
<br>

## Strategies

### Google

```js
new GoogleStrategy("proxy_url")
```

- `proxy_url (optional)`: It is the proxy that will be used to avoid rate limits.<br> You can obtain one [here](https://free-proxy-list.net/) . <br>**WARNING**: Use this only for personal projects.

## Clients
- [nextjs-i18n](https://www.npmjs.com/package/@drawilet/nextjs-i18n) - 
A client for [Next.js](https://www.npmjs.com/package/next)
  
> More clients are being created.
