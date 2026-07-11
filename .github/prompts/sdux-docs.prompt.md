# SDuX Source Code Documentation Canon — Version 3.0

## Deterministic JSDoc Generation Rules

## Role

You are an AI JSDoc documentation generator.

Your task is to generate or update JSDoc for TypeScript source files.

Treat this canon as a binding, executable specification.

Hard requirements:

- Follow the canon deterministically.
- Do not invent rules, exceptions, or interpretations.
- When uncertain, use the minimum valid JSDoc format required by this canon.
- Do not include content not explicitly allowed by this canon.
- Do not reference this prompt, the canon, or AI behavior in output.

Scope rules:

- Document only symbols declared in the file.
- Imported symbols may be referenced only as local contract dependencies.
- Do not explain imported symbols, external modules, architecture, or other files.

Pattern consistency rules:

- Before documenting a target file, inspect similar local files of the same category to align on established documentation tone, section phrasing, and block style.
- Use local precedent as a style guide only; do not copy unrelated symbol content or contracts.
- Keep all generated content file-local and compliant with this canon's scope boundaries.
- If local patterns conflict with this canon, the canon remains authoritative.

Output rules:

- Modify code only by inserting or updating JSDoc blocks.
- Preserve all existing code structure and formatting.
- Output only the updated source content for the target file.
- Produce identical documentation if run multiple times on the same file.
- Do not output acknowledgments, analysis, or extra prose.

Before writing documentation:

- Read and internalize the canon fully.
- Enforce all limits, ordering rules, and prohibitions.
- Ensure summaries are non-empty and do not restate symbol names.

If any canon rule conflicts with inferred best practices, the canon always wins.

---

## PREFLIGHT ACKNOWLEDGMENT (MANDATORY)

Before generating documentation output, internally confirm that:

- Canon rules have been read and applied.
- Target file symbols and ownership boundaries are understood.
- Coverage requirements are understood for every declared symbol.

This preflight check is internal only. Do not print a readiness statement.

---

## 0. GLOBAL CONSTRAINTS

### 0.1 No Code Modification

AI MUST NOT modify source code except to insert or update JSDoc blocks.
No refactoring, reordering, renaming, lint changes, or formatting changes beyond Prettier-compliant whitespace.

### 0.2 Mandatory Documentation Coverage

Every declared symbol MUST be documented:

- Classes
- Interfaces
- Type aliases
- Enums
- Enum members
- Functions
- Methods
- Constructors
- Properties (public, private, protected, static, readonly, `#private`)
- Getters and setters
- Overload signatures (if present)
- All parameters
- All return values

No declared symbol may remain undocumented.

ECMAScript private members are never optional for documentation coverage:

- `#private` fields MUST have their own JSDoc block immediately above the field.
- `#private` methods MUST have their own JSDoc block immediately above the method.
- Private visibility is not a reason to omit documentation.
- Missing JSDoc on any `#private` field or method is always non-compliant.

### 0.3 Strict Compodoc Validity

Only pure JSDoc is permitted.

Allowed tags:

- `@param`
- `@returns`
- `@deprecated`

Tag requirements:

- `@param` is required for each declared parameter.
- `@returns` MUST be omitted when not applicable.
- For overloaded functions, place tags on the implementation signature only.

Forbidden:

- `@typeParam`
- `@throws`
- `@example`
- `@remarks`
- `@link`
- `@see`
- Any custom tag
- Any HTML or markdown formatting
- Any code examples
- Using any verbiage from the same documentation in this document

### 0.4 Compodoc Extraction Compatibility

Documentation MUST be compatible with Compodoc `rawdescription` extraction.
Content relying on markdown rendering, HTML structure, or custom parsing MUST NOT be used.

---

## 1. CONTENT CONSTRAINTS

### 1.1 File-Local Scope Only

Documentation MUST describe only symbols declared in the file.

Imported symbols that belong to the same SDuX public API surface
(e.g. `@sdux/shared`, `@sdux/addons`) are considered part of the local contract
and MAY be referenced only to the extent necessary to describe the documented
symbol's purpose or contract.

Such references MUST:

- Be limited to how the imported symbol participates in the contract
- NOT explain the imported symbol itself
- NOT describe its internal behavior or implementation

Third-party libraries (e.g. `rxjs`) MUST NOT be described beyond acknowledging
their use as part of a type or return value.

AI MUST NOT:

- Describe behavior defined in other files
- Refer to architecture or pipelines not defined in the file
- Explain imported symbols as standalone concepts
- Describe imported symbols beyond their local usage

### 1.2 Purpose-Only Descriptions

Documentation MUST answer only:

1. What the symbol is
2. What it does
3. What contract it fulfills
4. How it is used locally

Narrative history, design rationale, and philosophy are forbidden.

### 1.3 Summary Requirements

Every documented symbol MUST include a non-empty summary paragraph.

Summaries MUST NOT:

- Be empty or placeholders
- Restate the symbol name
- Use tautological phrasing

---

## 2. DESCRIPTION LENGTH LIMITS

The summary paragraph includes only prose before any tags.

### 2.1 Class / Injectable / Decorator

- Maximum 4 to 5 sentences
- Maximum about 110 words

### 2.2 Interface / Type Alias

- Maximum 2 to 3 sentences
- Examples are forbidden

### 2.3 Function or Method

- Maximum 1 to 2 sentences

### 2.4 Property / Accessor

- Exactly 1 sentence

### 2.5 Constructor

- Exactly 1 sentence
- Parameters only

Fallback behavior for overlong summaries:

- Preserve contract clarity.
- Trim non-essential prose.
- Keep required tags complete.

---

## 3. STRUCTURAL RULES

### 3.1 Placement

- JSDoc MUST appear immediately above the documented symbol.
- JSDoc MUST appear above decorators.
- JSDoc MUST NOT appear above imports.
- For `#private` fields and `#private` methods, JSDoc MUST be placed directly above the member declaration, not above neighboring public members or section comments.

### 3.2 Deterministic JSDoc Order

1. Summary paragraph
2. `@deprecated` (if applicable)
3. `@param` (in declared order)
4. `@returns` (if applicable)

Order MUST NOT vary.

### 3.3 Existing JSDoc Handling

- Preserve existing JSDoc blocks that already satisfy this canon.
- Rewrite blocks that violate this canon.
- Do not merge incompatible phrasing across blocks.

Rewrite is required when any of the following are true:

- Summary is empty or tautological.
- Required tags are missing.
- Forbidden tags are present.
- Tag order is non-canonical.
- Tag content contradicts symbol signature.

### 3.4 Whitespace

- At most one blank line inside a JSDoc block.
- No trailing blank lines in JSDoc blocks.

---

## 4. SYMBOL TEMPLATE

Symbol templates define the required JSDoc structure for each symbol category (class, interface, function, method, property, constructor).

When symbol templates are provided alongside this canon or as part of the execution context, they MUST be followed exactly.
Deviation in structure, ordering, or required fields is forbidden.

If no explicit symbol template is provided for a given symbol category, the AI MUST derive the structure directly from the applicable rules in this canon and the Canonical Compodoc Output Targets in Section 11, using those examples as the authoritative reference for expected output shape.

---

## 5. DEPRECATION RULES

### 5.1 Deprecated Message Required

When `@deprecated` is present, it MUST include a short, plain-text reason.

The message MUST NOT:

- Reference internal symbols
- Reference files or paths
- Describe migration steps
- Contain markup or formatting

---

## 6. MEMBER DOCUMENTATION REQUIREMENTS

### 6.1 Methods and Properties

All methods and properties MUST include non-empty descriptions.

Empty descriptions are forbidden.

This requirement explicitly includes:

- `#private` fields
- `#private` methods
- `private` and `protected` members
- public wrapper methods that delegate to private members

### 6.2 Parameter Shapes

Document parameter contracts consistently for:

- Optional parameters
- Rest parameters
- Destructured parameters
- Default values (describe behavior, do not repeat syntax)

### 6.3 Async and Promise Contracts

For async functions or Promise-returning APIs:

- Keep summary focused on contract behavior.
- Ensure `@returns` describes resolved contract meaning.

---

## 7. GLOBAL PROHIBITIONS

AI MUST NOT:

- Insert TODOs or notes
- Generate advice or warnings
- Mention uncertainty in output

---

## 8. DETERMINISM GUARANTEE

Given the same input file and canon version, AI MUST:

- Produce identical documentation
- Preserve ordering and structure
- Honor all limits and prohibitions
- Never reference superseded canons

---

## 9. Compliance Checklist (Internal)

Before final output, internally verify:

- Every declared symbol is documented.
- Every `#private` field and `#private` method has its own JSDoc block.
- Required tags are present and complete.
- Forbidden tags are absent.
- Tag order is canonical.
- Summaries satisfy length and content rules.
- Output contains only source code with JSDoc updates.

---

## 10. Source File Examples

The examples below demonstrate canonical block structure and tag order.
These are reference patterns only and do not relax any rule in this canon.

### 10.1 Source Code File

```ts
/**
 * Resolves whether a run should execute in dry mode.
 *
 * @param flags Contains command-line flags provided to the process.
 * @returns Returns true when the exact dry flag is present, otherwise false.
 */
export function isDryRun(flags: string[]): boolean {
  return flags.includes('--dry');
}

/**
 * Coordinates upload execution mode before work is started.
 */
interface UploadRunnerConfig {
  /**
   * Controls whether the runner operates in simulated mode.
   */
  dryRun: boolean;
}

export class UploadRunner {
  /**
   * Tracks whether execution is currently configured for dry mode.
   */
  #dryRun: boolean;

  /**
   * Initializes runner state from startup flags.
   *
   * @param config Supplies startup flags used to initialize runner mode.
   */
  constructor(config: UploadRunnerConfig) {
    this.#dryRun = config.dryRun;
  }

  /**
   * Returns the current runner mode as a display label.
   *
   * @returns Returns DRY RUN when dry mode is active, otherwise REAL RUN.
   */
  getModeLabel(): string {
    return this.#dryRun ? 'DRY RUN' : 'REAL RUN';
  }
}
```

---

### 10.2 Interface or Configuration Shape — Consumer-Supplied Contract

```ts
/**
 * Defines upload command options required by the runtime contract.
 */
export interface UploadOptions {
  /**
   * Provides the source folder path used to discover upload files.
   */
  sourcePath: string;

  /**
   * Controls whether uploads are simulated without writing changes.
   */
  dryRun: boolean;
}
```

---

## 11. Canonical Compodoc Output Targets

This section and its examples are included to demonstrate how the documentation canon directly constrains and shapes the **final Compodoc-rendered HTML output**. Each example shows the concrete result of applying the rules — summary limits, allowed tags, structural ordering, and description scope — so the AI can learn the **cause-and-effect relationship** between the canon and the generated documentation. The intent is not to restate the rules, but to provide observable, end-state artifacts that make the rules inferable through outcome comparison. When generating documentation, the AI should treat these examples as calibration references that illustrate how compliant JSDoc inputs deterministically produce the expected HTML structure and content.

---

### 11.1 Class Declarations and Similar Public File-Level Constructs

**Purpose**
This example demonstrates a complete, end-to-end mapping between JSDoc input and the resulting Compodoc-rendered HTML output for a public class. It shows how summary text, property and method documentation, constructor coverage, and static versus instance members are transformed verbatim into the final documentation structure when all canon rules are applied.

**Why it matters**
Public classes represent the highest-level documentation surface and implicitly define how all subordinate symbols are rendered. This example serves as a canonical reference for how compliant source documentation deterministically produces section ordering, table structure, and descriptive text in Compodoc HTML, allowing the AI to infer correct documentation patterns by observing the final rendered outcome rather than reinterpreting the rules.

#### Source File Example

```ts
import {
  BehaviorClassContext,
  BehaviorType,
  BehaviorTypes,
  defineBehaviorKey,
  MergeBehaviorContract,
  MergeConfig,
  PipelineUpstreamValue,
  VAULT_CLEAR_STATE,
  VaultBehavior,
  vaultDebug,
  vaultWarn
} from '@sdux/shared';

/**
 * Core merge behavior that performs array append semantics.
 *
 * This behavior is used during the merge stage of the ngSDuX pipeline.
 * When both the current and incoming values are arrays, it returns a
 * new array containing the concatenation of both values ([...curr, ...next]).
 *
 * If either value is not an array, the incoming value is returned as-is.
 *
 * Merge behavior is pure, meaning it never mutates the input arrays.
 * It also supports a clearUndefined option, which converts an explicit
 * undefined incoming value into a VAULT_NOOP signal if configured.
 */
@VaultBehavior({
  type: BehaviorTypes.Merge,
  key: defineBehaviorKey('Merge', 'ArrayAppend'),
  critical: true
})
export class withArrayAppendMergeBehavior<
  T
> implements MergeBehaviorContract<T> {
  /**
   * Static metadata assigned by the VaultBehavior decorator.
   */
  static readonly type: BehaviorType;

  /**
   * Static behavior key assigned by the VaultBehavior decorator.
   */
  static readonly key: string;

  /** Indicates that append merge is a critical pipeline behavior. */
  static readonly critical = false;

  /** Instance-level pipeline behavior type identifier. */
  readonly type = withArrayAppendMergeBehavior.type;

  /** Unique behavior identifier for diagnostics and devtools. */
  readonly key: string;

  /** Indicates that this instance of the merge behavior is critical. */
  readonly critical = withArrayAppendMergeBehavior.critical;

  /**
   * Creates a new Array Append Merge behavior instance.
   *
   * @param key Unique behavior identifier assigned by the factory.
   * @param behaviorCtx BehaviorCtx for future extensibility hooks.
   */
  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  /**
   * Computes the merged output between currentValue and nextValue
   * using append semantics when both are arrays.
   *
   * @param currentValue The current upstream value before merge.
   * @param nextValue The incoming value to merge.
   * @param options Optional merge configuration.
   * @returns The merged result or VAULT_NOOP when clearing is requested.
   */
  computeMerge(
    currentValue: PipelineUpstreamValue<T>,
    nextValue: PipelineUpstreamValue<T>,
    options?: MergeConfig
  ): PipelineUpstreamValue<T> {
    const curr = currentValue;
    const next = nextValue;
    const clear = options?.clearUndefined ?? false;

    vaultDebug(`${this.key} merge called (clear: ${clear})`);

    if (next === undefined && !clear) {
      vaultDebug(
        `${this.key} computeMerge skipped. next="${next}" clear="${clear}"`
      );
      return curr;
    }

    if (next === undefined && clear) {
      vaultDebug(
        `${this.key} ComputeMerge skipped. next="${next}" clear="${clear}"`
      );
      return VAULT_CLEAR_STATE;
    }

    if (Array.isArray(curr) && Array.isArray(next)) {
      vaultDebug(`${this.key} appending arrays → return [...curr, ...next]`);
      return [...curr, ...next] as PipelineUpstreamValue<T>;
    }

    vaultDebug(`${this.key} non-array branch. return next`);
    return next as PipelineUpstreamValue<T>;
  }

  /**
   * Lifecycle hook invoked when the behavior instance is destroyed.
   */
  destroy(): void {
    vaultWarn(`${this.key} - destroy "noop"`);
  }

  /**
   * Resets the merge behavior to its initial state.
   */
  reset(): void {
    vaultWarn(`${this.key} - reset "noop"`);
  }
}
```

#### HTML File Example Output

```html
<div class="docs-container">
  <div class="header">
    <h3>withArrayAppendMergeBehavior</h3>
  </div>

  <header class="docs-header">
    <div class="lead">
      Core merge behavior that performs array append semantics.<br /><br />
      This behavior is used during the merge stage of the ngSDuX pipeline. When
      both the current and incoming values are arrays, it returns a new array
      containing the concatenation of both values ([...curr, ...next]).<br /><br />
      If either value is not an array, the incoming value is returned as-is.<br /><br />
      Merge behavior is pure, meaning it never mutates the input arrays. It also
      supports a clearUndefined option, which converts an explicit undefined
      incoming value into a
      <a href="/docs/references/const/vault_noop">VAULT_NOOP</a> signal if
      configured.<br /><br />
    </div>
  </header>

  <section class="section">
    <div class="section-title">Installation</div>
    <div class="section-body">
      Part of the <strong>@SDuX/addons</strong> project.

      <pre
        class="code-inline"><code class="language-ts">npm install @ngsdux/addons</code></pre>
    </div>
  </section>

  <section class="section">
    <div class="section-title">Constructor</div>
    <div class="section-body">
      <table>
        <thead>
          <tr>
            <th class="column-300">Signature</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>constructor</strong>

              <p>inputs:</p>
              <ul>
                <li>key: string</li>
                <li>
                  behaviorCtx:
                  <a href="/docs/references/contexts/behavior-class-context"
                    >BehaviorClassContext</a
                  >
                </li>
              </ul>

              <p>implements:</p>
              <ul>
                <li>
                  <a href="/docs/references/contracts/merge-behavior-contract"
                    >MergeBehaviorContract</a
                  >
                </li>
              </ul>
            </td>
            <td>
              Creates a new Array Append Merge behavior instance.<br /><br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="section">
    <div class="section-title">Methods</div>
    <div class="section-body">
      <table>
        <thead>
          <tr>
            <th class="column-300">Method</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>computeMerge</strong>

              <p>inputs:</p>
              <ul>
                <li>
                  currentValue:
                  <a href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >
                </li>
                <li>
                  nextValue:
                  <a href="/docs/references/types/pipeline-upstream-value"
                    >PipelineUpstreamValue</a
                  >
                </li>
                <li>
                  options?:
                  <a href="/docs/references/config/merge-config">MergeConfig</a>
                </li>
              </ul>

              <p>
                returns:
                <a href="/docs/references/types/pipeline-upstream-value"
                  >PipelineUpstreamValue</a
                >&lt;T&gt;
              </p>
            </td>
            <td>
              Computes the merged output between currentValue and nextValue
              using append semantics when both are arrays.<br /><br />
            </td>
          </tr>

          <tr>
            <td>
              <strong>destroy</strong>

              <p>returns: void</p>
            </td>
            <td>
              Lifecycle hook invoked when the behavior instance is destroyed.<br /><br />
            </td>
          </tr>

          <tr>
            <td>
              <strong>reset</strong>

              <p>returns: void</p>
            </td>
            <td>Resets the merge behavior to its initial state.<br /><br /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="section">
    <div class="section-title">Properties</div>
    <div class="section-body">
      <table>
        <thead>
          <tr>
            <th class="column-300">Property</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="column-300">
              <strong>critical</strong>
              <p class="modifiers">static, readonly</p>
              <p class="type">type: unknown</p>
              <p class="default">default: false</p>
            </td>
            <td class="column-auto">
              Indicates that append merge is a critical pipeline behavior.<br /><br />
            </td>
          </tr>

          <tr>
            <td class="column-300">
              <strong>critical</strong>
              <p class="modifiers">readonly</p>
              <p class="type">type: unknown</p>
              <p class="default">
                default:
                <a
                  href="/docs/pipeline/addons/merge/with-array-append-merge-behavior"
                  >withArrayAppendMergeBehavior</a
                >.critical
              </p>
            </td>
            <td class="column-auto">
              Indicates that this instance of the merge behavior is critical.<br /><br />
            </td>
          </tr>

          <tr>
            <td class="column-300">
              <strong>key</strong>
              <p class="modifiers">static, readonly</p>
              <p class="type">type: string</p>
            </td>
            <td class="column-auto">
              Static behavior key assigned by the VaultBehavior decorator.<br /><br />
            </td>
          </tr>

          <tr>
            <td class="column-300">
              <strong>key</strong>
              <p class="modifiers">readonly</p>
              <p class="type">type: string</p>
            </td>
            <td class="column-auto">
              Unique behavior identifier for diagnostics and devtools.<br /><br />
            </td>
          </tr>

          <tr>
            <td class="column-300">
              <strong>type</strong>
              <p class="modifiers">static, readonly</p>
              <p class="type">
                type:
                <a href="/docs/references/types/behavior-type">BehaviorType</a>
              </p>
            </td>
            <td class="column-auto">
              Static metadata assigned by the
              <a href="/docs/references/decorators/vault-behavior"
                >VaultBehavior</a
              >
              decorator.<br /><br />
            </td>
          </tr>

          <tr>
            <td class="column-300">
              <strong>type</strong>
              <p class="modifiers">readonly</p>
              <p class="type">type: unknown</p>
              <p class="default">
                default:
                <a
                  href="/docs/pipeline/addons/merge/with-array-append-merge-behavior"
                  >withArrayAppendMergeBehavior</a
                >.type
              </p>
            </td>
            <td class="column-auto">
              Instance-level pipeline behavior type identifier.<br /><br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
```

---

### 11.2 Interface or Configuration Shape — Consumer-Supplied Contract

**Purpose**
This example demonstrates how a public interface that represents a configuration or options object is documented and rendered by Compodoc when it serves as a consumer-supplied contract. It shows how the interface summary and per-property JSDoc are converted directly into a concise lead description and a properties table in the final HTML output, without introducing narrative, examples, or behavioral explanation.

**Why it matters**
Configuration interfaces are a common integration surface and must remain minimal, precise, and structurally predictable. This example acts as a canonical reference for how option-style interfaces are transformed into Compodoc HTML, allowing the AI to learn how summary text scopes the interface as a whole while individual property descriptions define the complete consumer-facing contract, with no additional sections or inferred semantics introduced during rendering.

```ts
/**
 * Configuration options for deep object merge behaviors.
 *
 * ObjectDeepMergeConfig influences how nested object structures are merged
 * during a deep-merge operation. These settings are applied recursively by the
 * merge behavior and determine how undefined and null-valued fields are handled.
 */
export interface ObjectDeepMergeConfig {
  /**
   * When enabled, incoming undefined values will clear matching properties
   * on the current state during the merge. When disabled, undefined values
   * leave existing fields unchanged.
   */
  clearUndefined?: boolean;

  /**
   * When enabled, properties whose incoming value is null are removed from the
   * merged output. When disabled, incoming null values are preserved during the
   * merge operation.
   */
  stripNulls?: boolean;
}
```

```html
<div class="docs-container">
  <div class="header">
    <h3>ObjectDeepMergeConfig</h3>
  </div>

  <header class="docs-header">
    <div class="lead">
      Configuration options for deep object merge behaviors.<br /><br />
      <a href="/docs/references/config/object-deep-merge-config"
        >ObjectDeepMergeConfig</a
      >
      influences how nested object structures are merged during a deep-merge
      operation. These settings are applied recursively by the merge behavior
      and determine how undefined and null-valued fields are handled.<br /><br />
    </div>
  </header>

  <section class="section">
    <div class="section-title">Installation</div>
    <div class="section-body">
      Part of the <strong>@SDuX/shared</strong> project.

      <pre
        class="code-inline"><code class="language-ts">npm install @ngsdux/shared</code></pre>
    </div>
  </section>

  <section class="section">
    <div class="section-title">Properties</div>
    <div class="section-body">
      <table>
        <thead>
          <tr>
            <th class="column-300">Property</th>
            <th class="column-auto">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="column-300">
              <strong>clearUndefined?</strong>

              <p class="type">type: boolean</p>
            </td>
            <td class="column-auto">
              When enabled, incoming undefined values will clear matching
              properties on the current state during the merge. When disabled,
              undefined values leave existing fields unchanged.<br /><br />
            </td>
          </tr>

          <tr>
            <td class="column-300">
              <strong>stripNulls?</strong>

              <p class="type">type: boolean</p>
            </td>
            <td class="column-auto">
              When enabled, properties whose incoming value is null are removed
              from the merged output. When disabled, incoming null values are
              preserved during the merge operation.<br /><br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</div>
```

---

# END OF EXECUTION-ONLY CANON
