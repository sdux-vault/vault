export const PIPELINE_BUILDER_ERROR_EMIT_AI_ASSIST_CONSTANT = `
--------------------------------------------
START ENGINEER INSTRUCTIONS
--------------------------------------------
1. Replace the STATE SHAPE with your real domain model.
2. Delete all but ONE implementation pattern.
3. Define the callback behavior clearly.
4. Submit this entire prompt to your AI model.
5. Paste the returned TypeScript directly into your project.
6. Delete this section.
7. Delete all 'Engineer Action:' sections
--------------------------------------------
END ENGINEER INSTRUCTIONS 
--------------------------------------------

ROLE:
You are a senior TypeScript engineer specializing in deterministic, isolated, observational error callbacks for state pipelines.

CONTEXT:
This function will execute AFTER an error has been fully normalized, transformed, and committed to state.

It is strictly OBSERVATIONAL.
It MUST NOT influence pipeline control.
It MUST NOT mutate error or state.
It MUST NOT throw.

IMPORTANT:
This prompt is part of an automated pipeline builder.
Follow the output rules strictly.

--------------------------------------------
INCOMING ERROR SHAPE
--------------------------------------------

interface VaultErrorShape {
  message: string;
  featureCellKey: string;
  timestamp: number;
  raw: unknown;
  status?: number;
  statusText?: string;
  details?: unknown;
}

--------------------------------------------
STATE SNAPSHOT (READ-ONLY)
--------------------------------------------

interface StateSnapshotShape<T> {
  isLoading: boolean;
  value: T | undefined;
  error: VaultErrorShape | null;
  hasValue: boolean;
}

--------------------------------------------
STATE SHAPE
--------------------------------------------
// Engineer Action: Replace with your actual state shape.
interface Entity {
  id: number;
  name: string;
  isActive: boolean;
}

--------------------------------------------
TASK
--------------------------------------------
Generate ONE valid TypeScript error callback implementation using the selected pattern below.

--------------------------------------------
SELECT IMPLEMENTATION PATTERN
--------------------------------------------
// Engineer Action: Delete all but ONE pattern before submitting to AI.

1) Pure Inline Callback
\`\`\`ts
(error: VaultErrorShape, state: StateSnapshotShape<Entity[]>) => void
\`\`\`

2) Exported Pure Function
\`\`\`ts
export function onError(error: VaultErrorShape, state: StateSnapshotShape<Entity[]>): void
\`\`\`

3) Class Instance Arrow Method
\`\`\`ts
onError = (error: VaultErrorShape, state: StateSnapshotShape<Entity[]>) => void
\`\`\`

4) Bound Class Method
\`\`\`ts
onError(error: VaultErrorShape, state: StateSnapshotShape<Entity[]>): void
\`\`\`

--------------------------------------------
REQUIREMENTS
--------------------------------------------
- MUST NOT mutate the error
- MUST NOT mutate the state snapshot
- MUST NOT throw
- MUST NOT resume or alter pipeline execution
- MAY perform logging or telemetry
- MAY perform async side effects (e.g., remote logging)
- MUST remain isolated from external mutable state
- MUST treat both error and state as immutable snapshots

--------------------------------------------
ERROR HANDLING CONTEXT
--------------------------------------------
The callback executes AFTER:

1) Core Error Normalization
2) Error Transform Behaviors
3) Error State Commitment
4) .state.error exposure
5) .state$ emission
6) Global Error Service publication

This callback is strictly observational.

--------------------------------------------
CALLBACK INTENT
--------------------------------------------
// Engineer Action: Define what the callback should do.

When an error occurs:
- Log the error message
- Log the featureCellKey
- Log the last known state value

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
