# Usage & API

It is a standard custom element, so it works with no wrapper in plain HTML, React, Vue, Svelte and Astro.

## Plain HTML

```html
<script src="schema-validator.js"></script>
<schema-validator></schema-validator>
```

## React

```jsx
import "@sgbp/schema-validator";
export default function Page() { return <schema-validator />; }
```

## Vue

```vue
<script setup>
import "@sgbp/schema-validator";
</script>

<template>
  <schema-validator />
</template>
```

---

Prefer to just use it without installing anything? The
[live Schema Markup Validator](https://sgbp.tech/tools/schema-markup-validator) is hosted and ready to go.
