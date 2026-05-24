<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/brand-landscape.svg" height="80" alt="SDuX Vault" />
</p>

# @sdux-vault/addons

> Composable controllers and runtime policies for SDuX Vault.

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-first-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

`@sdux-vault/addons` provides **optional, plug-in controllers and extensions** that enhance the SDuX runtime with policies, safeguards, and orchestration logic — without modifying the core engine.

For full documentation, guides, and API references: [sdux-vault.com](https://www.sdux-vault.com)

---

## Overview

```plaintext
shared → engine → core → core-extensions → apps
                    ↑          └──────────→ devtools
                  addons
```

Add-ons plug into the controller and orchestration layers as **policy modules** — they influence pipeline execution without mutating state or executing pipelines directly.

---

## What This Package Provides

- **Controller implementations** — reusable policy modules (e.g., delay, throttle)
- **Failure and retry strategies** — max failure limits, retry policies
- **Fluent configuration APIs** — attach policies declaratively
- **Runtime decision hooks** — influence pipeline execution without mutation
- **Composable extensions** — stack multiple policies safely

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

| Package                                                                                      | Purpose                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`@sdux-vault/shared`](https://www.npmjs.com/package/@sdux-vault/shared)                     | Contracts, types, utilities                  |
| [`@sdux-vault/engine`](https://www.npmjs.com/package/@sdux-vault/engine)                     | Orchestration, conductor, decision engine    |
| [`@sdux-vault/core`](https://www.npmjs.com/package/@sdux-vault/core)                         | Behavior runtime and pipeline execution      |
| [`@sdux-vault/core-extensions`](https://www.npmjs.com/package/@sdux-vault/core-extensions)   | Framework integrations (Angular, React, Vue) |
| [`@sdux-vault/devtools-tooling`](https://www.npmjs.com/package/@sdux-vault/devtools-tooling) | Observability and debugging                  |

---

## License

[MIT (with SDuX Clarification Notice)](https://www.sdux-vault.com/docs/welcome/license#license-texts) © SDuX Vault
