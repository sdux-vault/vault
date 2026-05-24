import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PipelineFileBuilderAngularService } from './pipeline-file-builder-angular.service';

describe('Service: PipelineFileBuilderAngular', () => {
  let service: PipelineFileBuilderAngularService;
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
    vaultChain: `this.vault // Finalizes configuration and activates the FeatureCell pipeline .initialize();`,
    aiAssist: 'ai - assist',
    coreBehaviorNotes: 'core behavior notes',
    serviceExamples: 'service examples',
    componentExamples: 'component examples',
    interfaceDefinition: 'interface definition'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PipelineFileBuilderAngularService,
        provideZonelessChangeDetection()
      ]
    });

    service = TestBed.inject(PipelineFileBuilderAngularService);
  });

  describe('All', () => {
    it('should the total files', () => {
      const files = service.generatedAngularFiles(fileConfig);
      expect(files.length).toBe(7);
    });

    it('should generate installation', () => {
      fileIndex = 0;
      const file = service.generatedAngularFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('installation');
      expect(file.type).toBe('all');

      expect(normalize(file.contents)).toBe(`npms`);
    });

    it('should generate app.config.ts', () => {
      fileIndex = 1;
      const file = service.generatedAngularFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('app.config.ts');
      expect(file.type).toBe('all');

      expect(normalize(file.contents)).toBe(
        `imports { Vault } from @sdux-vault/coreimport { ApplicationConfig } from '@angular/core';import { provideVault, provideFeatureCell } from '@sdux-vault/angular';import { ExampleService } from './example.service';      export const appConfig: ApplicationConfig = { providers: [  // Creates the Vault runtime (state container + lifecycle)  provideVault({ logLevel: 'off' }),core behavior notes  // Define a FeatureCell (state + behaviors + controllers)  provideFeatureCell(   // Service class that owns the FeatureCell instance   ExampleService,   // FeatureCell descriptor (identity + initial state)   {    // Unique state key used by the Vault    key: 'example-feature-cell-key',    // Fallback Initial value for the state    initialState: []   },   // Optional definition-time extensions   [// Attach add-on behaviors here],   [// Additional add-on controllers here]  ) ]};`
      );
    });
  });

  describe('Simple', () => {
    it('should generate the simple service', () => {
      fileIndex = 2;
      const file = service.generatedAngularFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('example.service.ts');
      expect(file.type).toBe('simple');

      expect(normalize(file.contents.slice(0, 1000))).toBe(
        `imports { FeatureCell } from @sdux-vault/coreimport { Injectable } from '@angular/core';import { FeatureCell, injectVault } from '@sdux-vault/angular';interface definition/** * FeatureCell service for the 'example-feature-cell-key' state. * * This service owns the Vault-backed state and applies * runtime pipeline behaviors configured via the Vault fluent API. */@FeatureCell<employees[]>('example-feature-cell-key')@Injectable({ providedIn: 'root' })export class ExampleService { /**  * Internal Vault handle for this FeatureCell.  *  * ⚠️ Architectural Boundary:  * The Vault instance is owned exclusively by this service.  * Components must NEVER access the Vault directly.  *  * This ensures:  * - Centralized state mutation  * - Controlled pipeline configuration  * - Proper lifecycle management  * - Clear separation of concerns  *  * All state updates must go through service methods.  */ readonly #vault = injectVault<employees[]>(ExampleService`
      );

      expect(normalize(file.contents.slice(1000))).toBe(
        `); /**  * Public reactive state snapshot exposed to consumers.  *  * This is the ONLY surface components should use.  *  * Provides read-only reactive access to:  * - value()  * - isLoading()  * - error()  * - hasValue()  *  * Components may read from state,  * but must call service methods to modify it.  */ readonly state = this.#vault.state; constructor() {  // Runtime pipeline configuration  this.vault // Finalizes configuration and activates the FeatureCell pipeline .initialize(); }service examples}`
      );
    });

    it('should generate the simple componenet', () => {
      fileIndex = 3;
      const file = service.generatedAngularFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('example.component.ts');
      expect(file.type).toBe('simple');

      expect(normalize(file.contents.slice(0, 1000))).toBe(
        `import { ExampleService } from './example.service';import { Component, inject } from '@angular/core';import { CommonModule } from '@angular/common';     /** * UI component responsible for rendering the example FeatureCell state. * * This component consumes the Vault-backed state exposed by ExampleService * and reacts to its value, loading, and error signals. * * The component does not manage state directly — it delegates all state * updates and lifecycle orchestration to the FeatureCell service. */@Component({ selector: 'example-view', standalone: true, imports: [  CommonModule ], template: \`  <div style="margin-bottom: 1rem;">   <button (click)="loadSample()">    Click me to add data   </button>  </div>  <!-- Render state value when available -->  @if (state.hasValue()) {   <div>    <p>employees[]: {{ state.value() | json }}</p>   </div>  }  <!-- Render loading state -->  @if (state.isLoading()) {   <di`
      );

      expect(normalize(file.contents.slice(1000))).toBe(
        `v>    Loading...   </div>  }  <!-- Render error state -->  @if (state.error()) {   <div>    Error: {{ state.error()?.message }}   </div>  } \`})export class ExampleComponent{ /**  * Injected FeatureCell service.  *  * This provides access to the Vault instance and all  * runtime pipeline behavior configured in the service. */ #exampleService = inject(ExampleService); /**  * Reactive StateSnapshotShape<T> accessor exposed by the Vault.  *  * Provides reactive access to:  * - value()  * - isLoading()  * - error()  * - hasValue()  *  * The template binds directly to these signals for rendering.  */ state = this.#exampleService.state;component examples}`
      );
    });
  });

  describe('AiAssist', () => {
    it('should generate ai-assist.md', () => {
      fileIndex = 6;
      const file = service.generatedAngularFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ai-assist.md');
      expect(file.type).toBe('ai-assist');

      expect(normalize(file.contents)).toBe('ai - assist');
    });
  });
});
