Deterministic state management for every framework — one pipeline, zero ambiguity.

<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/readme/sdux-vault.svg" height="200" alt="SDuX Vault" />
</p>

# @sdux-vault/devtools

> Observability, debugging, and runtime inspection for SDuX Vault.

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

## What is SDuX Vault DevTools Tooling?

`@sdux-vault/devtools` provides the developer-facing tooling layer for SDuX Vault. It enables deep insight into pipeline execution, controller decisions, and state transitions in real time — with zero production overhead.

**Features:**

- **Runtime instrumentation** — non-invasive hooks into pipeline execution
- **Pipeline inspection** — observe every stage of execution in real time
- **Controller decision tracing** — see why controllers approved, denied, or abstained
- **State transition tracking** — trace every state change with a unique `traceId`
- **DevTools integration bridge** — connects to the SDuX Chrome extension

**Key Characteristics:**

- ✅ **Non-invasive** — does not alter execution or mutate state
- ✅ **Dev-only** — no-op in production, zero runtime overhead
- ✅ **Framework-agnostic** — works with Angular, React, Vue, Node
- ✅ **SSR-safe** — guarded for server-side rendering environments
- ✅ **Traceable** — every pipeline run is tracked via `traceId`

For full documentation, guides, and API references: [sdux-vault.com](https://www.sdux-vault.com)

---

## Example

```typescript
import { Vault } from '@sdux-vault/core';

// Enable DevTools instrumentation
Vault({ devMode: true });

const cell = FeatureCell(ExampleService, {
  key: 'example-feature-cell-key',
  initialState: [],
  insights: {
    wantsErrors: true,
    wantsPayload: true,
    wantsState: false
  }
});

cell.initialize();
// DevTools will now trace all pipeline execution for this cell
```

---

## Side Effects

This package performs **controlled, dev-only side effects**:

```typescript
import '@sdux-vault/devtools';
```

- Triggers DevTools registration and runtime instrumentation wiring
- **No-op in production** — idempotent and safe across all runtimes

---

## Peer Dependencies

- `@sdux-vault/shared`

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
| [`@sdux-vault/addons`](https://www.npmjs.com/package/@sdux-vault/addons)                   | Optional runtime policies and controllers    |
| [`@sdux-vault/core-extensions`](https://www.npmjs.com/package/@sdux-vault/core-extensions) | Framework integrations (Angular, React, Vue) |

---

## License

[MIT (with SDuX Clarification Notice)](https://www.sdux-vault.com/docs/welcome/license#license-texts) © SDuX Vault
