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

      const contents = normalize(file.contents);

      expect(contents).toContain(
        `import { FeatureCell, Vault } from '@sdux-vault/svelte';`
      );
      expect(contents).toContain(
        `export const exampleCell = FeatureCell<employees[]>({`
      );
      expect(contents).not.toContain('exampleState');
    });

    it('should generate ExampleView.svelte', () => {
      fileIndex = 2;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ExampleView.svelte');
      expect(file.type).toBe('simple');
      expect(file.stackBlitzFileType).toBe('Svelte Component');

      const contents = normalize(file.contents);

      expect(contents).toContain(
        'let snapshot = $derived(cell.exampleCell.state);'
      );
      expect(contents).toContain('component examples');
      expect(contents).not.toContain('Subscription');
      expect(contents).not.toContain('onDestroy');
      expect(contents).not.toContain('exampleState$');
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

      const contents = normalize(file.contents);

      expect(contents).toContain(
        `import { FeatureCell, Vault } from '@sdux-vault/svelte';`
      );
      expect(contents).toContain(
        `export const exampleCell = FeatureCell<employees[]>({`
      );
      expect(contents).toContain(
        'export function connectStream(source$: Observable<employees[]>): void'
      );
      expect(contents).not.toContain('exampleState');
    });

    it('should generate the fromStream ExampleView.svelte', () => {
      fileIndex = 5;
      const file = service.generatedSvelteFiles(fileConfig)[fileIndex];

      expect(file.name).toBe('ExampleView.svelte');
      expect(file.type).toBe('fromStream');

      const contents = normalize(file.contents);

      expect(contents).toContain(
        'let snapshot = $derived(cell.exampleCell.state);'
      );
      expect(contents).not.toContain('Subscription');
      expect(contents).not.toContain('onDestroy');
      expect(contents).not.toContain('exampleState$');
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
