---
name: reviewBehavior
agent: agent
description: 'Deep review of a single VaultBehavior class. Evaluates security, hang risks, race conditions, lifecycle safety, contract compliance, and extension correctness against a fixed rubric.'
inputs:
  - id: behavior
    type: text
    description: 'Behavior file name or path (e.g., with-state-cache.behavior.ts or libs/addons/src/lib/behaviors/entity-access/cache/state-cache/with-state-cache.behavior.ts)'
---

# Behavior Review — `{{ behavior }}`

Perform a focused, evidence-based review of the VaultBehavior class in `{{ behavior }}`.

If a relative name is provided (e.g., `with-state-cache.behavior.ts`), search for the file under:

- `libs/addons/src/lib/behaviors/`
- `libs/core/src/lib/behaviors/`
- `libs/core-extensions/angular/src/lib/behaviors/`

Read the behavior file AND its colocated `.spec.ts` file before starting the review.

When the review is complete, write the full output as a markdown file to `ai-tasks/<behavior-name>.review.md`, where `<behavior-name>` is the behavior file name without the `.ts` extension (e.g., `with-state-cache.behavior` → `ai-tasks/with-state-cache.behavior.review.md`).

After creating the file, respond with exactly:

1. The review is finished.
2. Created file: `ai-tasks/<behavior-name>.review.md`

---

## Rubric

Score every category as one of:

| Grade      | Meaning                                               |
| ---------- | ----------------------------------------------------- |
| ✅ PASS    | Fully correct — no issues found                       |
| ⚠️ AT RISK | Potential issue, edge case, or unclear guarantee      |
| ❌ FAIL    | Confirmed bug, missing implementation, or design flaw |
| ➖ N/A     | Category does not apply to this behavior type         |

Every non-PASS finding must include: **file path**, **method/line**, **explanation**, and a **code snippet** if helpful.

---

### 1. Security

- No user-controlled or untrusted input is passed unsafely to `eval`, `innerHTML`, `Function()`, or template literals used in execution contexts.
- No plaintext secrets, key material, passphrases, or sensitive state values appear in `vaultDebug`, `vaultWarn`, `console.*`, or error message strings.
- Encryption key material (`CryptoKey`, derived keys, salts) is zeroed or released on `destroy()`.
- Serialized persistence output does not contain unencrypted sensitive data when an encryption behavior is configured upstream.

### 2. Vulnerabilities

- Module-scoped mutable state (`let` variables outside the class) is guarded against uninitialized access.
- Module-scoped mutable state is safe across multiple `provideFeatureCell` registrations (last-write-wins is documented or architecturally acceptable).
- No shared mutable references leak between pipeline stages, cache entries, or consumer-facing return values. Values crossing boundaries must be cloned (`isolateValue`, spread, or structured clone).
- `installFluentApi` (if present) does not expose internal mutable state on the feature cell surface.

### 3. Error handling (try/catch)

- Every `await` expression that can reject is wrapped in `try/catch` or `.catch()`.
- `firstValueFrom` calls have either a timeout, an `AbortSignal`, or a guaranteed emission path that prevents indefinite hangs (see §5).
- Observable-to-Promise bridges (`new Observable` wrapping `.then()`) propagate rejection via `observer.error()`. A `.then()` without `.catch()` inside `new Observable()` silently hangs subscribers.
- Errors thrown inside `computeResolve`, `computeMerge`, `computeFilter`, `computeReduce`, or `computeOperator` are wrapped with `createVaultError` before propagation.
- Constructor validation throws descriptive errors for missing or invalid configuration.

### 4. Race conditions

- No reliance on mutable instance state across `await` boundaries where a concurrent call could mutate the state between suspension and resumption.
- Concurrent lookups/fetches for the same key do not produce duplicate pipeline merges or orphaned pending entries.
- `race()` or `Promise.race()` usage handles the case where the losing observable/promise is properly unsubscribed/ignored.
- Singleton or module-scoped mutable state is not written concurrently by multiple behavior instances without synchronization.

### 5. Code hangs

- Every `firstValueFrom` call has a guaranteed emission path. If all source signals can remain at their initial filtered-out values indefinitely, the promise hangs forever.
- Every `new Promise` constructor either resolves, rejects, or has a timeout. No promise can remain pending indefinitely.
- Pending fan-out maps (resolver/rejecter arrays) are drained on `destroy()`, `reset()`, AND error paths — not just the happy path.
- Subscription callbacks that gate promise resolution cannot be silently unsubscribed before resolving.

### 6. Lifecycle (destroy / reset)

- `destroy()` releases ALL acquired resources: subscriptions (`unsubscribe()`), timers (`clearInterval`/`clearTimeout`), pending maps, cache entries, and event listeners.
- `reset()` clears transient state (caches, pending maps, refreshing flags) without releasing long-lived resources (subscriptions stay active for re-use).
- Lifecycle methods perform the operations their JSDoc and log messages claim. A `vaultWarn('clearing cache')` followed by a noop body is a bug.
- If a resource is acquired in `constructor` or `extendCellAPI`, it has a corresponding release in `destroy`.
- Symmetry: every `subscribe()` has an `unsubscribe()`, every `setInterval()` has a `clearInterval()`.

### 7. Contract compliance

- The class `implements` the correct contract interface for its `BehaviorType`:
  - Resolve → `ResolveBehaviorContract`
  - Merge → `MergeBehaviorContract`
  - Filter → `FilterBehaviorContract`
  - Reduce → `ReduceBehaviorContract`
  - Operator → `OperatorBehaviorContract`
  - Extension → `BehaviorContract` with `extendCellAPI`
  - Interceptor → `InterceptorBehaviorContract`
  - CoreState/CoreError/CoreEmitState → their respective contracts
  - Tap → `BeforeTapBehaviorContract` or `AfterTapBehaviorContract`
- `@VaultBehavior` decorator metadata (`type`, `key`, `critical`, `resolveType`, `wantsConfig`, `configKey`) matches the class's runtime property assignments.
- Static readonly properties (`type`, `key`, `critical`) are declared and assigned by the decorator — not manually hardcoded.
- `resolveType` is set only on resolve behaviors and matches a valid `ResolveTypes` value.

### 8. Extension API (installFluentApi / extendCellAPI)

Score ➖ N/A if the behavior has neither `installFluentApi` nor `extendCellAPI`.

- `installFluentApi` (if present):
  - Writes a method onto the feature cell that stores configuration in the `behaviorConfigs` map using the correct `configKey`.
  - The installed method returns `this` for fluent chaining.
  - Does not leak internal mutable state onto the cell surface.
  - Matches the `wantsConfig: true` and `configKey` declared in the decorator.
- `extendCellAPI` (if present):
  - Returns a plain object whose methods are the public API surface for the feature cell extension.
  - Subscribes to `ctx.state$` only if needed, and stores the subscription for teardown in `destroy()`.
  - Does not capture stale references to `ctx` beyond the subscription callback.
  - Cache lookups return cloned values (`isolateValue`) — not direct references to internal cache entries.

### 9. Merge behavior purity

Score ➖ N/A if the behavior is not a merge behavior.

- `computeMerge` does not mutate either input (`previous` or `next`).
- The return value is a new reference — not a modified input.
- Deep merge recursion does not share nested object references between input and output (shallow spread of nested objects is insufficient for deep merges).

### 10. Test coverage

- A colocated `.spec.ts` file exists.
- The spec exercises the happy path for the primary compute/extend method.
- The spec exercises at least one error/rejection path.
- `destroy()` and `reset()` are tested for resource cleanup.
- `installFluentApi` (if present) is tested for correct config registration and fluent chaining.
- `extendCellAPI` (if present) is tested for returned API methods.
- Edge cases specific to the behavior type are covered (e.g., concurrent lookups for cache, empty arrays for merge, skipped inputs for resolve).

---

## Output format

### Summary

| Field              | Value                               |
| ------------------ | ----------------------------------- |
| **Behavior**       | `{{ behavior }}`                    |
| **Type**           | _(BehaviorType from decorator)_     |
| **Contract**       | _(interface implemented)_           |
| **Overall Health** | Excellent / Good / Risky / Critical |
| **PASS**           | _count_                             |
| **AT RISK**        | _count_                             |
| **FAIL**           | _count_                             |
| **N/A**            | _count_                             |

### Rubric Results

| #   | Category            | Grade | Findings |
| --- | ------------------- | ----- | -------- |
| 1   | Security            |       |          |
| 2   | Vulnerabilities     |       |          |
| 3   | Error handling      |       |          |
| 4   | Race conditions     |       |          |
| 5   | Code hangs          |       |          |
| 6   | Lifecycle           |       |          |
| 7   | Contract compliance |       |          |
| 8   | Extension API       |       |          |
| 9   | Merge purity        |       |          |
| 10  | Test coverage       |       |          |

### Critical Issues

List any ❌ FAIL findings with full context, root cause, and suggested fix.

### Risk Areas

List any ⚠️ AT RISK findings with explanation and mitigation options.

### Recommendations

Specific, actionable fixes with file paths. No generic advice.
