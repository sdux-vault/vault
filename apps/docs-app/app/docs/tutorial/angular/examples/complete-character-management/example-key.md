# Example Key

| Feature                                    | Id     | In Ts | In Html | In Tutorial |
| ------------------------------------------ | ------ | ----- | ------- | ----------- |
| Collection Selection                       | ex-001 |       | ✅      | ✅          |
| Minimal Read-Only FeatureCell              | ex-002 | ✅    | ✅      | ✅          |
| CRUD Foundation feedback                   | ex-003 |       | ✅      | ✅          |
| Errors                                     | ex-004 | ✅    | ✅      | ✅          |
| Destroy                                    | ex-005 | ✅    | ✅      | ✅          |
| Delete                                     | ex-006 | ✅    | ✅      | ✅          |
| CRUD Foundation                            | ex-007 | ✅    | ✅      | ✅          |
| isLoading                                  | ex-008 | ✅    | ✅      | ✅          |
| Create                                     | ex-009 | ✅    | ✅      | ✅          |
| Create / Update                            | ex-010 | ✅    | ✅ ✅   | ✅          |
| Global Error                               | ex-011 | ✅    | ✅      | ✅          |
| Initial State                              | ex-012 | ✅    | ✅      | ✅          |
| Raw StateSnapshot                          | ex-013 | ✅    | ✅      | ✅          |
| Raw StateSnapshot$                         | ex-014 | ✅    | ✅      | ✅          |
| Filter                                     | ex-016 | ✅    | ✅      | ✅          |
| Reducer 1                                  | ex-017 | ✅    | ✅      | ✅          |
| Reducer 2                                  | ex-018 | ✅    | ✅      | ✅          |
| Reducer 3                                  | ex-019 | ✅    | ✅      | ✅          |
| Persist Null                               | ex-020 | ✅    | ✅      | ✅          |
| Reset                                      | ex-021 | ✅    | ✅      | ✅          |
| Restore                                    | ex-022 | ✅    | ✅      | ✅          |
| Hydration                                  | ex-023 | ✅    | ✅      | ✅          |
| Promise                                    | ex-024 | ✅    | ✅      | ✅          |
| Observable                                 | ex-025 | ✅    | ✅      | ✅          |
| HTTP Resource                              | ex-026 | ✅    | ✅      | ✅          |
| Distinct Until Changed                     | ex-027 | ✅    | ✅      | ✅          |
| Distinct Until Changed comparison function | ex-028 | ✅    | ✅      | ✅          |
| Tab Sync                                   | ex-029 | ✅    | ✅      | ✅          |
| Before Taps                                | ex-031 | ✅    | ✅      | ✅          |
| After Taps                                 | ex-032 | ✅    | ✅      | ✅          |
| Delay                                      | ex-033 | ✅    | ✅      | ✅          |
| Encryption & Persist                       | ex-034 | ✅    | ✅      | ✅          |
| State Emission                             | ex-035 | ✅    | ✅      | ✅          |
| Error Emission                             | ex-036 | ✅    | ✅      | ✅          |
| Stepwise Resolve                           | ex-038 | ✅    | ✅      | ✅          |
| Stepwise Filter                            | ex-039 | ✅    | ✅      | ✅          |
| Stepwise Reducer                           | ex-040 | ✅    | ✅      | ✅          |

## Proposed Teaching Order

### Foundation ✅

1. `ex-012` Initial State
2. `ex-002` Minimal Read-Only FeatureCell
3. `ex-001` Collection Selection
4. `ex-003` CRUD Foundation feedback

### CRUD Core ✅

5. `ex-009` Create
6. `ex-010` Create / Update
7. `ex-006` Delete
8. `ex-007` CRUD Foundation

### Lifecycle ✅

9. `ex-020` Persist Null
10. `ex-021` Reset
11. `ex-005` Destroy
12. `ex-022` Restore

### Pipeline Shaping ✅

13. `ex-016` Filter
14. `ex-017` Reducer 1
15. `ex-018` Reducer 2
16. `ex-019` Reducer 3

### Error Handling ✅

17. `ex-004` Errors
18. `ex-011` Global Error
19. `ex-036` Error Emission

### Async Input Styles ✅

20. `ex-023` Hydration and isLoading
21. `ex-024` Promise
22. `ex-025` Observable
23. `ex-026` HTTP Resource

### Timing and Persistence ✅

24. `ex-033` Delay
25. `ex-034` Encryption & Persist

### State Introspection ✅

26. `ex-013` Raw StateSnapshot
27. `ex-014` Raw StateSnapshot$
28. `ex-031` Before Taps
29. `ex-032` After Taps
30. `ex-035` State Emission

### Reactive Change Control ✅

31. `ex-027` Distinct Until Changed
32. `ex-028` Distinct Until Changed comparison function
33. `ex-029` Tab Sync

### Stepwise Pipeline ✅

34. `ex-038` Stepwise Resolve
35. `ex-039` Stepwise Filter
36. `ex-040` Stepwise Reducer

```markdown
## Recommendation

Do not add a new numbered “teaching” step to every chapter. That would add 14 interruptions, distort the numbered build sequence, and repeat context the tutorial shell and chapter headers already partly provide.

Instead, add a compact, visually consistent, unnumbered **“Before you build” chapter preface** immediately before each chapter’s first numbered step. It should take 20–45 seconds to scan:

- **Outcome:** what capability the reader gains.
- **Why now:** the product moment that makes it useful.
- **When to use it:** two or three recognizable scenarios.
- **Trade-off / boundary:** what SDuX solves and what it deliberately does not solve.
- **Prerequisite:** which completed tutorial state this assumes.
- **Optional visual:** one relevant diagram link or a 2–5 minute video only when it materially improves the mental model.

The existing tutorial-level introduction, business use case, chapter-break copy, and pipeline video are good foundations. The missing layer is chapter-local decision support: “Is this feature for my problem, and what tension does it remove?” Most files begin directly with configuration or API mechanics.

No chapter currently embeds a video. The video page offers six broad architecture videos; those should be linked selectively, not embedded repeatedly. The diagrams catalogue is much better suited to chapter-local orientation.

## Chapter-by-chapter recommendations

| Chapter                                  | Recommended initial preface                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Best visual support                                                                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Display Character / Foundation**    | “Build a feature whose state is owned outside the component.” Explain the pain of components becoming a mix of fetch logic, mutable state, rendering, and lifecycle cleanup. Use cases: a detail panel, profile summary, selected-record view. State the boundary plainly: service owns Feature State; component owns presentation and temporary interaction state. Add a short “what you will have after Step 10” preview.                                                             | Optional **Pipeline Overview** video for newcomers; **Simplified Flow** and **FeatureCell Initialization Flow** diagrams.                                        |
| **2. Display Characters / Multi-Select** | “Add interaction without moving ownership.” Explain why selected ID is local UI state while the collection remains feature state. Use cases: master/detail, product picker, account switcher. Address the common tension: storing every UI selection globally creates unnecessary coupling; keeping managed data in the component creates duplicated ownership.                                                                                                                         | **State Flow** diagram, with a concise caption distinguishing selection from committed collection state.                                                         |
| **3. Add/Edit Characters**               | “Choose merge semantics before implementing create.” Start from the product problem: a create operation must preserve existing records, while an edit must target one record predictably. Explain that `mergeState()` is not inherently “add”; its configured merge behavior determines that. Include an explicit warning that append merge is appropriate for this collection-create flow, not as a universal default.                                                                 | **Merge State Flow** and **Replace State Flow** diagrams.                                                                                                        |
| **4. Delete Characters**                 | “Make destructive changes explicit, confirmable, and state-safe.” Use cases: remove a saved item, revoke an assignment, delete a draft. Explain the SDuX value in terms of a single managed write path, not as a claim that SDuX provides confirmation UI. The component owns confirmation; the service owns the committed mutation.                                                                                                                                                    | **Mutation Flow** diagram.                                                                                                                                       |
| **5. Lifecycle**                         | “Distinguish clearing data from ending a feature.” This is a highly valuable conceptual chapter: explain logout, account switching, abandoning a workflow, and teardown as separate product events. Lead with the difference among intentional `null`, `reset()`, and `destroy()`, before API details.                                                                                                                                                                                  | **FeatureCell Lifecycle** diagram.                                                                                                                               |
| **6. Filters and Reducers**              | “Centralize cross-view data rules once.” Start with the pain: filtering, sorting, labels, and derived display strings spread across templates and components eventually disagree. Use cases: eligibility filtering, normalized display fields, role-based presentation, sorted lists. Clarify that filters shape candidates and reducers derive state—they are not general-purpose business-workflow engines.                                                                           | **Filter Behavior** and **Reducer Behavior** diagrams; link rather than embed both.                                                                              |
| **7. Errors**                            | “Keep the reason for failure separate from how the UI communicates it.” The chapter already teaches this well once it starts. Surface it first: a cleared banner does not repair a still-invalid pipeline condition. Use cases: validation, unavailable dependencies, authorization failures, observability. Add a caution that deliberately throwing in a filter is a teaching mechanism, not the recommended model for ordinary validation.                                           | **Error Flow** and, optionally, **Global Error Pause Flow**.                                                                                                     |
| **8. Async Input**                       | “Treat initial and later asynchronous values as pipeline inputs, not component-managed side paths.” Use cases: restore persisted state, load an entity, receive live data, accept a user-triggered promise. Explain the payoff: one lifecycle and one transformation/error path regardless of input type. Give readers a decision guide: hydrate for startup restoration; promise for one result; observable/stream for ongoing values; HTTP resource for Angular resource integration. | **Resolve Processing** plus one input-specific diagram at each relevant step: `fromDeferred`, `fromPromise`, `fromObservable`, or `fromStream`.                  |
| **9. Delay**                             | “Control when an accepted update proceeds, without changing the update.” The existing first step contains good use cases; elevate them into a decision point. Distinguish delay from debounce, throttle, loading simulation, and animation. Readers need to know that delay queues every attempt rather than reducing work.                                                                                                                                                             | **Delay Controller Flow**.                                                                                                                                       |
| **10. Encrypt and Persist**              | “Persist browser data only when the user value and threat model justify it.” Begin with real use cases: restore a non-sensitive preference, keep a local workspace, retain data across refreshes. Then set an important boundary: encryption is not a complete browser-security strategy; key management, XSS exposure, storage lifetime, and session versus durable storage still matter. Also explain why encrypt must precede persist.                                               | **Encrypt Lifecycle** and **Persist Lifecycle**. This chapter merits a short, focused video only if one is created specifically for storage/security boundaries. |
| **11. State Introspection**              | “Observe a pipeline without turning observation into control.” Explain debugging, diagnostics, telemetry, and test instrumentation as the use cases. The pain relieved is scattershot logging and unclear differences among a candidate, transformed value, committed state, and emission. Introduce the chapter’s observation vocabulary before its seven APIs.                                                                                                                        | **State Flow**, **Before Tap Stage**, and **After Tap Stage**; one compact comparison visual would be more useful than three separate embeds.                    |
| **12. Tab Sync**                         | “Keep the same feature coherent across tabs on one browser origin.” Use cases: preferences, drafts, cart-like state, admin tools. Explicitly say when not to use it: server-authoritative collaboration, cross-device synchronization, conflict-heavy document editing, or sensitive state without a storage/security design. The strongest tension here is stale parallel tabs—not generic “sync.”                                                                                     | **Tab Sync Behavior Flow** and **Tab Sync Controller Flow**.                                                                                                     |
| **13. Distinct Until Changed**           | “Suppress semantically redundant updates when repeated inputs are normal.” Use cases: repeated selection events, polling results, duplicated upstream emissions, expensive downstream derivation. Explain the trade-off: a comparator defines what “same” means; an overly broad comparator can suppress a meaningful update. The current identity-comparison example needs this product-level framing.                                                                                 | **Operator Flow**.                                                                                                                                               |
| **14. Stepwise**                         | “Put an explicit human or policy decision at a pipeline boundary.” Use cases: approval before publish, confirmation after derived validation, policy review, staged onboarding. Clearly differentiate it from a normal confirmation modal: stepwise controls whether a candidate may continue; it is not simply UI decoration. Explain the cost up front—paused requests and product responsibility for resolving them.                                                                 | **Stepwise Controller Flow** plus only the stage-specific diagram relevant to the current step.                                                                  |

## What else is missing

The tutorial’s greatest reader-experience gap is not more prose; it is **navigation by intent**.

Add a small capability map near the tutorial introduction:

| Reader goal                            | Chapters |
| -------------------------------------- | -------- |
| Build CRUD feature state               | 1–7      |
| Receive or control asynchronous work   | 8, 9, 14 |
| Make state durable or shared           | 10, 12   |
| Diagnose or optimize pipeline behavior | 11, 13   |

This lets experienced readers enter intentionally rather than feeling obliged to absorb every advanced behavior in sequence.

Also add these lightweight elements to each chapter preface:

- **“You should use this when…”** — maximum three bullets.
- **“Not needed when…”** — one honest boundary. This builds trust and prevents feature cargo-culting.
- **“Assumes…”** — a link to the prior state or a completed-example shortcut.
- **“Success looks like…”** — one observable result, before the reader touches code.

Avoid adding a generic SDuX pain-point list to every chapter. The tutorial already repeats “service-owned FeatureCell” heavily. Repetition should become progressively shorter: establish the ownership model deeply in Chapter 1, then refer back to it in one sentence where it matters. Spend the saved space on the chapter-specific decision, risk, and use case.

Finally, I would not embed existing general videos in every chapter. Keep the current optional tutorial-level Pipeline Overview video; add contextual links to the existing video/diagram pages. Create new chapter-specific videos only for concepts where motion or time is essential: **async input, delay, tab sync, and stepwise**.
```
