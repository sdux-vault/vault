Deterministic state management for angular — one pipeline, zero ambiguity.

<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/brand-landscape.svg" height="80" alt="SDuX Vault" />
</p>

<h3 align="center">Plain TypeScript. Zero Magic.</h3>

# @sdux-vault/angular

> Angular integration layer for SDuX Vault.

<p align="center">
  <a href="https://www.sdux-vault.com"><strong>Docs</strong></a> ·
  <a href="https://www.sdux-vault.com/stackblitz"><strong>Live Examples</strong></a> ·
  <a href="https://www.sdux-vault.com/builder"><strong>Pipeline Builder</strong></a> ·
  <a href="https://github.com/sdux-vault/vault/issues"><strong>Issues</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-first-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Angular-21+-DD0031?logo=angular&logoColor=white" alt="Angular 21+" />
</p>

## What is SDuX Vault?

SDuX Vault is a **framework-agnostic, deterministic state management system** built around a reactive execution pipeline. It replaces the unpredictable sprawl of action/reducer architectures with a single, ordered, traceable pipeline where every transition is explicit and every output is guaranteed.

## What is SDuX Vault Angular?

`@sdux-vault/angular` provides the **Angular bindings for SDuX Vault**, connecting the runtime to Angular's dependency injection, signals, and reactive model in a framework-native way.

**Features:**

- **Angular bindings for FeatureCells** — injectable, DI-compatible services
- **Signal-based state access** — always up-to-date, reactive by default
- **DI-compatible providers** — register and consume via Angular's injector
- **Reactive state consumption** — automatic UI updates, no manual subscriptions

For full documentation, guides, and API references: [sdux-vault.com](https://www.sdux-vault.com)

---

## Example

```typescript
@Component({
  selector: 'app-cart',
  template: `
    <h2>Cart ({{ cartState().items.length }} items)</h2>
    <p>Total: {{ cartState().total | currency }}</p>
  `
})
export class CartComponent {
  private readonly cartCell = inject(CartFeatureCell);
  readonly cartState = this.cartCell.state;
}
```

State is exposed as Angular signals — no manual subscriptions, no memory leaks, consistent reactivity across templates and computed properties.

---

## Peer Dependencies

- `@angular/core` >= 21
- `rxjs` >= 7

---

## Installation

```bash
npm install @sdux-vault/angular
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
