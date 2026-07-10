---
name: addStackblitzExample
agent: agent
description: 'Adds a new StackBlitz example entry to the appropriate constants file. Reads the project.ts file(s) to determine the example title and description, then updates stackblitz-examples.constants.ts (for angular/react/svelte/vue) or stackblitz-language-sections.constants.ts (for all other languages).'
inputs:
  - id: name
    type: text
    description: 'The example file name (without .project.ts), matching the file at vault/apps/docs-app/app/stackblitz/projects/<language>/<name>.project.ts (e.g., tab-sync-example)'
  - id: language
    type: text
    description: 'One or more runtime targets. Use a comma-separated list for multi-framework examples (e.g., "angular, react, svelte, vue") or a single value for specialty runtimes (e.g., "bun").'
  - id: category
    type: text
    description: 'Required for framework languages (angular, react, svelte, vue) only. Accepted values: started (Getting Started), core (Core Patterns), intermediate (Intermediate), advanced (Advanced). Omit for specialty languages (bun, nodejs, vanillajs, etc.) — specialty examples are placed in their language section, not a category group.'
  - id: isVault
    type: text
    description: 'Optional. Set to "true" when the example requires an SDuX Vault license (i.e., it uses a licensed behavior or controller). Omit or leave blank otherwise.'
  - id: notice
    type: text
    description: 'Optional. HTML snippet shown as a notice when the example has a StackBlitz platform limitation or requires a local setup. Always required for non-angular/react/svelte/vue languages.'
---

# Add StackBlitz Example — `{{ name }}`

Add a new example entry for `{{ name }}` targeting `{{ language }}`.

---

## Step 1 — Parse inputs

Normalize the inputs before reading any files.

### Language list

Split `{{ language }}` on commas and trim whitespace from each token. Classify each token:

- **Framework languages**: `angular`, `react`, `svelte`, `vue`
- **Specialty languages**: any other value (e.g., `bun`, `nodejs`, `vanillajs`)

A single example is either a **framework example** (all tokens are framework languages) or a **specialty example** (contains any specialty language token). Mixed lists are not supported — if both framework and specialty tokens appear, stop and report an error.

### Category mapping

Applies to **framework examples only**. If the language list contains only specialty languages, skip this field entirely — specialty examples are placed in their language section.

If `category` is missing for a framework example, stop and report: `category is required for framework examples. Accepted values: started, core, intermediate, advanced.`

| Input value    | heading           | id                |
| -------------- | ----------------- | ----------------- |
| `started`      | `Getting Started` | `getting-started` |
| `core`         | `Core Patterns`   | `core-patterns`   |
| `intermediate` | `Intermediate`    | `intermediate`    |
| `advanced`     | `Advanced`        | `advanced`        |

### isVault flag

Set `isVault: true` only when `{{ isVault }}` is exactly the string `"true"`. Omit the property entirely otherwise.

### notice field

Include the `notice` property only when `{{ notice }}` is non-empty. Preserve the HTML exactly as provided.

---

## Step 2 — Read source files

Read the following files in parallel before writing anything.

### Project file(s)

For each language token, read:

```
vault/apps/docs-app/app/stackblitz/projects/<language>/{{ name }}.project.ts
```

Focus on:

- The `title` property of the exported `Project` object — it reveals the language prefix and example slug.
- Any embedded `README.md` file string — it describes the feature, key behaviors, and purpose of the example.
- Any inline comments that explain the domain or state shape.

### Constants file(s)

Always read both constants files to understand naming conventions, description style, and existing entries before generating new content:

- `vault/apps/docs-app/app/docs/stack-blitz/constants/stackblitz-examples.constants.ts`
- `vault/apps/docs-app/app/docs/stack-blitz/constants/stackblitz-language-sections.constants.ts`

---

## Step 3 — Generate example metadata

Using the content from the project file(s) and the style of existing entries in the constants file, derive the following fields.

### `title`

A short, human-readable display name for the example. Follow the capitalization style of existing titles (e.g., `Replace State`, `Filter & Reducer Pipeline`, `Tab Sync`). Do not include the language name or the word "example".

### `id`

A kebab-case identifier. Rules:

- **Framework examples**: derive from the example name — strip the `-example` suffix and use the result (e.g., `tab-sync-example` → `tab-sync`). Check the constants file to confirm no collision with an existing `id`.
- **Specialty examples**: prefix with the language token and derive from the example name (e.g., `bun` + `replace-example` → `bun-replace-state`). Follow the pattern of existing specialty IDs in `stackblitz-language-sections.constants.ts`.

### `exampleName`

This is always exactly `{{ name }}` (the file name without `.project.ts`).

### `description`

Write a one-to-two sentence description matching the voice and structure of existing entries. Use `${brandName}` (not a hardcoded brand name) wherever the product name is referenced. For framework examples, end with: `Choose your framework and launch the example directly in StackBlitz.` For specialty examples that are local-only, end with the appropriate local run instruction matching the existing style.

### `languages` array

- **Framework example**: include an object for every framework language token provided, using the exact `name`/`key` pairs found in the existing constants file:
  - `{ name: 'Angular', key: 'angular' }`
  - `{ name: 'React', key: 'react' }`
  - `{ name: 'Svelte', key: 'svelte' }`
  - `{ name: 'Vue', key: 'vue' }`
- **Specialty example**: include a single object matching the language (e.g., `{ name: 'Bun', key: 'bun' }`). The `name` value must match the `heading` of the language's section in `stackblitz-language-sections.constants.ts`.

---

## Step 4 — Update the constants file

### Framework examples → `stackblitz-examples.constants.ts`

Locate the group object whose `id` matches the mapped category id from Step 1.

Insert a new entry into that group's `examples` array. Do **not** manually sort — the `createExampleGroups` function sorts examples alphabetically at runtime.

The new entry shape:

```ts
{
  title: '<derived title>',
  id: '<derived id>',
  exampleName: '{{ name }}',
  // include isVault: true only when the flag is set
  // include notice: `...` only when notice is non-empty
  description: `<derived description>`,
  languages: [
    // one object per language token
  ]
}
```

### Specialty examples → `stackblitz-language-sections.constants.ts`

Locate the section object in the `sections` array whose `id` matches the language token (e.g., `id: 'bun'`).

#### If the section already exists

Insert a new entry into that section's `examples` array. Do **not** manually sort — `createLanguageSections` sorts at runtime.

#### If no matching section exists

Create a new section object and append it to the `sections` array inside `createLanguageSections`, before the closing `];`. Derive the section fields as follows:

- `heading` — title-case of the language token (e.g., `vanillajs` → `VanillaJS`, `nodejs` → `Node.js`). Use the conventional display name for the runtime, not just a mechanical title-case.
- `id` — the language token exactly as provided (e.g., `vanillajs`).
- `icon` — follow the pattern `assets/brand/<language>/<language>-icon.svg` (e.g., `assets/brand/vanillajs/vanillajs-icon.svg`).
- `description` — one sentence describing the runtime's purpose and local-only constraint, matching the voice of existing section descriptions.
- `examples` — an array containing only the new entry being added.

New section shape:

```ts
{
  heading: '<Display Name>',
  id: '<language>',
  icon: 'assets/brand/<language>/<language>-icon.svg',
  description: '<one sentence description>',
  examples: [
    // new entry below
  ]
}
```

#### New entry shape (applies to both cases)

```ts
{
  title: '<derived title>',
  id: '<language>-<derived short id>',
  exampleName: '{{ name }}',
  localOnly: true,
  notice: `<notice html>`,
  description: `<derived description>`,
  languages: [{ name: '<Display Name>', key: '<language>' }]
}
```

`localOnly: true` is always set for specialty runtime entries.

---

## Step 5 — Validate

Before finishing, verify:

1. The `id` does not collide with any existing entry in the target constants file.
2. The entry is inserted inside the correct group/section `examples` array, not at the top level.
3. The `exampleName` matches `{{ name }}` exactly.
4. `isVault` is present only when explicitly requested.
5. `notice` is present only when provided and non-empty.
6. All `${brandName}` references use the template variable form — no hardcoded brand names.
7. TypeScript syntax is valid (template literals closed, object trailing commas consistent with surrounding code).

---

## Output

After updating the file, respond with:

1. The entry was added to `<constants file path>` under the `<group/section heading>` group.
2. Confirm the derived `title`, `id`, `exampleName`, and `languages`.
