export const PIPELINE_BUILDER_STEPWISE_AI_ASSIST_CONSTANT = `
--------------------------------------------
START ENGINEER INSTRUCTIONS
--------------------------------------------
1. Replace the STATE SHAPE with your real domain state model.
2. Delete all but ONE implementation pattern.
3. Define the stepwise policy behavior clearly.
4. Submit this entire prompt to your AI model.
5. Paste the returned TypeScript directly into your project.
6. Delete this section.
7. Delete all 'Engineer Action:' sections.
--------------------------------------------
END ENGINEER INSTRUCTIONS
--------------------------------------------

ROLE:
You are a senior TypeScript engineer specializing in deterministic, policy-only Stepwise functions for state pipelines.

CONTEXT:
This function executes during the Stepwise Filter stage, immediately after a filtered candidate value is produced.

Stepwise Filter functions:
- DO NOT derive values
- DO NOT mutate state
- DO NOT return a value
- MUST emit exactly ONE decision:
  - decisions.continue()
  - decisions.block()
  - decisions.clear()

Stepwise functions are policy-only execution gates.

IMPORTANT:
- If the function throws, the error propagates as a Vault error and terminates the update.
- If the function fails to emit exactly one decision, pipeline execution deadlocks.
- The function MUST be pure and deterministic.

IMPORTANT:
This prompt is part of an automated pipeline builder.
Follow the output rules strictly.

--------------------------------------------
TASK
--------------------------------------------
Generate ONE valid TypeScript Stepwise Filter implementation using the selected pattern below.

--------------------------------------------
STATE SHAPE (CURRENT + CANDIDATE)
--------------------------------------------
// Engineer Action: Replace with your actual state shape.
interface Entity {
  id: number;
  name: string;
  isActive: boolean;
}

type StateValue = Entity[];

--------------------------------------------
STEPWISE CONTRACT
--------------------------------------------

type StepwiseFunction<T> = (
  current: T | undefined,
  candidate: T,
  decisions: {
    continue: () => void;
    block: () => void;
    clear: () => void;
  }
) => void;

--------------------------------------------
SELECT IMPLEMENTATION PATTERN
--------------------------------------------
// Engineer Action: Delete all but ONE pattern before submitting to AI.

1) Pure Inline Stepwise Function
\`\`\`ts
(current: StateValue | undefined, candidate: StateValue, decisions) => void
\`\`\`

2) Exported Pure Function
\`\`\`ts
export function stepwisePolicy(
  current: StateValue | undefined,
  candidate: StateValue,
  decisions
): void
\`\`\`

3) Class Instance Arrow Method (Instance-scoped, still pure)
\`\`\`ts
stepwisePolicy = (
  current: StateValue | undefined,
  candidate: StateValue,
  decisions
) => void
\`\`\`

4) Bound Class Method (Instance-scoped, still pure)
\`\`\`ts
stepwisePolicy(
  current: StateValue | undefined,
  candidate: StateValue,
  decisions
): void
\`\`\`

--------------------------------------------
REQUIREMENTS
--------------------------------------------
- MUST be pure and side-effect free
- MUST NOT mutate current or candidate
- MUST NOT throw
- MUST emit EXACTLY ONE decision
- MUST NOT return a value
- MUST NOT perform I/O, logging, telemetry, timers, or async work
- MUST remain isolated from external mutable state
- MUST treat inputs as immutable read-only snapshots
- MUST deterministically choose continue(), block(), or clear()

--------------------------------------------
STEPWISE EXECUTION CONTEXT
--------------------------------------------
- Executes after Filters.
- Executes before Reducers.
- Controls whether the candidate proceeds, is suppressed, or clears state.
- Does NOT derive state.
- Does NOT emit snapshots.
- Does NOT control reducer ordering.

--------------------------------------------
STEPWISE INTENT
--------------------------------------------
// Engineer Action: Define the policy rule.

When evaluating candidate updates:
- Optionally block empty updates
- Optionally clear state when a hard violation occurs
- Otherwise allow valid candidates to continue
- Must always emit exactly one decision

--------------------------------------------
EXPECTED OUTPUT
--------------------------------------------
Type: void

--------------------------------------------
OUTPUT RULES
--------------------------------------------
- Return ONLY valid TypeScript code.
- Do NOT include explanations.
- Do NOT include markdown unless required by the selected pattern.
- Do NOT include extra commentary.
`;
