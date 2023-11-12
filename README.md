# :globe_with_meridians: node-i18n

About
Effortlessly internationalize your app with our npm i18n package. Easily manage translations for diverse audiences, ensuring a user-friendly, global experience."

## Installation

You can install the package via npm:

```bash
npm install node-i18n
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
  dir: /* Directory path */,
  files: /* Path to i18n files */,
});
```

### Strategies

| Name   | api key |
| ------ | ------- |
| Google | ❌      |

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
```
