export const PIPELINE_BUILDER_TAP_AI_ASSIST_CONSTANT = `
--------------------------------------------
START ENGINEER INSTRUCTIONS
--------------------------------------------
1. Replace the VALUE SHAPE with your real resolved/merged pipeline value.
2. Delete all but ONE implementation pattern.
3. Define the tap behavior clearly.
4. Submit this entire prompt to your AI model.
5. Paste the returned TypeScript directly into your project.
6. Delete this section.
7. Delete all 'Engineer Action:' sections
--------------------------------------------
END ENGINEER INSTRUCTIONS
--------------------------------------------

ROLE:
You are a senior TypeScript engineer specializing in deterministic, isolated, observational tap callbacks for state pipelines.

CONTEXT:
This function will execute during the Tap stage and receives the current immutable pipeline value.

Tap callbacks are observational side-effect hooks.
They MUST NOT influence pipeline control.
They MUST NOT mutate the value.
They MUST NOT return a value.

IMPORTANT:
- Tap callbacks MAY perform side effects (logging, telemetry, remote reporting).
- If a tap throws, the error propagates as a Vault error and terminates the current pipeline execution.
- Therefore, tap callbacks MUST NOT throw and should defensively contain all failures.

IMPORTANT:
This prompt is part of an automated pipeline builder.
Follow the output rules strictly.

--------------------------------------------
TASK
--------------------------------------------
Generate ONE valid TypeScript tap callback implementation using the selected pattern below.

--------------------------------------------
VALUE SHAPE (PIPELINE VALUE)
--------------------------------------------
// Engineer Action: Replace with your actual pipeline value shape.
interface Entity {
  id: number;
  name: string;
  isActive: boolean;
}

type PipelineValue = Entity[];

--------------------------------------------
TAP CALLBACK CONTRACT
--------------------------------------------

type TapCallback<T> = (value: T) => void;

--------------------------------------------
SELECT IMPLEMENTATION PATTERN
--------------------------------------------
// Engineer Action: Delete all but ONE pattern before submitting to AI.

1) Pure Inline Callback
\`\`\`ts
(value: PipelineValue) => void
\`\`\`

2) Exported Pure Function
\`\`\`ts
export function onTap(value: PipelineValue): void
\`\`\`

3) Class Instance Arrow Method
\`\`\`ts
onTap = (value: PipelineValue) => void
\`\`\`

4) Bound Class Method
\`\`\`ts
onTap(value: PipelineValue): void
\`\`\`

--------------------------------------------
REQUIREMENTS
--------------------------------------------
- MUST NOT mutate the pipeline value
- MUST NOT throw
- MUST NOT return a value
- MUST NOT resume or alter pipeline execution
- MAY perform logging or telemetry
- MAY perform async side effects (e.g., remote logging) but MUST NOT block pipeline progress
- MUST remain isolated from external mutable state
- MUST treat the value as immutable and authoritative

--------------------------------------------
TAP EXECUTION CONTEXT
--------------------------------------------
- Tap callbacks execute with the current pipeline value at a precise tap boundary.
- Tap callbacks run in initialization order.
- Tap callbacks are not reducers and must not derive or replace values.
- Any error thrown would be promoted to a Vault error and terminate the run, so failure must be contained.

--------------------------------------------
CALLBACK INTENT
--------------------------------------------
// Engineer Action: Define what the tap should do.

When a pipeline value is tapped:
- Log a concise summary of the value (e.g., length, ids)
- Log a small sample (e.g., first item) when present
- Optionally send a non-blocking telemetry event
- Never log sensitive fields (if any exist)

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
