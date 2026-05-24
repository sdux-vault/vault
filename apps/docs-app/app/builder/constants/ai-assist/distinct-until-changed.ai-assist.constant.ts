export const PIPELINE_BUILDER_DISTINCT_UNTIL_CHANGED_COMPARE_AI_ASSIST_CONSTANT = `
--------------------------------------------
START ENGINEER INSTRUCTIONS
--------------------------------------------
1. Replace the VALUE SHAPE with your real resolved+merged domain model.
2. Delete all but ONE implementation pattern.
3. Define the comparison semantics clearly.
4. Submit this entire prompt to your AI model.
5. Paste the returned TypeScript directly into your project.
6. Delete this section.
7. Delete all 'Engineer Action:' sections
--------------------------------------------
END ENGINEER INSTRUCTIONS
--------------------------------------------

ROLE:
You are a senior TypeScript engineer specializing in pure, deterministic equality comparison functions for distinct-until-changed admission control in state pipelines.

CONTEXT:
This function will execute inside the Operator stage as part of Distinct Until Changed.

It compares the fully resolved + merged pipeline value against the last successfully emitted value.

IMPORTANT:
- Returning true means "values are equivalent" and the operator will suppress the update (VAULT_NOOP).
- Returning false means "values differ" and the pipeline continues.
- The first value always passes through and becomes the baseline for future comparisons.

It is strictly COMPUTATIONAL.
It MUST NOT influence pipeline control beyond returning a boolean.
It MUST NOT mutate either argument.
It MUST NOT throw.

IMPORTANT:
This prompt is part of an automated pipeline builder.
Follow the output rules strictly.

--------------------------------------------
DISTINCT COMPARISON CONTRACT
--------------------------------------------

type DistinctComparison<T> = (a: T, b: T) => boolean;

--------------------------------------------
VALUE SHAPE (RESOLVED + MERGED)
--------------------------------------------
// Engineer Action: Replace with your actual resolved+merged pipeline value shape.
interface Entity {
  id: number;
  name: string;
  isActive: boolean;
}

type PipelineValue = Entity[];

--------------------------------------------
TASK
--------------------------------------------
Generate ONE valid TypeScript distinct comparison function implementation.

This function will be passed to:
withDistinctUntilChanged(compare)

--------------------------------------------
SELECT IMPLEMENTATION PATTERN
--------------------------------------------
// Engineer Action: Delete all but ONE pattern before submitting to AI.

1) Pure Inline Comparison
\`\`\`ts
(a: PipelineValue, b: PipelineValue) => boolean
\`\`\`

2) Exported Pure Function
\`\`\`ts
export function compareDistinct(a: PipelineValue, b: PipelineValue): boolean
\`\`\`

3) Class Instance Arrow Method
\`\`\`ts
compareDistinct = (a: PipelineValue, b: PipelineValue) => boolean
\`\`\`

4) Bound Class Method
\`\`\`ts
compareDistinct(a: PipelineValue, b: PipelineValue): boolean
\`\`\`

--------------------------------------------
REQUIREMENTS
--------------------------------------------
- MUST be pure and deterministic
- MUST NOT mutate a or b
- MUST NOT throw
- MUST NOT read from external mutable state
- MUST return a boolean:
  - true  => treat values as equal (suppress)
  - false => treat values as different (emit)
- SHOULD be stable across key ordering and reference identity differences
- SHOULD handle:
  - empty arrays
  - differing lengths
  - nullish values inside arrays (if applicable)
  - duplicated ids (if applicable)
- MAY implement comparison semantics such as:
  - compare by stable ids only
  - compare by selected fields only
  - compare by normalized ordering (e.g., sort by id before compare)

--------------------------------------------
COMPARISON INTENT
--------------------------------------------
// Engineer Action: Define what "distinct" means for your domain.

When deciding whether to suppress an update:
- Treat two arrays as equal if they contain the same set of entities by id,
  regardless of ordering.
- For entities with the same id, also require name and isActive to match.
- Ignore any unknown extra fields.

--------------------------------------------
EXPECTED OUTPUT
--------------------------------------------
Type: (a: PipelineValue, b: PipelineValue) => boolean

--------------------------------------------
OUTPUT RULES
--------------------------------------------
- Return ONLY valid TypeScript code.
- Do NOT include explanations.
- Do NOT include markdown unless required by the selected pattern.
- Do NOT include extra commentary.
`;
