import { FileBuilderExampleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-example.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderTemplateTokenTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-template-token.type';
import { FileBuilderUpdateStrategyType } from 'apps/docs-app/app/builder/types/file-builder/file-builder-update-strategy.type';
import { StateFrameworkTypes } from 'apps/docs-app/app/builder/types/state-framework.type';
import { PipelineCorePromiseBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/resolve/core-promise/core-promise.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCorePromiseConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithCorePromiseBehavior,

  mode: FileBuilderModeTypes.Basic,

  /** Resolve stage ownership */
  parentId: StageIdTypes.Resolve,

  /** UI copy */
  label: 'Promise Resolve',
  question:
    'Should this FeatureCell resolve promise-backed state inputs submitted via replaceState or mergeState?',

  description:
    'Normalizes promise-backed state inputs by invoking a DeferredFactory and resolving the resulting value during pipeline execution.',

  note: FileBuilderNoteTypes.CoreBehaviorWithoutFluentApi,

  /** No configuration parameters */
  params: [],

  /** Documentation renderer */
  documentationComponentReference: PipelineCorePromiseBehaviorComponent,

  example: [
    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Replace state using a Promise.',
        ' *',
        ' * The resolved value becomes a full state replacement',
        ' * and flows through the normal Vault pipeline.',
        ' */',
        `replaceByPromise(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  this.${FileBuilderTemplateTokenTypes.Vault}.replaceState( { value: () => Promise.resolve(${FileBuilderTemplateTokenTypes.Input} ) } );`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Merge state using a Promise.',
        ' *',
        ' * The resolved value becomes a standard state update',
        ' * and flows through the normal Vault pipeline.',
        ' */',
        `mergeByPromise(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  this.${FileBuilderTemplateTokenTypes.Vault}.mergeState( { value: () => Promise.resolve(${FileBuilderTemplateTokenTypes.Input}) } );`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate Promise-based replacement to the service.',
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
        `  this.${FileBuilderTemplateTokenTypes.InstantiatedServiceName}.replaceByPromise(sample);`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate Promise-based merge to the service.',
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
        `  this.${FileBuilderTemplateTokenTypes.InstantiatedServiceName}.mergeByPromise(sample);`,
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
        ' * Replace state using a Promise.',
        ' *',
        ' * The resolved value becomes a full state replacement',
        ' * and flows through the normal Vault pipeline.',
        ' */',
        `export function replaceByPromise(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState( { value: () => Promise.resolve(${FileBuilderTemplateTokenTypes.Input} ) } );`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.React,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Merge state using a Promise.',
        ' *',
        ' * The resolved value becomes a standard state update',
        ' * and flows through the normal Vault pipeline.',
        ' */',
        `export function mergeByPromise(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState( { value: () => Promise.resolve(${FileBuilderTemplateTokenTypes.Input}) } );`,
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
        ' * Delegate Promise-based replacement to the cell module.',
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
        `  cell.replaceByPromise(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.React,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate Promise-based merge to the cell module.',
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
        `  cell.mergeByPromise(sample);`,
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
        ' * Replace state using a Promise.',
        ' *',
        ' * The resolved value becomes a full state replacement',
        ' * and flows through the normal Vault pipeline.',
        ' */',
        `export function replaceByPromise(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState( { value: () => Promise.resolve(${FileBuilderTemplateTokenTypes.Input} ) } );`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Vue,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Merge state using a Promise.',
        ' *',
        ' * The resolved value becomes a standard state update',
        ' * and flows through the normal Vault pipeline.',
        ' */',
        `export function mergeByPromise(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState( { value: () => Promise.resolve(${FileBuilderTemplateTokenTypes.Input}) } );`,
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
        ' * Delegate Promise-based replacement to the cell module.',
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
        `  cell.replaceByPromise(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Vue,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate Promise-based merge to the cell module.',
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
        `  cell.mergeByPromise(sample);`,
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
        ' * Replace state using a Promise.',
        ' *',
        ' * The resolved value becomes a full state replacement',
        ' * and flows through the normal Vault pipeline.',
        ' */',
        `export function replaceByPromise(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState( { value: () => Promise.resolve(${FileBuilderTemplateTokenTypes.Input} ) } );`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Svelte,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Merge state using a Promise.',
        ' *',
        ' * The resolved value becomes a standard state update',
        ' * and flows through the normal Vault pipeline.',
        ' */',
        `export function mergeByPromise(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState( { value: () => Promise.resolve(${FileBuilderTemplateTokenTypes.Input}) } );`,
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
        ' * Delegate Promise-based replacement to the cell module.',
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
        `  cell.replaceByPromise(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Svelte,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate Promise-based merge to the cell module.',
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
        `  cell.mergeByPromise(sample);`,
        '};'
      ]
    }
  ]
};
