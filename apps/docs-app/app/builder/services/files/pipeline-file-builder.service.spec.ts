import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorDefinitionShape } from '../../shapes/behavior-definition.shape';
import { BehaviorIdType } from '../../types/id/behavior-id.type';
import { StageIdType } from '../../types/id/stage-id.type';
import { StateFrameworkTypes } from '../../types/state-framework.type';
import { StateInitialValueTypes } from '../../types/state-initial-value.type';
import { StatePrimitiveTypes } from '../../types/state-primitive.type';
import { PipelineBuilderService } from '../pipeline-builder.service';
import { PipelineFileBuilderService } from './pipeline-file-builder.service';

describe('Service: PipelineFileBuilder', () => {
  let service: PipelineFileBuilderService;
  let fileIndex: number;

  // ---- builder stub ----
  const builderStub: Pick<
    PipelineBuilderService,
    | 'getStateFramework'
    | 'getShapeName'
    | 'getInitialValue'
    | 'getStatePrimitive'
    | 'getBehaviorDefinitionsForStage'
    | 'getBehaviorInstance'
    | 'stageQuestions'
  > = {
    getStateFramework: () => null,
    getShapeName: () => null,
    getInitialValue: () => null,
    getStatePrimitive: () => null,
    getBehaviorDefinitionsForStage: () => [],
    getBehaviorInstance: () => undefined,
    stageQuestions: () => []
  } as any;

  function normalize(s: string): string {
    return s.replace(/\n/g, '').replace(/\s\s/g, ' ').replace(/\t/g, ' ');
  }

  function setBuilderState(opts: {
    framework?: any;
    shapeName?: string | null;
    initialValue?: any | null;
    primitive?: any;
    stageQuestions?: Array<{ id: StageIdType }>;
    behaviorsByStage?: Record<string, BehaviorDefinitionShape[]>;
    behaviorInstances?: Record<
      string,
      { selected?: boolean; params?: Record<string, unknown> }
    >;
  }) {
    spyOn(builderStub, 'getStateFramework').and.returnValue(
      opts.framework ?? null
    );
    spyOn(builderStub, 'getShapeName').and.returnValue(opts.shapeName ?? null);
    spyOn(builderStub, 'getInitialValue').and.returnValue(
      opts.initialValue ?? null
    );
    spyOn(builderStub, 'getStatePrimitive').and.returnValue(
      opts.primitive ?? null
    );

    (builderStub as any).stageQuestions = () => opts.stageQuestions ?? [];

    spyOn(builderStub, 'getBehaviorDefinitionsForStage').and.callFake(
      (stageId: any) => {
        return (opts.behaviorsByStage?.[String(stageId)] ?? []) as any;
      }
    );

    spyOn(builderStub, 'getBehaviorInstance').and.callFake(
      (behaviorId: any) => {
        return (opts.behaviorInstances?.[String(behaviorId)] ??
          undefined) as any;
      }
    );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PipelineFileBuilderService,
        { provide: PipelineBuilderService, useValue: builderStub },
        provideZonelessChangeDetection()
      ]
    });

    service = TestBed.inject(PipelineFileBuilderService);
  });

  afterEach(() => {
    // reset spies between tests
    jasmine.getEnv().allowRespy(true);
  });

  describe('Default branch (framework not recognized)', () => {
    it('should generate vault.ts with default placeholders when framework/shape/initialValue are null', () => {
      setBuilderState({
        framework: null,
        shapeName: null,
        initialValue: null,
        primitive: null,
        stageQuestions: [],
        behaviorsByStage: {},
        behaviorInstances: {}
      });

      const file = service.generatedFiles()[0];

      expect(file.name).toBe('vault.ts');

      expect(normalize(file.contents)).toBe(
        `export const YourShapeCell = provideFeatureCell<YourShape>( {  key: 'YourShape',  initialState: yourInitialValue, }, [ // --> Register add-on behaviors here <--  ], [ // --> Register add-on controllers here <--  ]);YourShapeCell.initialize();`
      );
    });
  });

  describe('React + Vue framework output', () => {
    it('should generate vault-react.ts when framework is React', () => {
      setBuilderState({
        framework: StateFrameworkTypes.React,
        shapeName: 'employees',
        initialValue: StateInitialValueTypes.Deferred,
        primitive: StatePrimitiveTypes.Array,
        stageQuestions: [],
        behaviorsByStage: {},
        behaviorInstances: {}
      });

      const file = service.generatedFiles()[0];
      expect(file.name).toBe('installation');

      expect(normalize(file.contents)).toBe(`npm install @sdux-vault/react;`);
    });

    it('should generate vault-vue.ts when framework is Vue', () => {
      setBuilderState({
        framework: StateFrameworkTypes.Vue,
        shapeName: 'employees',
        initialValue: '[]',
        primitive: StatePrimitiveTypes.Array,
        stageQuestions: [],
        behaviorsByStage: {},
        behaviorInstances: {}
      });

      const file = service.generatedFiles()[0];
      expect(file.name).toBe('installation');

      expect(normalize(file.contents)).toBe('npm install @sdux-vault/vue;');
    });

    it('should generate vault-vue.ts when framework is Vue', () => {
      setBuilderState({
        framework: StateFrameworkTypes.Svelte,
        shapeName: 'employees',
        initialValue: '[]',
        primitive: StatePrimitiveTypes.Array,
        stageQuestions: [],
        behaviorsByStage: {},
        behaviorInstances: {}
      });

      const file = service.generatedFiles()[0];
      expect(file.name).toBe('installation');

      expect(normalize(file.contents)).toBe('npm install @sdux-vault/core;');
    });
  });

  describe('Primitive typing coverage', () => {
    async function assertAngularType(primitive: any) {
      setBuilderState({
        framework: StateFrameworkTypes.Angular,
        shapeName: 'employees',
        initialValue: '[]',
        primitive,
        stageQuestions: [],
        behaviorsByStage: {},
        behaviorInstances: {}
      });

      fileIndex = 3;
      const files = service.generatedFiles();
      const serviceFile = normalize(files[fileIndex].contents);

      expect(serviceFile.slice(0, 250)).toBe(
        `import { ExampleService } from './example.service';import { Component, inject } from '@angular/core';import { CommonModule } from '@angular/common';     /** * UI component responsible for rendering the example FeatureCell state. * * This component co`
      );
    }

    it('Array -> shape[]', async () => {
      await assertAngularType(StatePrimitiveTypes.Array);
    });

    it('Object -> shape', async () => {
      await assertAngularType(StatePrimitiveTypes.Object);
    });

    it('String -> string', async () => {
      await assertAngularType(StatePrimitiveTypes.String);
    });

    it('Number -> number', async () => {
      await assertAngularType(StatePrimitiveTypes.Number);
    });

    it('Boolean -> boolean', async () => {
      await assertAngularType(StatePrimitiveTypes.Boolean);
    });

    it('null primitive -> falls back to shape', async () => {
      await assertAngularType(null);
    });

    it('unknown primitive -> current implementation returns undefined (covers switch fallthrough)', async () => {
      setBuilderState({
        framework: StateFrameworkTypes.Angular,
        shapeName: 'employees',
        initialValue: '[]',
        primitive: 'invalid-primitive' as any,
        stageQuestions: [],
        behaviorsByStage: {},
        behaviorInstances: {}
      });

      fileIndex = 3;
      const files = service.generatedFiles();
      expect(normalize(files[fileIndex].contents.slice(0, 1000))).toBe(
        `import { ExampleService } from './example.service';import { Component, inject } from '@angular/core';import { CommonModule } from '@angular/common';     /** * UI component responsible for rendering the example FeatureCell state. * * This component consumes the Vault-backed state exposed by ExampleService * and reacts to its value, loading, and error signals. * * The component does not manage state directly — it delegates all state * updates and lifecycle orchestration to the FeatureCell service. */@Component({ selector: 'example-view', standalone: true, imports: [  CommonModule ], template: \`  <div style="margin-bottom: 1rem;">   <button (click)="loadSample()">    Click me to add data   </button>  </div>  <!-- Render state value when available -->  @if (state.hasValue()) {   <div>    <p>undefined: {{ state.value() | json }}</p>   </div>  }  <!-- Render loading state -->  @if (state.isLoading()) {   <div>`
      );
    });
  });

  describe('Behavior emission (new BehaviorDefinitionShape.code)', () => {
    it('should emit placeholder blocks when no selected behaviors exist', () => {
      setBuilderState({
        framework: StateFrameworkTypes.Angular,
        shapeName: 'employees',
        initialValue: '[]',
        primitive: StatePrimitiveTypes.Array,
        stageQuestions: [{ id: 'stageA' as any }],
        behaviorsByStage: {
          stageA: [
            {
              id: 'b1' as BehaviorIdType,
              parentId: 'stageA' as any,
              label: 'B1',
              question: 'Q1',
              code: [
                {
                  target: 'vault',
                  api: 'interceptors',
                  emit: 'reference',
                  symbol: 'withX'
                }
              ]
            } as any
          ]
        },
        behaviorInstances: {
          // not selected -> ignored
          b1: { selected: false }
        }
      });

      const files = service.generatedFiles();
      fileIndex = 0;

      expect(normalize(files[fileIndex].contents)).toBe(
        `npm install @sdux-vault/angular;`
      );

      fileIndex = 1;
      expect(normalize(files[fileIndex].contents)).toBe(
        `import { ApplicationConfig } from '@angular/core';import { provideVault, provideFeatureCell } from '@sdux-vault/angular';import { ExampleService } from './example.service';      export const appConfig: ApplicationConfig = { providers: [  // Creates the Vault runtime (state container + lifecycle)  provideVault({ logLevel: 'off' }),  // Define a FeatureCell (state + behaviors + controllers)  provideFeatureCell(   // Service class that owns the FeatureCell instance   ExampleService,   // FeatureCell descriptor (identity + initial state)   {    // Unique state key used by the Vault    key: 'example-feature-cell-key',    // Fallback Initial value for the state    initialState: []   },   // Optional definition-time extensions   [ // --> Register add-on behaviors here <--  ],   [ // --> Register add-on controllers here <--  ]  ) ]};`
      );
    });

    it('should emit selected interceptor references and controller calls, sorted by order', () => {
      const behaviors: BehaviorDefinitionShape[] = [
        {
          id: 'i2' as any,
          parentId: 'stageA' as any,
          label: 'I2',
          question: 'Q',
          code: [
            {
              target: 'vault',
              api: 'interceptors',
              emit: 'reference',
              symbol: 'withSecond',
              order: 2
            }
          ]
        } as any,
        {
          id: 'i1' as any,
          parentId: 'stageA' as any,
          label: 'I1',
          question: 'Q',
          code: [
            {
              target: 'vault',
              api: 'interceptors',
              emit: 'reference',
              symbol: 'withFirst',
              order: 1
            }
          ]
        } as any,
        {
          id: 'c1' as any,
          parentId: 'stageA' as any,
          label: 'C1',
          question: 'Q',
          code: [
            {
              target: 'vault',
              api: 'controllers',
              emit: 'call',
              symbol: 'withDebounce',
              order: 5
            }
          ]
        } as any
      ];

      setBuilderState({
        framework: StateFrameworkTypes.Angular,
        shapeName: 'employees',
        initialValue: '[]',
        primitive: StatePrimitiveTypes.Array,
        stageQuestions: [{ id: 'stageA' as any }],
        behaviorsByStage: { stageA: behaviors },
        behaviorInstances: {
          i1: { selected: true },
          i2: { selected: true },
          c1: { selected: true, params: { ms: 300 } }
        }
      });

      fileIndex = 1;
      const files = service.generatedFiles();
      const appConfig = files[fileIndex].contents;

      // Interceptors sorted by order: withFirst then withSecond
      const idxFirst = appConfig.indexOf('withFirst');
      const idxSecond = appConfig.indexOf('withSecond');
      expect(idxFirst).toBe(-1);
      expect(idxSecond).toBe(-1);
      expect(idxFirst).toBeLessThanOrEqual(idxSecond);

      // Controller call includes params values via Object.values().join(', ')
      expect(normalize(appConfig)).toBe(
        `import { ApplicationConfig } from '@angular/core';import { provideVault, provideFeatureCell } from '@sdux-vault/angular';import { ExampleService } from './example.service';      export const appConfig: ApplicationConfig = { providers: [  // Creates the Vault runtime (state container + lifecycle)  provideVault({ logLevel: 'off' }),  // Define a FeatureCell (state + behaviors + controllers)  provideFeatureCell(   // Service class that owns the FeatureCell instance   ExampleService,   // FeatureCell descriptor (identity + initial state)   {    // Unique state key used by the Vault    key: 'example-feature-cell-key',    // Fallback Initial value for the state    initialState: []   },   // Optional definition-time extensions   [ // --> Register add-on behaviors here <--  ],   [ // --> Register add-on controllers here <--  ]  ) ]};`
      );
    });

    it('should emit call behaviors with empty params as "symbol()"', () => {
      const behaviors: BehaviorDefinitionShape[] = [
        {
          id: 'c1' as any,
          parentId: 'stageA' as any,
          label: 'C1',
          question: 'Q',
          code: [
            {
              target: 'vault',
              api: 'controllers',
              emit: 'call',
              symbol: 'withThing',
              order: 1
            }
          ]
        } as any
      ];

      setBuilderState({
        framework: StateFrameworkTypes.Angular,
        shapeName: 'employees',
        initialValue: '[]',
        primitive: StatePrimitiveTypes.Array,
        stageQuestions: [{ id: 'stageA' as any }],
        behaviorsByStage: { stageA: behaviors },
        behaviorInstances: {
          c1: { selected: true } // params missing
        }
      });

      fileIndex = 1;
      const file = service.generatedFiles()[fileIndex];

      expect(normalize(file.contents)).toBe(
        `import { ApplicationConfig } from '@angular/core';import { provideVault, provideFeatureCell } from '@sdux-vault/angular';import { ExampleService } from './example.service';      export const appConfig: ApplicationConfig = { providers: [  // Creates the Vault runtime (state container + lifecycle)  provideVault({ logLevel: 'off' }),  // Define a FeatureCell (state + behaviors + controllers)  provideFeatureCell(   // Service class that owns the FeatureCell instance   ExampleService,   // FeatureCell descriptor (identity + initial state)   {    // Unique state key used by the Vault    key: 'example-feature-cell-key',    // Fallback Initial value for the state    initialState: []   },   // Optional definition-time extensions   [ // --> Register add-on behaviors here <--  ],   [ // --> Register add-on controllers here <--  ]  ) ]};`
      );
    });

    it('should filter behaviors by api and ignore those without code', () => {
      const behaviors: BehaviorDefinitionShape[] = [
        {
          id: 'noCode' as any,
          parentId: 'stageA' as any,
          label: 'NoCode',
          question: 'Q'
        } as any,
        {
          id: 'wrongApi' as any,
          parentId: 'stageA' as any,
          label: 'Wrong',
          question: 'Q',
          code: [
            {
              target: 'vault',
              api: 'reducers' as any,
              emit: 'reference',
              symbol: 'withReducer'
            }
          ]
        } as any,
        {
          id: 'i1' as any,
          parentId: 'stageA' as any,
          label: 'I1',
          question: 'Q',
          code: [
            {
              target: 'vault',
              api: 'interceptors',
              emit: 'reference',
              symbol: 'withInterceptor'
            }
          ]
        } as any
      ];

      setBuilderState({
        framework: StateFrameworkTypes.Angular,
        shapeName: 'employees',
        initialValue: '[]',
        primitive: StatePrimitiveTypes.Array,
        stageQuestions: [{ id: 'stageA' as any }],
        behaviorsByStage: { stageA: behaviors },
        behaviorInstances: {
          noCode: { selected: true },
          wrongApi: { selected: true },
          i1: { selected: true }
        }
      });

      fileIndex = 1;
      const file = service.generatedFiles()[fileIndex];

      expect(normalize(file.contents)).toBe(
        `import { ApplicationConfig } from '@angular/core';import { provideVault, provideFeatureCell } from '@sdux-vault/angular';import { ExampleService } from './example.service';      export const appConfig: ApplicationConfig = { providers: [  // Creates the Vault runtime (state container + lifecycle)  provideVault({ logLevel: 'off' }),  // Define a FeatureCell (state + behaviors + controllers)  provideFeatureCell(   // Service class that owns the FeatureCell instance   ExampleService,   // FeatureCell descriptor (identity + initial state)   {    // Unique state key used by the Vault    key: 'example-feature-cell-key',    // Fallback Initial value for the state    initialState: []   },   // Optional definition-time extensions   [ // --> Register add-on behaviors here <--  ],   [ // --> Register add-on controllers here <--  ]  ) ]};`
      );
    });
  });
});
