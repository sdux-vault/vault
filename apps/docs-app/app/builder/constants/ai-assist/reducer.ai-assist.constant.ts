export const PIPELINE_BUILDER_REDUCER_AI_ASSIST_CONSTANT = `
--------------------------------------------
START ENGINEER INSTRUCTIONS
--------------------------------------------
1. Replace the STATE SHAPE with your real domain state model.
2. Delete all but ONE implementation pattern.
3. Define the reducer behavior clearly.
4. Submit this entire prompt to your AI model.
5. Paste the returned TypeScript directly into your project.
6. Delete this section.
7. Delete all 'Engineer Action:' sections
--------------------------------------------
END ENGINEER INSTRUCTIONS
--------------------------------------------

ROLE:
You are a senior TypeScript engineer specializing in pure, deterministic, structurally-safe reducers for state pipelines.

CONTEXT:
This function will execute during the Reducer stage and receives the current immutable state snapshot.

Reducers are the ONLY pipeline stage permitted to derive the next committed state value.
Reducers MUST be pure and side-effect free.
Reducers MUST NOT mutate the incoming state.
Reducers MUST return the next state value with the same structural type and shape contract.

IMPORTANT:
- If a reducer throws, the error propagates as a Vault error and terminates the current pipeline execution.
- Therefore, reducers MUST NOT throw and should defensively avoid unsafe assumptions.

IMPORTANT:
This prompt is part of an automated pipeline builder.
Follow the output rules strictly.

--------------------------------------------
TASK
--------------------------------------------
Generate ONE valid TypeScript reducer implementation using the selected pattern below.

--------------------------------------------
STATE SHAPE (CURRENT STATE)
--------------------------------------------
// Engineer Action: Replace with your actual state shape.
interface Entity {
  id: number;
  name: string;
  isActive: boolean;
}

type StateValue = Entity[];

--------------------------------------------
REDUCER CONTRACT
--------------------------------------------

type ReducerFunction<T> = (current: T) => T;

--------------------------------------------
SELECT IMPLEMENTATION PATTERN
--------------------------------------------
// Engineer Action: Delete all but ONE pattern before submitting to AI.

1) Pure Inline Reducer
\`\`\`ts
(current: StateValue) => StateValue
\`\`\`

2) Exported Pure Function
\`\`\`ts
export function reduceState(current: StateValue): StateValue
\`\`\`

3) Class Instance Arrow Method (Instance-scoped, still pure)
\`\`\`ts
reduceState = (current: StateValue) => StateValue
\`\`\`

4) Bound Class Method (Instance-scoped, still pure)
\`\`\`ts
reduceState(current: StateValue): StateValue
\`\`\`

--------------------------------------------
REQUIREMENTS
--------------------------------------------
- MUST be pure and side-effect free
- MUST NOT mutate the incoming state value
- MUST NOT throw
- MUST return a value of the same structural type as input
  - arrays must return arrays
  - objects must return objects
  - primitives must retain their primitive type
- MUST NOT perform I/O, logging, telemetry, timers, or async work
- MUST remain isolated from external mutable state
- MUST treat the input as immutable and authoritative

--------------------------------------------
REDUCER EXECUTION CONTEXT
--------------------------------------------
- Reducers execute after Operators and Filters.
- Reducers execute in initialization order.
- Reducers derive the next committed state value (or return current when no change is needed).
- Reducers do not control pipeline flow and do not emit snapshots directly.

--------------------------------------------
REDUCER INTENT
--------------------------------------------
// Engineer Action: Define what the reducer should do.

When reducing state:
- Ensure the state is normalized (e.g., stable sorting by id)
- Optionally remove invalid entities (e.g., missing id/name) WITHOUT mutating originals
- Optionally enforce invariants (e.g., unique ids) deterministically
- If no changes are needed, return the original state reference

--------------------------------------------
EXPECTED OUTPUT
--------------------------------------------
Type: StateValue

--------------------------------------------
OUTPUT RULES
--------------------------------------------
- Return ONLY valid TypeScript code.
- Do NOT include explanations.
- Do NOT include markdown unless required by the selected pattern.
- Do NOT include extra commentary.
`;
