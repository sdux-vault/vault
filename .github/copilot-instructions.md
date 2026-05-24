**CRITICAL GUARDRAILS:**

- AI models are NEVER allowed to autonomously commit or push to git repositories. The user must always review changes and execute git operations manually via terminal commands.
- AI models are NEVER allowed to install npm packages without explicit user authorization.

SCSS and HTML styling guardrails (standing rules):

- When working with `.scss` files, style tokens and shared styling primitives must come from `libs/ui/styles/scss/**`.
- Do not introduce raw presentation values directly in feature/component `.scss` files (for example: padding, margin, color, font-family, font-size, font-weight, line-height, border radius, spacing values). Use references from `libs/ui/styles/scss/**` instead.
- `.scss` selectors must be written in nested form to mirror the HTML structure whenever practical.
- Inline CSS in HTML is prohibited (`style="..."` is not allowed).
- In HTML templates, all `<button>` elements must include an explicit `type` attribute (`button`, `submit`, or `reset`).
- Icon-only interactive controls (including Angular Material icon buttons) must include an accessible name via `aria-label`.
- In HTML templates, `[innerHTML]` is allowed only for trusted, non-user-generated content. Add a short comment when the trust source is not obvious from nearby code.
- Dynamic style bindings (`[style]`, `[style.*]`, `[ngStyle]`) are allowed only for runtime layout/positioning values that cannot be represented by class toggles alone.
- Documentation HTML examples may include intentionally non-compliant markup only when shown as escaped, non-executable sample code inside `<pre><code>` blocks under docs/example paths. This exemption does not apply to live template markup.
- In component `.scss` files, do not use `::ng-deep` by default. It is allowed only for unavoidable third-party overrides and must include a short exception comment describing why it is required.
- In component `.scss` files, do not use `!important` by default. It is allowed only for unavoidable third-party overrides and must include a short exception comment describing why it is required.
- Responsive breakpoints in component `.scss` files must come from centralized breakpoint tokens/mixins in `libs/ui/styles/scss/**` (no raw `px` breakpoint values).
- Layering in component `.scss` files must use centralized z-index tokens from `libs/ui/styles/scss/**` (no ad-hoc numeric z-index values).
- SCSS modules must use `@use`; do not introduce `@import` in `.scss` files.
- CSS/SCSS class names must be hyphenated (kebab-case). Do not use `__` (double underscore) in class names or SCSS variable names.
- Documentation/demo SCSS examples may be exempt from strict production styling guardrails only when they are clearly scoped to docs/example paths and labeled as non-production styles.

Repository baseline defaults for this repository:

- Primary source language is TypeScript; prefer `.ts` for new source files unless explicitly requested otherwise.
- Existing JavaScript entrypoints and scripts are valid; do not migrate JS to TS unless explicitly requested.
- Documentation standard is JSDoc on all declared symbols (see `.github/prompts/sdux-docs.prompt.md` for the full canon).
- Testing standard is Jest with colocated `*.spec.ts` files.
- Use repository npm scripts as canonical commands for lint, typecheck, docs, build, and test.
- Maintain strict typing; avoid `any` and `unknown` unless explicitly requested.
- If instructions conflict with older docs, prioritize `package.json` scripts and current project config.

Prompt routing policy:

- Keep this file focused on repository guardrails, coding defaults, and shortcut routing.
- Prefer dedicated prompt files under `.github/prompts/` for task-specific procedures.
- Prompt files in `.github/prompts/` in this repository take precedence over identically named prompt files in the user's global prompts folder (`~/Library/Application Support/Code/User/prompts/`).
- When both exist, always follow the repository-local version.
- Treat all text after a recognized shortcut as the workflow payload unless the shortcut behavior says otherwise.
- If a workflow references a canon/rules prompt instead of a dedicated task prompt, follow that canon and keep behavior constrained to the stated workflow.
