import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PipelineFileBuilderReactService } from './pipeline-file-builder-react.service';

describe('Service: PipelineFileBuilderReact', () => {
  let service: PipelineFileBuilderReactService;
  let fileIndex: number;

  function normalize(s: string): string {
    return s.replace(/\n/g, '').replace(/\s\s/g, ' ').replace(/\t/g, ' ');
  }

  const fileConfig = {
    featureCellImports: `imports { Vault } from @sdux-vault/core`,
    initialValueDisplay: '[]',
    featureCellBehaviorArray: `[// Attach add-on behaviors here]`,
    serviceVaultName: '#vault',
    serviceName: 'ExampleService',
    instantiatedServiceName: '#exampleService',
    featureCellKey: 'example-feature-cell-key',

    featureCellControllerArray: `[// Additional add-on controllers here]`,
    vaultImports: `imports { FeatureCell } from @sdux-vault/core`,
    npm: 'npms',
    type: 'employees[]',
    vaultChain: `this.#vault\n.initialize();`,
    aiAssist: 'ai - assist',
    coreBehaviorNotes: 'core behavior notes',
    serviceExamples: 'service examples',
    componentExamples: 'component examples',
    interfaceDefinition: 'interface definition'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PipelineFileBuilderReactService,
        provideZonelessChangeDetection()
      ]
    });

    service = TestBed.inject(PipelineFileBuilderReactService);
  });

  describe('All', () => {
    it('should the total files', () => {
      const files = service.generatedReactFiles(fileConfig);
      expect(files.length).toBe(7);
    });

    it('should generate installation', () => {
      fileIndex = 0;
      const file = service.generatedReactFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('installation');
      expect(file.type).toBe('all');

      expect(normalize(file.contents)).toBe(`npms`);
    });

    it('should generate example.cell.ts', () => {
      fileIndex = 1;
      const file = service.generatedReactFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('example.cell.ts');
      expect(file.type).toBe('simple');
      expect(file.stackBlitzFileType).toBe('React Cell');

      expect(normalize(file.contents)).toBe(
        `imports { FeatureCell } from @sdux-vault/coreimport { FeatureCell, Vault } from '@sdux-vault/react';interface definition// Initialize the Vault once at application startupVault({ logLevel: 'off' });core behavior notes// Register the FeatureCell at module scopeexport const exampleCell = FeatureCell<employees[]>({ // Unique state key used by the Vault key: 'example-feature-cell-key', // Initial value for the state initialState: []});// Runtime pipeline configurationexampleCell.initialize();// Expose read-only state accessexport const exampleState = exampleCell.state;export const exampleState$ = exampleCell.state$;service examples`
      );
    });

    it('should generate ExampleView.tsx', () => {
      fileIndex = 2;
      const file = service.generatedReactFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ExampleView.tsx');
      expect(file.type).toBe('simple');
      expect(file.stackBlitzFileType).toBe('React Component');

      expect(normalize(file.contents.slice(0, 1000))).toBe(
        `import * as cell from './example.cell';/** * UI component responsible for rendering the example FeatureCell state. * * This component consumes the Vault-backed state exposed by the * example cell module and reacts to its value, loading, and error state. * * The component does not manage state directly — it delegates all state * updates to the exported cell functions. */export function ExampleView() { /**  * Current immutable FeatureCell snapshot for this React render.  *  * Provides reactive access to:  * - value  * - isLoading  * - error  * - hasValue  *  * React manages the render subscription and cleanup through  * useSyncExternalStore().  */ const snapshot = cell.exampleCell.useSyncExternalStore();component examples return (  <div>   <div style={{ marginBottom: '1rem' }}>    <button type="button" onClick={loadSample}>     Click me to add data    </button>   </div>   {/* Render state value when available */} `
      );

      expect(normalize(file.contents.slice(1000))).toBe(
        `   {snapshot.hasValue && (    <div>     <p>employees[]: {JSON.stringify(snapshot.value, null, 2)}</p>    </div>   )}   {/* Render loading state */}   {snapshot.isLoading && (    <div>     Loading...    </div>   )}   {/* Render error state */}   {snapshot.error && (    <div>     Error: {snapshot.error?.message}    </div>   )}  </div> );}`
      );
    });

    it('should generate main.tsx', () => {
      fileIndex = 3;
      const file = service.generatedReactFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('main.tsx');
      expect(file.type).toBe('all');
      expect(file.stackBlitzFileType).toBe('React Main');

      expect(normalize(file.contents)).toBe(
        `import { StrictMode } from 'react';import { createRoot } from 'react-dom/client';import { ExampleView } from './app/ExampleView';createRoot(document.getElementById('root')!).render( <StrictMode>  <ExampleView /> </StrictMode>);`
      );
    });
  });

  describe('FromStream', () => {
    it('should generate the fromStream example.cell.ts', () => {
      fileIndex = 4;
      const file = service.generatedReactFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('example.cell.ts');
      expect(file.type).toBe('fromStream');

      expect(normalize(file.contents.slice(0, 1000))).toBe(
        `imports { FeatureCell } from @sdux-vault/coreimport { Observable } from 'rxjs';import { FeatureCell, Vault } from '@sdux-vault/react';// Initialize the Vault once at application startupVault({ logLevel: 'off' });// Register the FeatureCell at module scopeexport const exampleCell = FeatureCell<employees[]>({ // Unique state key used by the Vault key: 'example-feature-cell-key', // Initial value for the state initialState: []});// Runtime pipeline configurationexampleCell.initialize();// Expose read-only state accessexport const exampleState = exampleCell.state;export const exampleState$ = exampleCell.state$;/** * Connect an external observable stream to this FeatureCell. * * Each emitted value becomes a standard state update * and flows through the normal Vault pipeline. * * The subscription lifecycle is automatically managed * by the FeatureCell and is cleaned up on reset/destroy. */export function connectStream(source$: Observable<employees[]>): v`
      );

      expect(normalize(file.contents.slice(1000))).toBe(
        'oid { exampleCell.fromStream(source$);}'
      );
    });

    it('should generate the fromStream ExampleView.tsx', () => {
      fileIndex = 5;
      const file = service.generatedReactFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ExampleView.tsx');
      expect(file.type).toBe('fromStream');

      expect(normalize(file.contents.slice(0, 1000))).toBe(
        `import * as cell from './example.cell';/** * Advanced example component demonstrating: * * - React render subscription * - Stream delegation to FeatureCell via connectStream() * * Architectural Flow: * * Stream Source → connectStream() → Vault → Pipeline * * The component never touches the Vault directly. */export function ExampleView() { const snapshot = cell.exampleCell.useSyncExternalStore(); return (  <div>   {/* Render state value when available */}   {snapshot.hasValue && (    <div>     <p>employees[]: {JSON.stringify(snapshot.value, null, 2)}</p>    </div>   )}   {/* Render loading state */}   {snapshot.isLoading && (    <div>     Loading...    </div>   )}   {/* Render error state */}   {snapshot.error && (    <div>     Error: {snapshot.error?.message}    </div>   )}  </div> );}`
      );

      expect(normalize(file.contents.slice(1000))).toBe('');
    });
  });

  describe('AiAssist', () => {
    it('should generate ai-assist.md', () => {
      fileIndex = 6;
      const file = service.generatedReactFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ai-assist.md');
      expect(file.type).toBe('ai-assist');

      expect(normalize(file.contents)).toBe('ai - assist');
    });
  });
});
