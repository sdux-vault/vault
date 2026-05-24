export const PIPELINE_BUILDER_STATE_EMIT_AI_ASSIST_CONSTANT = `
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
You are a senior TypeScript engineer specializing in deterministic, isolated, observational state emission callbacks for state pipelines.

CONTEXT:
This function will execute AFTER a state snapshot has been fully committed and exposed.

It is strictly OBSERVATIONAL.
It MUST NOT influence pipeline control.
It MUST NOT mutate the snapshot.
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
Generate ONE valid TypeScript emit-state callback implementation using the selected pattern below.

--------------------------------------------
SELECT IMPLEMENTATION PATTERN
--------------------------------------------
// Engineer Action: Delete all but ONE pattern before submitting to AI.

1) Pure Inline Callback
\`\`\`ts
(snapshot: StateSnapshotShape<Entity[]>) => void
\`\`\`

2) Exported Pure Function
\`\`\`ts
export function onStateEmit(snapshot: StateSnapshotShape<Entity[]>): void
\`\`\`

3) Class Instance Arrow Method
\`\`\`ts
onStateEmit = (snapshot: StateSnapshotShape<Entity[]>) => void
\`\`\`

4) Bound Class Method
\`\`\`ts
onStateEmit(snapshot: StateSnapshotShape<Entity[]>): void
\`\`\`

--------------------------------------------
REQUIREMENTS
--------------------------------------------
- MUST NOT mutate the state snapshot
- MUST NOT throw
- MUST NOT resume or alter pipeline execution
- MAY perform logging or telemetry
- MAY perform async side effects (e.g., remote logging)
- MUST remain isolated from external mutable state
- MUST treat the snapshot as immutable and authoritative

--------------------------------------------
STATE EMISSION CONTEXT
--------------------------------------------
The callback executes AFTER:

1) Core State Behavior (state commitment)
2) .state synchronous exposure
3) .state$ reactive emission
4) Then emit-state callbacks execute

This callback is strictly observational.

--------------------------------------------
CALLBACK INTENT
--------------------------------------------
// Engineer Action: Define what the callback should do.

When a state snapshot is emitted:
- Log isLoading
- Log hasValue
- Log the current value
- Log the error field (if present)

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
