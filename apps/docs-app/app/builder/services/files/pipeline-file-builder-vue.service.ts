import { GeneratedFileInputShape } from '../../shapes/file-builder/generated-file-input.shape';
import { GeneratedFileShape } from '../../shapes/file-builder/generated-file.shape';
import { FileTypes } from '../../types/file-builder/file.type';
import { StackblitzFileTypes } from '../../types/file-builder/stackblitz-file.type';

export class PipelineFileBuilderVueService {
  #id = 0;
  getBuildId(): string {
    return `${Date.now()}-${this.#id++}`;
  }

  generatedVueFiles(input: GeneratedFileInputShape): GeneratedFileShape[] {
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
        stackBlitzFileType: StackblitzFileTypes.VueCell,
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
        name: `${componentName}.vue`,
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.VueComponent,
        contents: `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
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
 * The RxJS subscription is managed automatically via onMounted/onUnmounted.
 */
const snapshot = ref({
  value: cell.${stateName}.value,
  isLoading: cell.${stateName}.isLoading,
  error: cell.${stateName}.error,
  hasValue: cell.${stateName}.hasValue
});

let sub: Subscription;

onMounted(() => {
  sub = cell.${stateName}$.subscribe((emit) => {
    snapshot.value = {
      value: emit.snapshot.value,
      isLoading: emit.snapshot.isLoading,
      error: emit.snapshot.error,
      hasValue: emit.snapshot.hasValue
    };
  });
});

onUnmounted(() => {
  sub?.unsubscribe();
});

${componentExamples}
</script>

<template>
  <div>
    <div style="margin-bottom: 1rem">
      <button type="button" @click="loadSample">
        Click me to add data
      </button>
    </div>

    <!-- Render state value when available -->
    <div v-if="snapshot.hasValue">
      <p>${type}: {{ JSON.stringify(snapshot.value, null, 2) }}</p>
    </div>

    <!-- Render loading state -->
    <div v-if="snapshot.isLoading">
      Loading...
    </div>

    <!-- Render error state -->
    <div v-if="snapshot.error">
      Error: {{ snapshot.error?.message }}
    </div>
  </div>
</template>`
      },
      {
        id: this.getBuildId(),
        name: 'main.ts',
        type: FileTypes.All,
        stackBlitzFileType: StackblitzFileTypes.VueMain,
        contents: `import { createApp } from 'vue';
import ${componentName} from './app/${componentName}.vue';

createApp(${componentName}).mount('#app');`
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
        name: `${componentName}.vue`,
        type: FileTypes.FromStream,
        contents: `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
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

const snapshot = ref({
  value: cell.${stateName}.value,
  isLoading: cell.${stateName}.isLoading,
  error: cell.${stateName}.error,
  hasValue: cell.${stateName}.hasValue
});

let sub: Subscription;

onMounted(() => {
  sub = cell.${stateName}$.subscribe((emit) => {
    snapshot.value = {
      value: emit.snapshot.value,
      isLoading: emit.snapshot.isLoading,
      error: emit.snapshot.error,
      hasValue: emit.snapshot.hasValue
    };
  });
});

onUnmounted(() => {
  sub?.unsubscribe();
});
</script>

<template>
  <div>
    <!-- Render state value when available -->
    <div v-if="snapshot.hasValue">
      <p>${type}: {{ JSON.stringify(snapshot.value, null, 2) }}</p>
    </div>

    <!-- Render loading state -->
    <div v-if="snapshot.isLoading">
      Loading...
    </div>

    <!-- Render error state -->
    <div v-if="snapshot.error">
      Error: {{ snapshot.error?.message }}
    </div>
  </div>
</template>`
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
