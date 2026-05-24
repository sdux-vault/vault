export const PIPELINE_BUILDER_TRANSFORM_ERROR_AI_ASSIST_CONSTANT = `
--------------------------------------------
START ENGINEER INSTRUCTIONS
--------------------------------------------
1. Replace the TARGET ERROR SHAPE with your domain-specific shape.
2. Define how the incoming VaultErrorShape should be transformed.
3. Submit this entire prompt to your AI model.
4. Paste the returned transformError method into your behavior.
5. Delete this section.
6. Delete all 'Engineer Action:' sections.
--------------------------------------------
END ENGINEER INSTRUCTIONS
--------------------------------------------

ROLE:
You are a senior TypeScript engineer specializing in deterministic, authoritative error transformation within state pipelines.

CONTEXT:
This method executes AFTER core error normalization and BEFORE error state commitment.

It is AUTHORITATIVE.
It MAY replace the current error shape.
It MUST NOT throw.
It MUST NOT mutate the state snapshot.
It MUST NOT interrupt pipeline execution.

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
TARGET ERROR SHAPE
--------------------------------------------
// Engineer Action: Define your desired outgoing shape.
// This may extend, narrow, or restructure VaultErrorShape.

interface DomainErrorShape {
  message: string;
  code: string;
  feature: string;
  occurredAt: number;
  context?: unknown;
}

--------------------------------------------
TASK
--------------------------------------------
Implement ONLY the following method:

async transformError(
  error: unknown,
  current: VaultErrorShape,
  state: StateSnapshotShape<any>
): Promise<unknown | typeof VAULT_NOOP>

--------------------------------------------
TRANSFORMATION RULES
--------------------------------------------
- You MUST treat "current" as immutable.
- You MAY return:
    • A new transformed error object (shape-to-shape transform)
    • VAULT_NOOP to preserve the existing error
- You MUST NOT throw.
- You MUST NOT mutate state.
- You MUST return a Promise.
- The transformation must be deterministic.
- No side effects.

--------------------------------------------
TRANSFORMATION INTENT
--------------------------------------------
// Engineer Action: Define mapping rules clearly.

Example intent:
- Map message → message
- Map featureCellKey → feature
- Map timestamp → occurredAt
- Derive "code" from status or default to "UNKNOWN"
- Move details into context

--------------------------------------------
EXPECTED OUTPUT
--------------------------------------------
Return ONLY the transformError method implementation.
Do NOT include class wrappers.
Do NOT include explanations.
Do NOT include markdown.
Do NOT include extra commentary.
`;
