# @sdux-vault/testing-utils

> Testing utilities, mocks, and environment helpers for the SDuX platform.

`@sdux-vault/testing-utils` provides **tools for validating, simulating, and controlling SDuX behavior in test environments**.  
It enables reliable testing of controllers, behaviors, and runtime flows across the SDuX ecosystem.

---

## TL;DR

For full documentation, guides, and API references: [sdux-vault.dev](https://www.sdux-vault.dev)

---

## Overview

SDuX is built as a layered system:

```plaintext
shared → core → core-extensions → apps
           └────────────────────→ devtools
```

- **shared** → contracts, types, utilities
- **core** → runtime engine and orchestration
- **core-extensions** → framework integrations (Angular, React, etc.)
- **apps** → end-user applications
- **devtools** → end-user tooling

---

## What This Package Provides

- **Testing utilities** — helpers for asserting behavior and state
- **Mocking tools** — simulate controllers, behaviors, and flows
- **Environment controls** — deterministic test setup and teardown
- **Execution helpers** — drive and observe runtime interactions
- **Test-safe abstractions** — isolate side effects and runtime dependencies

---

## Key Characteristics

- Framework-agnostic TypeScript
- Deterministic and test-safe
- Designed for composable testing patterns
- Minimal runtime footprint
- Integrates cleanly with SDuX core and shared contracts

---

## Installation

```bash
npm install @sdux-vault/testing-utils
```

---

## Usage

### Basic Import

```ts
import { createTestHarness } from '@sdux-vault/testing-utils';
```

---

### Example: Test Setup

```ts
import { createTestHarness } from '@sdux-vault/testing-utils';

const harness = createTestHarness();

const result = await harness.run(controller, input);

expect(result).toEqual(expected);
```

---

### Example: Mocking Behavior

```ts
import { mockBehavior } from '@sdux-vault/testing-utils';

const behavior = mockBehavior({
  execute: () => 'mocked'
});
```

---

## Public API Structure

### Designed for Testing

- deterministic outputs
- isolated execution
- no hidden side effects

---

### Integration with Core

This package works alongside:

```plaintext
@sdux-vault/shared
@sdux-vault/core
```

It enables:

- testing controllers and behaviors
- validating execution flows
- simulating runtime environments

---

## Environment Utilities

```ts
import { setTestEnv, resetTestEnv } from '@sdux-vault/testing-utils';
```

Provides:

- explicit test environment control
- predictable runtime conditions
- isolation between test runs

---

## Utilities

The `testing-utils` domain includes:

- test harnesses
- mocks and stubs
- execution helpers
- assertion helpers

All utilities are:

- deterministic
- side-effect controlled
- safe for parallel test execution

---

## Side Effects

This package avoids runtime side effects.

Any environment configuration:

- is explicit
- is reversible
- is scoped to tests

---

## Development

### Build

```bash
npm run build:testing-utils
```

Output:

```plaintext
dist/testing-utils
```

---

### Test

```bash
npm run test:testing-utils
```

---

### Verify

```bash
npm run verify
```

Includes:

- linting
- formatting
- type checking
- tests

---

## Publishing

See [RELEASE.md](./RELEASE.md) for full publishing instructions.

---

## Ecosystem

- `@sdux-vault/shared` — contracts, types, and utilities ([README](../shared/README.md))
- `@sdux-vault/core` — execution engine for pipelines and state orchestration ([README](../core/README.md))
- `@sdux-vault/core-extensions/*` — framework integrations ([README](../core-extensions/angular/README.md))
- `@sdux-vault/devtools` — observability and debugging ([README](../devtools/tooling/README.md))
- `@sdux-vault/testing-utils` — testing utilities (this package)

---

## License

For full licensing details:  
https://www.sdux-vault.com/docs/welcome/license#license-texts

MIT © SDuX Vault
