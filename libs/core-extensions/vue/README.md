Deterministic state management for every framework — one pipeline, zero ambiguity.

<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/readme/sdux-vault.svg" height="200" alt="SDuX Vault" />
</p>

# @sdux-vault/vue

> Vue integration layer for SDuX Vault.

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
  <img src="https://img.shields.io/badge/Vue-3.5+-42B883?logo=vuedotjs&logoColor=white" alt="Vue 3.5+" />
</p>

## What is SDuX Vault?

SDuX Vault is a **framework-agnostic, deterministic state management system** built around a reactive execution pipeline. It replaces the unpredictable sprawl of action/reducer architectures with a single, ordered, traceable pipeline where every transition is explicit and every output is guaranteed.

## What is SDuX Vault Vue?

`@sdux-vault/vue` provides the **Vue bindings for SDuX Vault**, connecting the runtime to Vue through a FeatureCell wrapper that preserves the fluent pipeline API while exposing an explicit `useReactiveState()` composable.

**Features:**

- **Vue-wrapped FeatureCells** — same fluent API as the core runtime
- **Explicit reactive State access** — subscribe with `cell.useReactiveState()`
- **Snapshot-safe imperative access** — keep using `cell.state` outside Vue setup
- **Automatic scope cleanup** — subscriptions end when the consuming Vue scope is disposed

For full documentation, guides, and API references: [sdux-vault.com](https://www.sdux-vault.com)

---

## Example

```typescript
import { FeatureCell } from '@sdux-vault/vue';

export const cartCell = FeatureCell<CartState>({
  key: 'cart',
  initialState: { items: [], total: 0 }
});

cartCell.initialize();
```

```vue
<script setup lang="ts">
import { cartCell } from './cart.cell';

const snapshot = cartCell.useReactiveState();
</script>

<template>
  <h2>Cart ({{ snapshot.value?.items.length ?? 0 }} items)</h2>
  <p>Total: {{ snapshot.value?.total ?? 0 }}</p>
</template>
```

Use `cell.useReactiveState()` inside Vue setup for reactive updates. Use `cell.state` anywhere you need a synchronous snapshot outside a Vue effect scope.

---

## Peer Dependencies

- `vue` >= 3.5
- `rxjs` >= 7

---

## Installation

```bash
npm install @sdux-vault/vue
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
