Deterministic state management for every framework — one pipeline, zero ambiguity.

<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/readme/sdux-vault.svg" height="200" alt="SDuX Vault" />
</p>

# @sdux-vault/shared

> Core primitives, contracts, and utilities for the SDuX Vault platform.

<p align="center">
  <a href="https://www.sdux-vault.com"><strong>Docs</strong></a> ·
  <a href="https://www.sdux-vault.com/stackblitz"><strong>Live Examples</strong></a> ·
  <a href="https://www.sdux-vault.com/builder"><strong>Pipeline Builder</strong></a> ·
  <a href="https://github.com/sdux-vault/vault/issues"><strong>Issues</strong></a>
</p>

<p align="center">
  <a href="https://youtu.be/m7ClyWSh754">
    <img src="https://img.youtube.com/vi/m7ClyWSh754/maxresdefault.jpg" width="600" alt="Watch: 5-minute overview" />
  </a>
  <br />
  <em>Watch: 5-minute overview</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-first-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/frameworks-Angular%20·%20React%20·%20Vue%20·%20Svelte%20·%20Node-333" alt="Frameworks" />
</p>

## What is SDuX Vault?

SDuX Vault is a **framework-agnostic, deterministic state management system** built around a reactive execution pipeline. It replaces the unpredictable sprawl of action/reducer architectures with a single, ordered, traceable pipeline where every transition is explicit and every output is guaranteed.

## What is SDuX Vault Shared?

`@sdux-vault/shared` is the **foundation of the SDuX ecosystem**. It defines the universal language used across all SDuX packages — types, contracts, behaviors, and utilities. Every SDuX package depends on `shared`. It is the lowest layer in the dependency graph and has **zero external dependencies**.

**Features:**

- **Core contracts** — interfaces, shapes, and types that define the SDuX API surface
- **Behavior and controller abstractions** — base types for pipeline stages
- **Utility functions** — type guards, safe helpers, runtime utilities
- **Configuration primitives** — options, settings, and feature flags
- **Error models** — structured error types and services
- **Runtime instrumentation hooks** — DevTools integration points

**Key Characteristics:**

- ✅ **Framework-agnostic** — pure TypeScript, zero dependencies
- ✅ **Tree-shakable** — domain-based exports, minimal runtime footprint
- ✅ **SSR-safe and browser-safe** — works everywhere
- ✅ **Stable public API** — domain-driven, designed for composition

For full documentation, guides, and API references: [sdux-vault.dev](https://www.sdux-vault.dev)

---

## Example

```typescript
import { VaultError, BehaviorTypes } from '@sdux-vault/shared';
import { isPromise } from '@sdux-vault/shared';
import type { BehaviorType, StateSnapshotShape } from '@sdux-vault/shared';

if (isPromise(value)) {
  // handle async flow
}
```

---

## Side Effects

This package includes intentional side effects for:

- Global TypeScript typing augmentation
- Runtime version registration for DevTools

These are environment-guarded, idempotent, and safe in SSR and production.

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
| [`@sdux-vault/engine`](https://www.npmjs.com/package/@sdux-vault/engine)                   | Orchestration, conductor, decision engine    |
| [`@sdux-vault/core`](https://www.npmjs.com/package/@sdux-vault/core)                       | Behavior runtime and pipeline execution      |
| [`@sdux-vault/addons`](https://www.npmjs.com/package/@sdux-vault/addons)                   | Optional runtime policies and controllers    |
| [`@sdux-vault/core-extensions`](https://www.npmjs.com/package/@sdux-vault/core-extensions) | Framework integrations (Angular, React, Vue) |
| [`@sdux-vault/devtools`](https://www.npmjs.com/package/@sdux-vault/devtools)               | Observability and debugging                  |

---

## License

[MIT (with SDuX Clarification Notice)](https://www.sdux-vault.com/docs/welcome/license#license-texts) © SDuX Vault
