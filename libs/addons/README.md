Deterministic state management for every framework — one pipeline, zero ambiguity.

<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/readme/sdux-vault.svg" height="200" alt="SDuX Vault" />
</p>

<p align="center">Deterministic state management for every framework — one pipeline, zero ambiguity.</p>

# @sdux-vault/addons

> Composable controllers and runtime policies for SDuX Vault.

<p align="center">
  <a href="https://www.sdux-vault.com"><strong>Docs</strong></a> ·
  <a href="https://www.sdux-vault.com/stackblitz"><strong>Live Examples</strong></a> ·
  <a href="https://www.sdux-vault.com/builder"><strong>Pipeline Builder</strong></a> ·
  <a href="https://github.com/sdux-vault/vault/issues"><strong>Issues</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-first-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/frameworks-Angular%20·%20React%20·%20Vue%20·%20Svelte%20·%20Node-333" alt="Frameworks" />
</p>

## What is SDuX Vault?

SDuX Vault is a **framework-agnostic, deterministic state management system** built around a reactive execution pipeline. It replaces the unpredictable sprawl of action/reducer architectures with a single, ordered, traceable pipeline where every transition is explicit and every output is guaranteed.

## What is SDuX Vault Addons?

`@sdux-vault/addons` provides **optional, plug-in controllers and extensions** that enhance the SDuX Vault runtime with policies, safeguards, and orchestration logic — without modifying the core engine. Add-ons govern _when_ and _whether_ pipeline execution proceeds, not _what_ state becomes.

Every add-on is a composable policy module that plugs into the controller and orchestration layers of the SDuX Vault pipeline. Stack delay, throttle, retry, and failure policies declaratively — each one isolated, deterministic, and safe to compose with any other. No middleware. No side effects. No surprises.

> Traditional middleware mutates the pipeline. Addons govern it.

**Features:**

- **Controller implementations** — reusable policy modules (e.g., delay, throttle)
- **Failure and retry strategies** — max failure limits, retry policies
- **Fluent configuration APIs** — attach policies declaratively
- **Runtime decision hooks** — influence pipeline execution without mutation
- **Composable extensions** — stack multiple policies safely

For full documentation, guides, and API references: [sdux-vault.com](https://www.sdux-vault.com)

---

## Example

```typescript
import { withDelayController } from '@sdux-vault/addons';

const cell = FeatureCell(
  ExampleService,
  {
    key: 'example-feature-cell-key',
    initialState: []
  },
  [],
  [withDelayController]
);

cell.withDelay?.({ millisecondDelay: 3_000 }).initialize();
// Every state update now waits 3 seconds before pipeline execution proceeds
```

---

## Design Principles

- **No state mutation** — add-ons never modify state directly
- **No direct pipeline execution** — they influence decisions, not outcomes
- **Composable and isolated** — stack safely without conflicts
- **Deterministic behavior** — same policy, same result, every time

---

## Peer Dependencies

- `@sdux-vault/shared`
- `@sdux-vault/engine`

---

## Installation

This package is installed automatically as a dependency of `@sdux-vault/core`.

```bash
npm install @sdux-vault/core
```

---

## Ecosystem

| Package                                                                                    | Purpose                                      |
| ------------------------------------------------------------------------------------------ | -------------------------------------------- |
| [`@sdux-vault/shared`](https://www.npmjs.com/package/@sdux-vault/shared)                   | Contracts, types, utilities                  |
| [`@sdux-vault/engine`](https://www.npmjs.com/package/@sdux-vault/engine)                   | Orchestration, conductor, decision engine    |
| [`@sdux-vault/core`](https://www.npmjs.com/package/@sdux-vault/core)                       | Behavior runtime and pipeline execution      |
| [`@sdux-vault/core-extensions`](https://www.npmjs.com/package/@sdux-vault/core-extensions) | Framework integrations (Angular, React, Vue) |
| [`@sdux-vault/devtools`](https://www.npmjs.com/package/@sdux-vault/devtools)               | Observability and debugging                  |

---

## License

[MIT (with SDuX Clarification Notice)](https://www.sdux-vault.com/docs/welcome/license#license-texts) © SDuX Vault
