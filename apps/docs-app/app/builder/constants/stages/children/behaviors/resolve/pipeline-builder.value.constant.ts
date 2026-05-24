import { FileBuilderExampleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-example.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderTemplateTokenTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-template-token.type';
import { FileBuilderUpdateStrategyType } from 'apps/docs-app/app/builder/types/file-builder/file-builder-update-strategy.type';
import { StateFrameworkTypes } from 'apps/docs-app/app/builder/types/state-framework.type';
import { PipelineCoreValueBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/resolve/core-value/core-value.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreValueConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithCoreValueBehavior,

  mode: FileBuilderModeTypes.Basic,

  /** Resolve stage ownership */
  parentId: StageIdTypes.Resolve,

  /** UI copy */
  label: 'Value Resolve (Core)',
  question:
    'Should this FeatureCell normalize plain state values and structured state envelopes during resolution?',

  description:
    'Normalizes synchronous state inputs by extracting and standardizing the value field into a canonical upstream value for downstream processing.',

  note: FileBuilderNoteTypes.CoreBehaviorWithoutFluentApi,

  /** No configuration */
  params: [],

  /** Documentation renderer */
  documentationComponentReference: PipelineCoreValueBehaviorComponent,

  example: [
    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Replace the entire state synchronously.',
        ' */',
        `replace(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  this.${FileBuilderTemplateTokenTypes.Vault}.replaceState(`,
        `    {`,
        `      value: ${FileBuilderTemplateTokenTypes.Input},`,
        `    }`,
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
        ' * Merge state synchronously.',
        ' */',
        `merge(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  this.${FileBuilderTemplateTokenTypes.Vault}.mergeState(`,
        '    {',
        `      value: ${FileBuilderTemplateTokenTypes.Input}`,
        `    }`,
        '  );',
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate a full state merge to the FeatureCell service.',
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
        `  this.${FileBuilderTemplateTokenTypes.InstantiatedServiceName}.merge(sample);`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate a full state replacement to the FeatureCell service.',
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
        `  this.${FileBuilderTemplateTokenTypes.InstantiatedServiceName}.replace(sample);`,
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
        ' * Replace the entire state synchronously.',
        ' */',
        `export function replace(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState(`,
        `    {`,
        `      value: ${FileBuilderTemplateTokenTypes.Input},`,
        `    }`,
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
        ' * Merge state synchronously.',
        ' */',
        `export function merge(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState(`,
        '    {',
        `      value: ${FileBuilderTemplateTokenTypes.Input}`,
        `    }`,
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
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate a full state merge to the FeatureCell module.',
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
        `  cell.merge(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.React,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate a full state replacement to the FeatureCell module.',
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
        `  cell.replace(sample);`,
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
        ' * Replace the entire state synchronously.',
        ' */',
        `export function replace(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState(`,
        `    {`,
        `      value: ${FileBuilderTemplateTokenTypes.Input},`,
        `    }`,
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
        ' * Merge state synchronously.',
        ' */',
        `export function merge(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState(`,
        '    {',
        `      value: ${FileBuilderTemplateTokenTypes.Input}`,
        `    }`,
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
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate a full state merge to the FeatureCell module.',
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
        `  cell.merge(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Vue,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate a full state replacement to the FeatureCell module.',
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
        `  cell.replace(sample);`,
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
        ' * Replace the entire state synchronously.',
        ' */',
        `export function replace(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.replaceState(`,
        `    {`,
        `      value: ${FileBuilderTemplateTokenTypes.Input},`,
        `    }`,
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
        ' * Merge state synchronously.',
        ' */',
        `export function merge(${FileBuilderTemplateTokenTypes.Input}: ${FileBuilderTemplateTokenTypes.Type}): void {`,
        `  exampleCell.mergeState(`,
        '    {',
        `      value: ${FileBuilderTemplateTokenTypes.Input}`,
        `    }`,
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
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate a full state merge to the FeatureCell module.',
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
        `  cell.merge(sample);`,
        '};'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Svelte,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Delegate a full state replacement to the FeatureCell module.',
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
        `  cell.replace(sample);`,
        '};'
      ]
    }
  ]
};
