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

When a finding depends on centralized immutability or orchestration isolation rather than behavior-local cloning, also inspect `libs/shared/src/lib/utils/isolate-value/isolate-value.util.ts` in the `vault` workspace and `lib/src/orchestrator/orchestrator.ts` in the `engine` workspace. Do not assume the isolation guarantee exists. Verify whether incoming stage inputs are cloned before behavior invocation, whether outgoing values are cloned immediately after return, and whether the current `isolateValue` implementation fully isolates the runtime value types used by the behavior. If either supporting file cannot be found or verified, state that explicitly and treat the isolation guarantee as unproven rather than assuming it.

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

Use ➖ N/A only when a category is structurally inapplicable to the behavior type or the behavior does not define the relevant surface. If the category applies and the implementation simply does not use risky constructs such as promises, timers, subscriptions, or mutable resources, score ✅ PASS instead of ➖ N/A.

---

### 1. Security

- No user-controlled or untrusted input is passed unsafely to `eval`, `innerHTML`, `Function()`, or template literals used in execution contexts.
- No plaintext secrets, key material, passphrases, or sensitive state values appear in `vaultDebug`, `vaultWarn`, `console.*`, or error message strings.
- Encryption key material (`CryptoKey`, derived keys, salts) is zeroed or released on `destroy()`.
- Serialized persistence output does not contain unencrypted sensitive data when an encryption behavior is configured upstream.

### 2. Vulnerabilities

- Module-scoped mutable state (`let` variables outside the class) is guarded against uninitialized access.
- Module-scoped mutable state is safe across multiple `provideFeatureCell` registrations (last-write-wins is documented or architecturally acceptable).
- No shared mutable references leak through behavior-owned boundaries such as caches, instance/module state, extension APIs, callback payloads, or consumer-facing return values. Values crossing those boundaries must be cloned (`isolateValue`, spread, or structured clone).
- When a behavior appears to rely on framework-level isolation instead of local cloning, verify that guarantee against the `vault` workspace `isolateValue` utility and the `engine` workspace orchestrator. Raise findings when the orchestrator does not actually clone the relevant inputs/outputs, when a path bypasses cloning, when `isolateValue` is only partial for the runtime types the behavior accepts, or when the supporting files cannot substantiate the guarantee.
- For identifier-based matching, classification should not rely on inherited prototype-chain properties unless that behavior is explicitly intended and documented. Prefer own-property checks for identifier presence.
- When the orchestrator already isolates stage inputs before invocation and isolates stage outputs immediately after return, do not score a behavior as failing solely because it does not add an extra clone at that same pipeline boundary. Still score ❌ FAIL when the behavior mutates its provided inputs, stores borrowed references for later use, or exposes shared references outside the orchestrator's immediate isolation window. Score ⚠️ AT RISK when correctness depends entirely on orchestrator isolation and the behavior would become unsafe if reused outside that pipeline path.
- `installFluentApi` (if present) does not expose internal mutable state on the feature cell surface.

### 3. Error handling (try/catch)

- Every `await` expression that can reject is wrapped in `try/catch` or `.catch()`.
- `firstValueFrom` calls have either a timeout, an `AbortSignal`, or a guaranteed emission path that prevents indefinite hangs (see §5).
- Observable-to-Promise bridges (`new Observable` wrapping `.then()`) propagate rejection via `observer.error()`. A `.then()` without `.catch()` inside `new Observable()` silently hangs subscribers.
- Errors thrown inside `computeResolve`, `computeMerge`, `computeFilter`, `computeReduce`, or `computeOperator` may be thrown as raw errors when the orchestrator catches that stage failure and centrally normalizes or routes it before the error leaves the pipeline. Do not require behavior-local wrapping when that would only duplicate the orchestrator's error path or cause double-wrapping.
- Still score ❌ FAIL when a behavior creates its own async boundary, promise bridge, subscription callback, timer callback, cleanup path, or side-effect wrapper that can reject/throw outside the orchestrator's direct stage `try/catch`, and the behavior does not handle that failure locally.
- Constructor validation throws descriptive errors for missing or invalid configuration.
- Treat runtime option values that are only checked for presence or truthiness, but can later trigger raw implementation errors because type or shape was not validated, as invalid configuration handling rather than a benign omission.

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
- If the behavior defines `installFluentApi`, also verify that the class declares a typed `implements` contract for the installed cell extension surface, such as `BehaviorContract<T, SomeBehaviorExtension<T>>`. The extension interface name is behavior-specific and must not be hardcoded in the review.
- Do not score ❌ FAIL solely because a behavior with `installFluentApi` uses `BehaviorContract<T, SomeBehaviorExtension<T>>` to type its fluent extension surface instead of only a stage-specific contract, provided the decorator `type`, implemented runtime method (`computeMerge`, `computeResolve`, `applyReducer`, etc.), and extension typing all align with the behavior's role.
- `@VaultBehavior` decorator metadata (`type`, `key`, `critical`, `resolveType`, `wantsConfig`, `configKey`) matches the class's runtime property assignments.
- Static readonly properties (`type`, `key`, `critical`) are declared and assigned by the decorator — not manually hardcoded.
- `resolveType` is set only on resolve behaviors and matches a valid `ResolveTypes` value.

### 8. Extension API (installFluentApi / extendCellAPI)

Score ➖ N/A if the behavior has neither `installFluentApi` nor `extendCellAPI`.

- For behaviors that define `installFluentApi` or `extendCellAPI`, verify the support-file layout used by addon extension behaviors:
  - `function/*.function.ts` exists and a colocated `function/*.function.spec.ts` exists.
  - `options/*.options.ts` exists when the behavior accepts configuration through `installFluentApi` or decorator config.
  - `interfaces/*.interface.ts` exists and defines the behavior-specific extension contract.
- `installFluentApi` (if present):
  - Writes a method onto the feature cell that stores configuration in the `behaviorConfigs` map using the correct `configKey`.
  - The installed method returns `this` for fluent chaining.
  - Does not leak internal mutable state onto the cell surface.
  - Does not store caller-owned mutable config objects by reference when a shallow clone would avoid later external mutation of registered behavior config.
  - Matches the `wantsConfig: true` and `configKey` declared in the decorator.
  - The companion `function/*.function.ts` installs a stub for the fluent method and throws a clear "behavior not installed" error until the behavior is registered.
- `extendCellAPI` (if present):
  - Returns a plain object whose methods are the public API surface for the feature cell extension.
  - Subscribes to `ctx.state$` only if needed, and stores the subscription for teardown in `destroy()`.
  - Does not capture stale references to `ctx` beyond the subscription callback.
  - Cache lookups return cloned values (`isolateValue`) — not direct references to internal cache entries.
  - The companion `function/*.function.ts` installs stub methods for the public extension API exposed by `extendCellAPI`, and those stubs throw clear "behavior not installed" errors until the behavior is registered.
  - `interfaces/*.interface.ts` extends `Partial<Record<string, BehaviorExtFunction>>` and includes the dynamic index signature used by repo extension behaviors.
  - `interfaces/*.interface.ts` uses exactly one `declare module '@sdux-vault/shared'` block. That single merged augmentation block must extend `FeatureCellFluentApi` for fluent methods from `installFluentApi` and `FeatureCellExtension` for public APIs returned from `extendCellAPI`, when those surfaces are present.

### 9. Merge behavior purity

Score ➖ N/A if the behavior is not a merge behavior.

- `computeMerge` does not mutate either input (`previous` or `next`).
- Do not score ❌ FAIL solely because `computeMerge` returns one of its input references or preserves nested references in the immediate return value when the orchestrator isolates merge inputs before invocation and clones the merge result before downstream stages/commit.
- Verify that assumption against the `engine` workspace orchestrator and the current cloning semantics in the `vault` workspace `isolateValue` utility. If the merge path does not clone before and after the behavior call for the relevant types, if `isolateValue` only partially isolates those types, or if the supporting files cannot substantiate the guarantee, raise a finding against the behavior-orchestrator safety guarantee rather than treating the boundary as automatically safe.
- Still score ❌ FAIL when `computeMerge` mutates an input in place, mutates a returned object after returning, stores/shared borrowed references in behavior-owned state, or exposes merge-result references through APIs or caches before orchestration isolation can protect them.
- For behaviors that claim deep-merge semantics, deep merge recursion should not share nested object references between input and output in a way that breaks those semantics. If nested aliasing is only made safe by the orchestrator's immediate clone, treat that as at least ⚠️ AT RISK unless the surrounding contract explicitly documents the centralized isolation guarantee.

### 10. Test coverage

- A colocated `.spec.ts` file exists.
- The spec exercises the happy path for the primary compute/extend method.
- The spec exercises at least one error/rejection path.
- `destroy()` and `reset()` are tested for resource cleanup.
- `installFluentApi` (if present) is tested for correct config registration and fluent chaining.
- `extendCellAPI` (if present) is tested for returned API methods.
- For behaviors that define `installFluentApi` or `extendCellAPI`, the companion `function/*.function.spec.ts` verifies that the stub extension methods are attached and that uninstalled calls fail with clear behavior-specific error messages.
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
