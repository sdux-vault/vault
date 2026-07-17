Deterministic state management for every framework — one pipeline, zero ambiguity.

<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/readme/sdux-vault.svg" height="200" alt="SDuX Vault" />
</p>

# @sdux-vault/svelte

> Svelte integration layer for SDuX Vault.

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
  <img src="https://img.shields.io/badge/Svelte-5.7+-FF3E00?logo=svelte&logoColor=white" alt="Svelte 5.7+" />
</p>

## What is SDuX Vault?

SDuX Vault is a **framework-agnostic, deterministic state management system** built around a reactive execution pipeline. It replaces the unpredictable sprawl of action/reducer architectures with a single, ordered, traceable pipeline where every transition is explicit and every output is guaranteed.

## What is SDuX Vault Svelte?

`@sdux-vault/svelte` provides the **Svelte bindings for SDuX Vault**, connecting the runtime to Svelte through a FeatureCell wrapper that preserves the fluent pipeline API while making the existing `state` Snapshot getter reactive inside Svelte effects.

**Features:**

- **Svelte-wrapped FeatureCells** — same fluent API as the core runtime
- **Reactive Snapshot access** — consume `cell.state` with Svelte runes or template rendering
- **Snapshot-safe imperative access** — keep reading `cell.state` synchronously outside Svelte reactivity
- **Automatic effect cleanup** — State subscriptions follow the consuming Svelte effect lifecycle

For full documentation, guides, and API references: [sdux-vault.com](https://www.sdux-vault.com)

---

## Example

```typescript
import { FeatureCell } from '@sdux-vault/svelte';

export const cartCell = FeatureCell<CartState>({
  key: 'cart',
  initialState: { items: [], total: 0 }
});

cartCell.initialize();
```

```svelte
<script lang="ts">
  import { cartCell } from './cart.cell';

  let snapshot = $derived(cartCell.state);
</script>

<h2>Cart ({snapshot.value?.items.length ?? 0} items)</h2>
<p>Total: {snapshot.value?.total ?? 0}</p>
```

Read `cell.state` inside `$derived`, `$effect`, or template rendering for reactive updates. Read the same property anywhere outside Svelte reactivity for the latest synchronous Snapshot.

---

## Peer Dependencies

- `svelte` >= 5.7
- `rxjs` >= 7

---

## Installation

```bash
npm install @sdux-vault/svelte
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
