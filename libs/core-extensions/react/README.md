Deterministic state management for every framework — one pipeline, zero ambiguity.

<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/readme/sdux-vault.svg" height="200" alt="SDuX Vault" />
</p>

# @sdux-vault/react

> React integration layer for SDuX Vault.

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
  <img src="https://img.shields.io/badge/React-19+-61DAFB?logo=react&logoColor=black" alt="React 19+" />
</p>

## What is SDuX Vault?

SDuX Vault is a **framework-agnostic, deterministic state management system** built around a reactive execution pipeline. It replaces the unpredictable sprawl of action/reducer architectures with a single, ordered, traceable pipeline where every transition is explicit and every output is guaranteed.

## What is SDuX Vault React?

`@sdux-vault/react` provides the **React bindings for SDuX Vault**, connecting the runtime to React through a FeatureCell wrapper that preserves the fluent pipeline API while exposing an explicit `useSyncExternalStore()` render-time subscription method.

**Features:**

- **React-wrapped FeatureCells** — same fluent API as the core runtime
- **Explicit render-time state access** — subscribe with `cell.useSyncExternalStore()`
- **Snapshot-safe imperative access** — keep using `cell.state` outside render
- **Reactive UI updates** — built on React's `useSyncExternalStore` contract

For full documentation, guides, and API references: [sdux-vault.dev](https://www.sdux-vault.dev)

---

## Example

```typescript
const cartCell = FeatureCell<CartState>({
  key: 'cart',
  initialState: { items: [], total: 0 }
});

cartCell.initialize();

function CartView() {
  const snapshot = cartCell.useSyncExternalStore();

  return (
    <>
      <h2>Cart ({snapshot.value?.items.length ?? 0} items)</h2>
      <p>Total: {snapshot.value?.total ?? 0}</p>
    </>
  );
}
```

Use `cell.useSyncExternalStore()` during render for reactive React updates. Use `cell.state` anywhere you need a synchronous snapshot outside render.

---

## Peer Dependencies

- `react` >= 19
- `rxjs` >= 7

---

## Installation

```bash
npm install @sdux-vault/react
```

---

## Ecosystem

| Package                                                                      | Purpose                                   |
| ---------------------------------------------------------------------------- | ----------------------------------------- |
| [`@sdux-vault/shared`](https://www.npmjs.com/package/@sdux-vault/shared)     | Contracts, types, utilities               |
| [`@sdux-vault/engine`](https://www.npmjs.com/package/@sdux-vault/engine)     | Orchestration, conductor, decision engine |
| [`@sdux-vault/core`](https://www.npmjs.com/package/@sdux-vault/core)         | Behavior runtime and pipeline execution   |
| [`@sdux-vault/addons`](https://www.npmjs.com/package/@sdux-vault/addons)     | Optional runtime policies and controllers |
| [`@sdux-vault/devtools`](https://www.npmjs.com/package/@sdux-vault/devtools) | Observability and debugging               |

---

## License

[MIT (with SDuX Clarification Notice)](https://www.sdux-vault.com/docs/welcome/license#license-texts) © SDuX Vault
