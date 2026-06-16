# Schema Markup Validator

Paste your JSON-LD and check it's valid and uses schema.org @context and @type correctly. Zero dependencies — works in plain HTML, React, Vue, Svelte or Astro.

**▶ [Live demo](https://sgbp.tech/tools/schema-markup-validator)**

```html
<script src="schema-validator.js"></script>
<schema-validator></schema-validator>
```

## What it does

Schema markup (structured data) describes your page to search engines using the [schema.org](https://schema.org) vocabulary, usually as JSON-LD in a script tag. Valid markup makes you eligible for **rich results** — star ratings, FAQ drop-downs, and business panels — that win clicks. This validator checks your JSON is valid, uses a schema.org `@context`, declares an `@type`, and includes commonly-required fields for popular types.

## Install

```bash
npm install @sgbp/schema-validator
```

or copy `schema-validator.js` into your project.

## Further reading

Maintained by [SGBP — Singapore Build Partners](https://sgbp.tech), a studio building fast,
accessible websites for Singapore SMEs, as one of a set of free developer tools.

## License

MIT © SGBP. Contributions welcome.
