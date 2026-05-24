<p align="center">
  <img src="https://raw.githubusercontent.com/sdux-vault/vault/main/apps/docs-app/assets/brand/sdux/brand-landscape.svg" height="80" alt="SDuX Vault" />
</p>

# @sdux-vault/core-extensions/angular

> Angular integration layer for SDuX Vault.

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  <img src="https://img.shields.io/badge/TypeScript-first-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Angular-21+-DD0031?logo=angular&logoColor=white" alt="Angular 21+" />
</p>

---

`@sdux-vault/core-extensions/angular` provides the **Angular bindings for SDuX Vault**, connecting the runtime to Angular's dependency injection, signals, and reactive model in a framework-native way.

For full documentation, guides, and API references: [sdux-vault.com](https://www.sdux-vault.com)

---

## Overview

```plaintext
shared → engine → core → core-extensions → apps
                              ↑
                        angular (this package)
```

This package adapts SDuX runtime state into Angular's reactive model:

```plaintext
SDuX pipeline → Angular signal → component / template
```

---

## What This Package Provides

- **Angular bindings for FeatureCells** — injectable, DI-compatible services
- **Signal-based state access** — always up-to-date, reactive by default
- **DI-compatible providers** — register and consume via Angular's injector
- **Reactive state consumption** — automatic UI updates, no manual subscriptions

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

| Package                                                                                      | Purpose                                   |
| -------------------------------------------------------------------------------------------- | ----------------------------------------- |
| [`@sdux-vault/shared`](https://www.npmjs.com/package/@sdux-vault/shared)                     | Contracts, types, utilities               |
| [`@sdux-vault/engine`](https://www.npmjs.com/package/@sdux-vault/engine)                     | Orchestration, conductor, decision engine |
| [`@sdux-vault/core`](https://www.npmjs.com/package/@sdux-vault/core)                         | Behavior runtime and pipeline execution   |
| [`@sdux-vault/addons`](https://www.npmjs.com/package/@sdux-vault/addons)                     | Optional runtime policies and controllers |
| [`@sdux-vault/devtools-tooling`](https://www.npmjs.com/package/@sdux-vault/devtools-tooling) | Observability and debugging               |

---

## License

[MIT (with SDuX Clarification Notice)](https://www.sdux-vault.com/docs/welcome/license#license-texts) © SDuX Vault
