# :globe_with_meridians: node-i18n

About
Effortlessly internationalize your app with our npm i18n package. Easily manage translations for diverse audiences, ensuring a user-friendly, global experience."

## Installation

You can install the package via npm:

```bash
npm install @drawilet/i18n
```

## Usage

### Initialize

To use the package, you need to initialize the `I18n` class. Here's an example of how you might set it up:

```javascript
import I18n from "@drawilet/i18n";

// Initialize the i18n instance
const i18n = new I18n(strategy, {
  locales: [/* Array of supported locales */],
  defaultLocale: /* Default locale */,
  files: /* Path to files (routes, pages, views) */,
  cache_path: /* Path to cache*/,
  data_path: /* Path to data (auto-generated)*/
});
```

### Strategies

| Name   | api key | limits             | Proxy agent |
| ------ | ------- | ------------------ | ----------- |
| Google | ❌      | :heavy_check_mark: | ✅          |

### Methods

#### `translate`

This method translates text from one locale to another.

#### `generate`

Generates i18n data from the specified directory.

#### `load`

Loads the generated i18n data.

#### `get`

Retrieves the translated content for a specific locale, pathname, and key.

#### `createClient`

Creates a client to access translations based on a locale and pathname.

## Code Example

```javascript
const i18n = new I18n(new GoogleStrategy("http://212.107.31.118:80"), {
  locales: ["es", "en"],
  defaultLocale: "en",
  files: __dirname + "/routes",
});

(async () => {
  await i18n.generate();
  await i18n.load();

  const client = i18n.createClient("es", "/customers/");

  console.log(client.get("title"));
})();
```
