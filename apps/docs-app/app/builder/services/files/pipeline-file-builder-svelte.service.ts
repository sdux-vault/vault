import { GeneratedFileInputShape } from '../../shapes/file-builder/generated-file-input.shape';
import { GeneratedFileShape } from '../../shapes/file-builder/generated-file.shape';
import { FileTypes } from '../../types/file-builder/file.type';
import { StackblitzFileTypes } from '../../types/file-builder/stackblitz-file.type';

export class PipelineFileBuilderSvelteService {
  #id = 0;
  getBuildId(): string {
    return `${Date.now()}-${this.#id++}`;
  }

  generatedSvelteFiles(input: GeneratedFileInputShape): GeneratedFileShape[] {
    const {
      npm,
      initialValueDisplay,
      vaultImports,
      type,
      vaultChain,
      featureCellKey,
      coreBehaviorNotes,
      serviceExamples,
      componentExamples,
      interfaceDefinition
    } = input;

    const cellName = 'exampleCell';
    const stateName = 'exampleState';
    const componentName = 'ExampleView';

    return [
      {
        id: this.getBuildId(),
        name: 'installation',
        type: FileTypes.All,
        contents: `${npm}`
      },
      {
        id: this.getBuildId(),
        name: 'example.cell.ts',
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.SvelteCell,
        contents: `${vaultImports}
import { FeatureCell, Vault } from '@sdux-vault/core';
${interfaceDefinition}

// Initialize the Vault once at application startup
Vault({ logLevel: 'off' });
${coreBehaviorNotes}
// Register the FeatureCell at module scope
const ${cellName} = FeatureCell<${type}>({

  // Unique state key used by the Vault
  key: '${featureCellKey}',

  // Initial value for the state
  initialState: ${initialValueDisplay}
});

// Runtime pipeline configuration
${cellName}
${vaultChain.replace(/^this\.#vault\n?/, '')}

// Expose read-only state access
export const ${stateName} = ${cellName}.state;
export const ${stateName}$ = ${cellName}.state$;

${serviceExamples}`
      },
      {
        id: this.getBuildId(),
        name: `${componentName}.svelte`,
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.SvelteComponent,
        contents: `<script lang="ts">
import { onDestroy } from 'svelte';
import type { Subscription } from 'rxjs';
import * as cell from './example.cell';

/**
 * UI component responsible for rendering the example FeatureCell state.
 *
 * This component consumes the Vault-backed state exposed by the
 * example cell module and reacts to its value, loading, and error state.
 *
 * The component does not manage state directly — it delegates all state
 * updates to the exported cell functions.
 */

/**
 * Local snapshot bridged from the Vault's reactive state stream.
 *
 * Provides reactive access to:
 * - value
 * - isLoading
 * - error
 * - hasValue
 *
 * The RxJS subscription is managed automatically via onDestroy.
 */
let snapshot = $state({
  value: cell.${stateName}.value,
  isLoading: cell.${stateName}.isLoading,
  error: cell.${stateName}.error,
  hasValue: cell.${stateName}.hasValue
});

const sub: Subscription = cell.${stateName}$.subscribe((emit) => {
  snapshot = {
    value: emit.snapshot.value,
    isLoading: emit.snapshot.isLoading,
    error: emit.snapshot.error,
    hasValue: emit.snapshot.hasValue
  };
});

onDestroy(() => {
  sub?.unsubscribe();
});

${componentExamples}
</script>

<div>
  <div style="margin-bottom: 1rem">
    <button type="button" onclick={loadSample}>
      Click me to add data
    </button>
  </div>

  <!-- Render state value when available -->
  {#if snapshot.hasValue}
    <div>
      <p>${type}: {JSON.stringify(snapshot.value, null, 2)}</p>
    </div>
  {/if}

  <!-- Render loading state -->
  {#if snapshot.isLoading}
    <div>
      Loading...
    </div>
  {/if}

  <!-- Render error state -->
  {#if snapshot.error}
    <div>
      Error: {snapshot.error?.message}
    </div>
  {/if}
</div>`
      },
      {
        id: this.getBuildId(),
        name: 'main.ts',
        type: FileTypes.All,
        stackBlitzFileType: StackblitzFileTypes.SvelteMain,
        contents: `import { mount } from 'svelte';
import ${componentName} from './app/${componentName}.svelte';

mount(${componentName}, { target: document.getElementById('app')! });`
      },
      {
        id: this.getBuildId(),
        name: 'example.cell.ts',
        type: FileTypes.FromStream,
        contents: `${vaultImports}
import { Observable } from 'rxjs';
import { FeatureCell, Vault } from '@sdux-vault/core';

// Initialize the Vault once at application startup
Vault({ logLevel: 'off' });

// Register the FeatureCell at module scope
const ${cellName} = FeatureCell<${type}>({

  // Unique state key used by the Vault
  key: '${featureCellKey}',

  // Initial value for the state
  initialState: ${initialValueDisplay}
});

// Runtime pipeline configuration
${cellName}
${vaultChain.replace(/^this\.#vault\n?/, '')}

// Expose read-only state access
export const ${stateName} = ${cellName}.state;
export const ${stateName}$ = ${cellName}.state$;

/**
 * Connect an external observable stream to this FeatureCell.
 *
 * Each emitted value becomes a standard state update
 * and flows through the normal Vault pipeline.
 *
 * The subscription lifecycle is automatically managed
 * by the FeatureCell and is cleaned up on reset/destroy.
 */
export function connectStream(source$: Observable<${type}>): void {
  ${cellName}.fromStream(source$);
}`
      },
      {
        id: this.getBuildId(),
        name: `${componentName}.svelte`,
        type: FileTypes.FromStream,
        contents: `<script lang="ts">
import { onDestroy } from 'svelte';
import type { Subscription } from 'rxjs';
import * as cell from './example.cell';

/**
 * Advanced example component demonstrating:
 *
 * - Reactive state subscription
 * - Stream delegation to FeatureCell via connectStream()
 *
 * Architectural Flow:
 *
 * Stream Source → connectStream() → Vault → Pipeline
 *
 * The component never touches the Vault directly.
 */

let snapshot = $state({
  value: cell.${stateName}.value,
  isLoading: cell.${stateName}.isLoading,
  error: cell.${stateName}.error,
  hasValue: cell.${stateName}.hasValue
});

const sub: Subscription = cell.${stateName}$.subscribe((emit) => {
  snapshot = {
    value: emit.snapshot.value,
    isLoading: emit.snapshot.isLoading,
    error: emit.snapshot.error,
    hasValue: emit.snapshot.hasValue
  };
});

onDestroy(() => {
  sub?.unsubscribe();
});
</script>

<div>
  <!-- Render state value when available -->
  {#if snapshot.hasValue}
    <div>
      <p>${type}: {JSON.stringify(snapshot.value, null, 2)}</p>
    </div>
  {/if}

  <!-- Render loading state -->
  {#if snapshot.isLoading}
    <div>
      Loading...
    </div>
  {/if}

  <!-- Render error state -->
  {#if snapshot.error}
    <div>
      Error: {snapshot.error?.message}
    </div>
  {/if}
</div>`
      },
      {
        id: this.getBuildId(),
        name: 'ai-assist.md',
        type: FileTypes.AiAssist,
        contents: input.aiAssist
      }
    ];
  }
}
