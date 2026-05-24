export const PIPELINE_BUILDER_FILTER_AI_ASSIST_CONSTANT = `
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
You are a senior TypeScript engineer specializing in deterministic, pure data filtering functions for state pipelines.

CONTEXT:
This function will execute inside a deterministic state pipeline.
It MUST remain pure, predictable, and side-effect free.
It MUST NOT mutate input.
It MUST preserve structural type.

IMPORTANT:
This prompt is part of an automated pipeline builder.
Follow the output rules strictly.

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
Generate ONE valid TypeScript filter implementation using the selected pattern below.

--------------------------------------------
SELECT IMPLEMENTATION PATTERN
--------------------------------------------
// Engineer Action: Delete all but ONE pattern before submitting to AI.

1) Pure Inline Filter Function
\`\`\`ts
(value: Entity[]) => Entity[] | undefined
\`\`\`

2) Exported Pure Function
\`\`\`ts
export function filterEntities(value: Entity[]): Entity[] | undefined
\`\`\`

3) Class Instance Arrow Method
\`\`\`ts
filterEntities = (value: Entity[]): Entity[] | undefined
\`\`\`

4) Bound Class Method
\`\`\`ts
filterEntities(value: Entity[]): Entity[] | undefined
\`\`\`

--------------------------------------------
REQUIREMENTS
--------------------------------------------
- MUST NOT mutate the input array
- MUST preserve structural type (Entity[] → Entity[])
- MAY return \`undefined\` to suppress update
- MUST be deterministic
- MUST NOT perform side effects
- MUST NOT use external mutable state

--------------------------------------------
FILTER CRITERIA
--------------------------------------------
// Engineer Action: Define the filtering logic clearly.
Return only entities where:
- isActive === true

--------------------------------------------
EXPECTED OUTPUT
--------------------------------------------
Type: Entity[] | undefined

--------------------------------------------
OUTPUT RULES
--------------------------------------------
- Return ONLY valid TypeScript code.
- Do NOT include explanations.
- Do NOT include markdown unless required by the selected pattern.
- Do NOT include extra commentary.
`;
