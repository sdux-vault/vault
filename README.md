Deterministic state management for every framework — one pipeline, zero ambiguity.

<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/readme/sdux-vault.svg" height="200" alt="SDuX Vault" />
</p>

# @sdux-vault

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

---

## What is SDuX Vault?

SDuX Vault is a **framework-agnostic, deterministic state management system** built around a reactive execution pipeline. It replaces the unpredictable sprawl of action/reducer architectures with a single, ordered, traceable pipeline where every transition is explicit and every output is guaranteed.

Each unit of state — called a **FeatureCell** — encapsulates state, pipeline, and lifecycle into a single boundary with built-in handling for persistence, encryption, reducers, caching, and composable behaviors. No actions. No effects ceremony. No dispatch spaghetti.

```typescript
const cartCell = new FeatureCell<CartState>({
  name: 'cart',
  initialState: { items: [], total: 0, status: 'idle' }
});

cartCell.replaceState({
  value: { items: updatedItems, total: computeTotal(items), status: 'ready' }
});
```

---

## The Pipeline

Seven stages. One direction. Zero ambiguity.

```
Controllers → Interceptors → Resolve → Filters → Reducers → Taps → Extensions
```

| Stage            | Purpose                                                                          |
| ---------------- | -------------------------------------------------------------------------------- |
| **Controllers**  | Policy-driven governance. Control when, how, and whether execution proceeds.     |
| **Interceptors** | Guard and transform incoming actions before they reach the pipeline.             |
| **Resolve**      | Async data resolution. Fetch what you need before state commits.                 |
| **Filters**      | Conditional execution gates. Skip or continue based on state or action shape.    |
| **Reducers**     | Pure state transformations. Deterministic computation with zero side effects.    |
| **Taps**         | Observe committed state without modifying it. Logging, analytics, sync triggers. |
| **Extensions**   | Post-commit behaviors like persistence and encryption. State remains pure.       |

---

## Why SDuX Vault?

| Capability        | Redux / NgRx            | SDuX Vault                        |
| ----------------- | ----------------------- | --------------------------------- |
| State transitions | Action + reducer pairs  | `replaceState()` / `mergeState()` |
| Execution order   | Unguaranteed middleware | Ordered pipeline stages           |
| State ownership   | Global store, shared    | FeatureCell — scoped              |
| Testing           | Mock deps, varied       | act → settle → assert             |
| Governance        | Custom middleware       | Policy Controllers                |
| Persistence       | Third-party middleware  | Built-in post-commit              |
| Boilerplate       | Very high               | Minimal — Builder generates it    |

---

## Core Principles

**Deterministic by design** — Same input. Same pipeline. Same result. Every time.

**FeatureCell ownership** — One feature. One cell. One truth. Clear boundaries, clear lifecycle, clear responsibility.

**Composable behaviors** — Enhance pipeline execution without changing contracts. Add caching, encryption, persistence — all opt-in, all traceable.

**Testing becomes stable** — No flaky tests. No timing hacks. No marble diagrams. Just deterministic queue semantics and clear settlement boundaries.

```typescript
it('updates cart', async () => {
  cartCell.mergeState({ value: mockItems });
  await vaultSettled('<cart-cell-key>');
  expect(cartCell.state.total).toBe(42);
});
```

---

## Framework Support

Pure TypeScript core with first-class bindings for every major framework.

| Framework          | Integration         |
| ------------------ | ------------------- |
| **Angular**        | Injectable services |
| **React**          | Hooks + context     |
| **Vue**            | Composition API     |
| **Svelte**         | Stores              |
| **Node.js**        | Server-side state   |
| **Any TypeScript** | Zero dependencies   |

---

## Quick Start

### Pipeline Builder

The fastest path from curiosity to production-ready SDuX Vault. Define your state shape, configure pipeline stages, and get generated type-safe TypeScript — ready to copy or launch directly in StackBlitz.

👉 [**Launch the Pipeline Builder**](https://www.sdux-vault.com/builder)

### Live Examples

Explore real SDuX Vault pipelines in StackBlitz. No install required.

- [Filter & Reducer Pipeline](https://www.sdux-vault.com/stackblitz/basic-filter-reducer) — Data flows through filters and reducers before becoming state.
- [Delay Interceptor](https://www.sdux-vault.com/stackblitz/interceptor-delay) — State updates flow through a delay interceptor before committing.
- [Built-in Debugger](https://www.sdux-vault.com/stackblitz/debugger) — Record, export & diagnose.

👉 [**View all examples**](https://www.sdux-vault.com/stackblitz)

---

## Enterprise Ready

- **Auditability** — Every state transition is logged and traceable through the pipeline.
- **Security** — Post-commit encryption extensions protect sensitive state without compromising deterministic purity.
- **Observability** — Pipeline taps provide built-in telemetry hooks. Connect to any monitoring platform without middleware.
- **Compliance** — Separate governance from business logic for clearer control evidence.
- **Migration** — Adopt incrementally by feature domain rather than platform rewrite.
- **Scale** — Bounded ownership keeps product growth coherent across teams.

👉 [**Enterprise capabilities**](https://www.sdux-vault.com/enterprise)

---

## Documentation

| Resource           | Link                                                            |
| ------------------ | --------------------------------------------------------------- |
| Architecture guide | [sdux-vault.com](https://www.sdux-vault.com)                    |
| Pipeline reference | [Pipeline stages](https://www.sdux-vault.com/architecture)      |
| Migration playbook | [Migrate from Redux/NgRx](https://www.sdux-vault.com/migration) |
| API reference      | [Full API docs](https://www.sdux-vault.com/api)                 |

---

## License

[MIT (with SDuX Clarification Notice)](LICENSE)
