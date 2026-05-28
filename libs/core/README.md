<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/brand-landscape.svg" height="80" alt="SDuX Vault" />
</p>

<h3 align="center">Plain TypeScript. Zero Magic.</h3>
<p align="center">Deterministic state management for every framework — one pipeline, zero ambiguity.</p>

# @sdux-vault/core

> Behavior runtime and pipeline execution layer for SDuX Vault.

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

## What is SDuX Vault Core?

`@sdux-vault/core` provides the **runtime implementation for behaviors and state pipeline execution**. It builds on the contracts defined in `@sdux-vault/shared` and delivers the concrete execution layer that runs behaviors and applies state changes. Core is the **bridge between contracts and runtime execution** — it takes the interfaces defined in `shared`, the orchestration from `engine`, and produces actual state transitions.

**Features:**

- **Behavior runtime** — executes behavior implementations in defined order
- **Pipeline execution** — runs ordered behavior stages (resolve → filter → reduce → persist → emit)
- **State commit logic** — applies updates to snapshots with isolation guarantees
- **State emission** — publishes state changes as isolated copies
- **FeatureCell factory** — creates and configures feature cells with typed state

For full documentation, guides, and API references: [sdux-vault.com](https://www.sdux-vault.com)

---

## Example

```typescript
import { FeatureCell } from '@sdux-vault/core';

const cell = FeatureCell(CartService, {
  key: 'cart',
  initialState: { items: [], total: 0 }
});

cell.filters([validateCart]).reducers([computeTotal]).initialize();
```

---

## Execution Model

Core processes state updates through an ordered behavior pipeline:

```plaintext
incoming → behaviors → state commit → emit
```

- **Ordered execution** — stages run in a guaranteed sequence
- **Controlled mutation** — state is only modified through pipeline stages
- **Isolated emission** — external consumers receive immutable copies

---

## Peer Dependencies

- `@sdux-vault/engine`

---

## Installation

```bash
npm install @sdux-vault/core
```

---

## Ecosystem

| Package                                                                                      | Purpose                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`@sdux-vault/shared`](https://www.npmjs.com/package/@sdux-vault/shared)                     | Contracts, types, utilities                  |
| [`@sdux-vault/engine`](https://www.npmjs.com/package/@sdux-vault/engine)                     | Orchestration, conductor, decision engine    |
| [`@sdux-vault/addons`](https://www.npmjs.com/package/@sdux-vault/addons)                     | Optional runtime policies and controllers    |
| [`@sdux-vault/core-extensions`](https://www.npmjs.com/package/@sdux-vault/core-extensions)   | Framework integrations (Angular, React, Vue) |
| [`@sdux-vault/devtools-tooling`](https://www.npmjs.com/package/@sdux-vault/devtools-tooling) | Observability and debugging                  |

---

## License

[MIT (with SDuX Clarification Notice)](https://www.sdux-vault.com/docs/welcome/license#license-texts) © SDuX Vault
