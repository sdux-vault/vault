import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderExampleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-example.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { FileBuilderTemplateTokenTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-template-token.type';
import { FileBuilderUpdateStrategyType } from 'apps/docs-app/app/builder/types/file-builder/file-builder-update-strategy.type';
import { StateFrameworkTypes } from 'apps/docs-app/app/builder/types/state-framework.type';
import { PipelineCoreObservableBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/resolve/core-observable/core-observable.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreObservableConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithCoreObservableBehavior,

  mode: FileBuilderModeTypes.Basic,

  /** Resolve stage ownership */
  parentId: StageIdTypes.Resolve,

  /** UI copy */
  label: 'Resolve Observable Inputs',
  question:
    'If your state input is an Observable<T>, should the pipeline resolve it to a single emitted value before continuing?',
  description:
    'Subscribes to Observable<T> inputs during pipeline execution and resolves a single emitted value before passing it downstream.',

  note: FileBuilderNoteTypes.CoreBehaviorWithoutFluentApi,

  /** No configuration parameters */
  params: [],

  code: [
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.None,
      symbol: 'of',
      import: 'rxjs'
    }
  ],

  /** Documentation renderer */
  documentationComponentReference: PipelineCoreObservableBehaviorComponent,
  example: [
    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Replace state using an Observable.',
        ' */',
        `replaceByObservable(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  this.${FileBuilderTemplateTokenTypes.Vault}.replaceState(`,
        `    of(${FileBuilderTemplateTokenTypes.Input})`,
        '  );',
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Merge state using an Observable.',
        ' */',
        `mergeByObservable(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  this.${FileBuilderTemplateTokenTypes.Vault}.mergeState(`,
        `    of(${FileBuilderTemplateTokenTypes.Input})`,
        '  );',
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate Observable-based replace to the service.',
        ' *',
        ' * The component does NOT mutate state directly.',
        ' * Instead, it forwards the intent to the service,',
        ' * which owns the Vault and pipeline configuration.',
        ' *',
        ' * Architectural Flow:',
        ' * Component → Service → Vault → Pipeline',
        ' */',
        `loadSample(): void {`,
        `  const sample = ${FileBuilderTemplateTokenTypes.ExampleLiteral};`,
        `  this.${FileBuilderTemplateTokenTypes.InstantiatedServiceName}.replaceByObservable(sample);`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate Observable-based merge to the service.',
        ' *',
        ' * The component does NOT mutate state directly.',
        ' * Instead, it forwards the intent to the service,',
        ' * which owns the Vault and pipeline configuration.',
        ' *',
        ' * Architectural Flow:',
        ' * Button Click',
        ' *   → Component method',
        ' *   → Service method',
        ' *   → Vault update',
        ' *   → Pipeline execution',
        ' *   → Reactive UI refresh',
        ' */',
        `loadSample(): void {`,
        `  const sample = ${FileBuilderTemplateTokenTypes.ExampleLiteral};`,
        `  this.${FileBuilderTemplateTokenTypes.InstantiatedServiceName}.mergeByObservable(sample);`,
        '}'
      ]
    },

    // ---------------------------------------------------------------------
    // REACT SERVICE – MODULE-SCOPE EXPORTED FUNCTIONS
    // ---------------------------------------------------------------------

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.React,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Replace state using an Observable.',
        ' */',
        `export function replaceByObservable(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState(`,
        `    of(${FileBuilderTemplateTokenTypes.Input})`,
        '  );',
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.React,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Merge state using an Observable.',
        ' */',
        `export function mergeByObservable(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState(`,
        `    of(${FileBuilderTemplateTokenTypes.Input})`,
        '  );',
        '}'
      ]
    },

    // ---------------------------------------------------------------------
    // REACT COMPONENT – FUNCTION-SCOPE HANDLERS
    // ---------------------------------------------------------------------

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.React,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate Observable-based replace to the cell module.',
        ' *',
        ' * The component does NOT mutate state directly.',
        ' * Instead, it forwards the intent to the cell module,',
        ' * which owns the Vault and pipeline configuration.',
        ' *',
        ' * Architectural Flow:',
        ' * Component → Cell module → Vault → Pipeline',
        ' */',
        `const loadSample = (): void => {`,
        `  const sample = ${FileBuilderTemplateTokenTypes.ExampleLiteral};`,
        `  cell.replaceByObservable(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.React,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate Observable-based merge to the cell module.',
        ' *',
        ' * The component does NOT mutate state directly.',
        ' * Instead, it forwards the intent to the cell module,',
        ' * which owns the Vault and pipeline configuration.',
        ' *',
        ' * Architectural Flow:',
        ' * Button Click',
        ' *   → Component handler',
        ' *   → Cell module function',
        ' *   → Vault update',
        ' *   → Pipeline execution',
        ' *   → Reactive UI refresh',
        ' */',
        `const loadSample = (): void => {`,
        `  const sample = ${FileBuilderTemplateTokenTypes.ExampleLiteral};`,
        `  cell.mergeByObservable(sample);`,
        '};'
      ]
    },

    // ---------------------------------------------------------------------
    // VUE SERVICE – MODULE-SCOPE EXPORTED FUNCTIONS
    // ---------------------------------------------------------------------

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Vue,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Replace state using an Observable.',
        ' */',
        `export function replaceByObservable(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState(`,
        `    of(${FileBuilderTemplateTokenTypes.Input})`,
        '  );',
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Vue,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Merge state using an Observable.',
        ' */',
        `export function mergeByObservable(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState(`,
        `    of(${FileBuilderTemplateTokenTypes.Input})`,
        '  );',
        '}'
      ]
    },

    // ---------------------------------------------------------------------
    // VUE COMPONENT – SCRIPT SETUP HANDLERS
    // ---------------------------------------------------------------------

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Vue,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate Observable-based replace to the cell module.',
        ' *',
        ' * The component does NOT mutate state directly.',
        ' * Instead, it forwards the intent to the cell module,',
        ' * which owns the Vault and pipeline configuration.',
        ' *',
        ' * Architectural Flow:',
        ' * Component → Cell module → Vault → Pipeline',
        ' */',
        `const loadSample = (): void => {`,
        `  const sample = ${FileBuilderTemplateTokenTypes.ExampleLiteral};`,
        `  cell.replaceByObservable(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Vue,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate Observable-based merge to the cell module.',
        ' *',
        ' * The component does NOT mutate state directly.',
        ' * Instead, it forwards the intent to the cell module,',
        ' * which owns the Vault and pipeline configuration.',
        ' *',
        ' * Architectural Flow:',
        ' * Button Click',
        ' *   → Component handler',
        ' *   → Cell module function',
        ' *   → Vault update',
        ' *   → Pipeline execution',
        ' *   → Reactive UI refresh',
        ' */',
        `const loadSample = (): void => {`,
        `  const sample = ${FileBuilderTemplateTokenTypes.ExampleLiteral};`,
        `  cell.mergeByObservable(sample);`,
        '};'
      ]
    },

    // ---------------------------------------------------------------------
    // SVELTE SERVICE – MODULE-SCOPE EXPORTED FUNCTIONS
    // ---------------------------------------------------------------------

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Svelte,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Replace state using an Observable.',
        ' */',
        `export function replaceByObservable(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState(`,
        `    of(${FileBuilderTemplateTokenTypes.Input})`,
        '  );',
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Svelte,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Merge state using an Observable.',
        ' */',
        `export function mergeByObservable(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState(`,
        `    of(${FileBuilderTemplateTokenTypes.Input})`,
        '  );',
        '}'
      ]
    },

    // ---------------------------------------------------------------------
    // SVELTE COMPONENT – SCRIPT HANDLERS
    // ---------------------------------------------------------------------

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Svelte,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate Observable-based replace to the cell module.',
        ' *',
        ' * The component does NOT mutate state directly.',
        ' * Instead, it forwards the intent to the cell module,',
        ' * which owns the Vault and pipeline configuration.',
        ' *',
        ' * Architectural Flow:',
        ' * Component → Cell module → Vault → Pipeline',
        ' */',
        `const loadSample = (): void => {`,
        `  const sample = ${FileBuilderTemplateTokenTypes.ExampleLiteral};`,
        `  cell.replaceByObservable(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Svelte,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate Observable-based merge to the cell module.',
        ' *',
        ' * The component does NOT mutate state directly.',
        ' * Instead, it forwards the intent to the cell module,',
        ' * which owns the Vault and pipeline configuration.',
        ' *',
        ' * Architectural Flow:',
        ' * Button Click',
        ' *   → Component handler',
        ' *   → Cell module function',
        ' *   → Vault update',
        ' *   → Pipeline execution',
        ' *   → Reactive UI refresh',
        ' */',
        `const loadSample = (): void => {`,
        `  const sample = ${FileBuilderTemplateTokenTypes.ExampleLiteral};`,
        `  cell.mergeByObservable(sample);`,
        '};'
      ]
    }
  ]
};
