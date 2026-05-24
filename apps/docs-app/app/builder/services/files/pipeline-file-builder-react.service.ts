import { GeneratedFileInputShape } from '../../shapes/file-builder/generated-file-input.shape';
import { GeneratedFileShape } from '../../shapes/file-builder/generated-file.shape';
import { FileTypes } from '../../types/file-builder/file.type';
import { StackblitzFileTypes } from '../../types/file-builder/stackblitz-file.type';

export class PipelineFileBuilderReactService {
  #id = 0;
  getBuildId(): string {
    return `${Date.now()}-${this.#id++}`;
  }

  generatedReactFiles(input: GeneratedFileInputShape): GeneratedFileShape[] {
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
        stackBlitzFileType: StackblitzFileTypes.ReactCell,
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
        name: `${componentName}.tsx`,
        type: FileTypes.Simple,
        stackBlitzFileType: StackblitzFileTypes.ReactComponent,
        contents: `import { useEffect, useState } from 'react';
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
export function ${componentName}() {

  /**
   * Local snapshot bridged from the Vault's reactive state stream.
   *
   * Provides reactive access to:
   * - value
   * - isLoading
   * - error
   * - hasValue
   *
   * The RxJS subscription is managed automatically via useEffect cleanup.
   */
  const [snapshot, setSnapshot] = useState({
    value: cell.${stateName}.value,
    isLoading: cell.${stateName}.isLoading,
    error: cell.${stateName}.error,
    hasValue: cell.${stateName}.hasValue
  });

  useEffect(() => {
    const sub = cell.${stateName}$.subscribe((emit) => {
      setSnapshot({
        value: emit.snapshot.value,
        isLoading: emit.snapshot.isLoading,
        error: emit.snapshot.error,
        hasValue: emit.snapshot.hasValue
      });
    });
    return () => sub.unsubscribe();
  }, []);

${componentExamples}

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={loadSample}>
          Click me to add data
        </button>
      </div>

      {/* Render state value when available */}
      {snapshot.hasValue && (
        <div>
          <p>${type}: {JSON.stringify(snapshot.value, null, 2)}</p>
        </div>
      )}

      {/* Render loading state */}
      {snapshot.isLoading && (
        <div>
          Loading...
        </div>
      )}

      {/* Render error state */}
      {snapshot.error && (
        <div>
          Error: {snapshot.error?.message}
        </div>
      )}
    </div>
  );
}`
      },
      {
        id: this.getBuildId(),
        name: 'main.tsx',
        type: FileTypes.All,
        stackBlitzFileType: StackblitzFileTypes.ReactMain,
        contents: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ${componentName} } from './app/${componentName}';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <${componentName} />
  </StrictMode>
);`
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
        name: `${componentName}.tsx`,
        type: FileTypes.FromStream,
        contents: `import { useEffect, useState } from 'react';
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
export function ${componentName}() {
  const [snapshot, setSnapshot] = useState({
    value: cell.${stateName}.value,
    isLoading: cell.${stateName}.isLoading,
    error: cell.${stateName}.error,
    hasValue: cell.${stateName}.hasValue
  });

  useEffect(() => {
    const sub = cell.${stateName}$.subscribe((emit) => {
      setSnapshot({
        value: emit.snapshot.value,
        isLoading: emit.snapshot.isLoading,
        error: emit.snapshot.error,
        hasValue: emit.snapshot.hasValue
      });
    });
    return () => sub.unsubscribe();
  }, []);

  return (
    <div>
      {/* Render state value when available */}
      {snapshot.hasValue && (
        <div>
          <p>${type}: {JSON.stringify(snapshot.value, null, 2)}</p>
        </div>
      )}

      {/* Render loading state */}
      {snapshot.isLoading && (
        <div>
          Loading...
        </div>
      )}

      {/* Render error state */}
      {snapshot.error && (
        <div>
          Error: {snapshot.error?.message}
        </div>
      )}
    </div>
  );
}`
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
