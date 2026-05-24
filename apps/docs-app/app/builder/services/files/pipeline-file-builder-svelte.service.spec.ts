import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PipelineFileBuilderSvelteService } from './pipeline-file-builder-svelte.service';

describe('Service: PipelineFileBuilderSvelte', () => {
  let service: PipelineFileBuilderSvelteService;
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
        PipelineFileBuilderSvelteService,
        provideZonelessChangeDetection()
      ]
    });

    service = TestBed.inject(PipelineFileBuilderSvelteService);
  });

  describe('All', () => {
    it('should the total files', () => {
      const files = service.generatedSvelteFiles(fileConfig);
      expect(files.length).toBe(7);
    });

    it('should generate installation', () => {
      fileIndex = 0;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('installation');
      expect(file.type).toBe('all');

      expect(normalize(file.contents)).toBe(`npms`);
    });

    it('should generate example.cell.ts', () => {
      fileIndex = 1;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('example.cell.ts');
      expect(file.type).toBe('simple');
      expect(file.stackBlitzFileType).toBe('Svelte Cell');

      expect(normalize(file.contents)).toBe(
        `imports { FeatureCell } from @sdux-vault/coreimport { FeatureCell, Vault } from '@sdux-vault/core';interface definition// Initialize the Vault once at application startupVault({ logLevel: 'off' });core behavior notes// Register the FeatureCell at module scopeconst exampleCell = FeatureCell<employees[]>({ // Unique state key used by the Vault key: 'example-feature-cell-key', // Initial value for the state initialState: []});// Runtime pipeline configurationexampleCell.initialize();// Expose read-only state accessexport const exampleState = exampleCell.state;export const exampleState$ = exampleCell.state$;service examples`
      );
    });

    it('should generate ExampleView.svelte', () => {
      fileIndex = 2;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ExampleView.svelte');
      expect(file.type).toBe('simple');
      expect(file.stackBlitzFileType).toBe('Svelte Component');

      expect(normalize(file.contents.slice(0, 1000))).toBe(
        `<script lang="ts">import { onDestroy } from 'svelte';import type { Subscription } from 'rxjs';import * as cell from './example.cell';/** * UI component responsible for rendering the example FeatureCell state. * * This component consumes the Vault-backed state exposed by the * example cell module and reacts to its value, loading, and error state. * * The component does not manage state directly — it delegates all state * updates to the exported cell functions. *//** * Local snapshot bridged from the Vault's reactive state stream. * * Provides reactive access to: * - value * - isLoading * - error * - hasValue * * The RxJS subscription is managed automatically via onDestroy. */let snapshot = $state({ value: cell.exampleState.value, isLoading: cell.exampleState.isLoading, error: cell.exampleState.error, hasValue: cell.exampleState.hasValue});const sub: Subscription = cell.exampleState$.subscribe((emit) => { snapshot = {  value: emit.snapshot.value,`
      );

      expect(normalize(file.contents.slice(1000))).toBe(
        `  isLoading: emit.snapshot.isLoading,  error: emit.snapshot.error,  hasValue: emit.snapshot.hasValue };});onDestroy(() => { sub?.unsubscribe();});component examples</script><div> <div style="margin-bottom: 1rem">  <button type="button" onclick={loadSample}>   Click me to add data  </button> </div> <!-- Render state value when available --> {#if snapshot.hasValue}  <div>   <p>employees[]: {JSON.stringify(snapshot.value, null, 2)}</p>  </div> {/if} <!-- Render loading state --> {#if snapshot.isLoading}  <div>   Loading...  </div> {/if} <!-- Render error state --> {#if snapshot.error}  <div>   Error: {snapshot.error?.message}  </div> {/if}</div>`
      );
    });

    it('should generate main.ts', () => {
      fileIndex = 3;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('main.ts');
      expect(file.type).toBe('all');
      expect(file.stackBlitzFileType).toBe('Svelte Main');

      expect(normalize(file.contents)).toBe(
        `import { mount } from 'svelte';import ExampleView from './app/ExampleView.svelte';mount(ExampleView, { target: document.getElementById('app')! });`
      );
    });
  });

  describe('FromStream', () => {
    it('should generate the fromStream example.cell.ts', () => {
      fileIndex = 4;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('example.cell.ts');
      expect(file.type).toBe('fromStream');

      expect(normalize(file.contents)).toBe(
        `imports { FeatureCell } from @sdux-vault/coreimport { Observable } from 'rxjs';import { FeatureCell, Vault } from '@sdux-vault/core';// Initialize the Vault once at application startupVault({ logLevel: 'off' });// Register the FeatureCell at module scopeconst exampleCell = FeatureCell<employees[]>({ // Unique state key used by the Vault key: 'example-feature-cell-key', // Initial value for the state initialState: []});// Runtime pipeline configurationexampleCell.initialize();// Expose read-only state accessexport const exampleState = exampleCell.state;export const exampleState$ = exampleCell.state$;/** * Connect an external observable stream to this FeatureCell. * * Each emitted value becomes a standard state update * and flows through the normal Vault pipeline. * * The subscription lifecycle is automatically managed * by the FeatureCell and is cleaned up on reset/destroy. */export function connectStream(source$: Observable<employees[]>): void { exampleCell.fromStream(source$);}`
      );
    });

    it('should generate the fromStream ExampleView.svelte', () => {
      fileIndex = 5;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ExampleView.svelte');
      expect(file.type).toBe('fromStream');

      expect(normalize(file.contents.slice(0, 1000))).toBe(
        `<script lang="ts">import { onDestroy } from 'svelte';import type { Subscription } from 'rxjs';import * as cell from './example.cell';/** * Advanced example component demonstrating: * * - Reactive state subscription * - Stream delegation to FeatureCell via connectStream() * * Architectural Flow: * * Stream Source → connectStream() → Vault → Pipeline * * The component never touches the Vault directly. */let snapshot = $state({ value: cell.exampleState.value, isLoading: cell.exampleState.isLoading, error: cell.exampleState.error, hasValue: cell.exampleState.hasValue});const sub: Subscription = cell.exampleState$.subscribe((emit) => { snapshot = {  value: emit.snapshot.value,  isLoading: emit.snapshot.isLoading,  error: emit.snapshot.error,  hasValue: emit.snapshot.hasValue };});onDestroy(() => { sub?.unsubscribe();});</script><div> <!-- Render state value when available --> {#if snapshot.hasValue}  <div>   <p>employees[]: {J`
      );

      expect(normalize(file.contents.slice(1000))).toBe(
        `SON.stringify(snapshot.value, null, 2)}</p>  </div> {/if} <!-- Render loading state --> {#if snapshot.isLoading}  <div>   Loading...  </div> {/if} <!-- Render error state --> {#if snapshot.error}  <div>   Error: {snapshot.error?.message}  </div> {/if}</div>`
      );
    });
  });

  describe('AiAssist', () => {
    it('should generate ai-assist.md', () => {
      fileIndex = 6;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ai-assist.md');
      expect(file.type).toBe('ai-assist');

      expect(normalize(file.contents)).toBe('ai - assist');
    });
  });
});
