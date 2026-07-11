---
name: add-docs
agent: agent
description: 'Use when users ask to add or update source-level JSDoc for a file (/addDocs).'
---

Generate or update JSDoc comments in the target TypeScript file.

Goals:

- If no file path is provided, use the active editor file.
- Add or update source-level JSDoc comments only.
- Follow `.github/prompts/sdux-docs.prompt.md` exactly.
- Preserve existing code style and formatting.

Constraints:

- Modify code only by inserting or updating JSDoc blocks.
- Do not change runtime behavior, imports, symbol names, logic, or file structure.
- Do not create tests as part of this workflow.
- Do not add non-JSDoc comments.

Pattern discovery and consistency requirements:

- Before writing JSDoc, inspect similar local files to align documentation tone, phrasing, and block style with established repository precedent.
- Apply precedent broadly across documentation style decisions without copying unrelated symbol content.
- If no strong local precedent exists, use `.github/prompts/sdux-docs.prompt.md` as the canonical fallback.

Required checks before output:

- Every declared symbol in scope remains documented.
- Every `#private` field and `#private` method in scope has its own JSDoc block.
- @param tags match current parameter names and order.
- @returns tags match current return contracts where applicable.
- Deprecated symbols contain valid @deprecated reason text.

Output:

- Return only updated source code for the target file.
- Do not include explanations, acknowledgments, or summaries.
