import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderExampleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-example.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { FileBuilderTemplateTokenTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-template-token.type';
import { FileBuilderUpdateStrategyType } from 'apps/docs-app/app/builder/types/file-builder/file-builder-update-strategy.type';
import { StateFrameworkTypes } from 'apps/docs-app/app/builder/types/state-framework.type';
import { PipelineHttpResourceBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/resolve/http-resource/http-resource.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderHttpResourceConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithHttpResourceBehavior,

  frameworks: [StateFrameworkTypes.Angular],

  mode: FileBuilderModeTypes.Basic,

  /** Resolve stage ownership */
  parentId: StageIdTypes.Resolve,

  /** UI copy */
  label: 'HTTP Resource Resolve (Angular)',
  question:
    'Will this FeatureCell receive Angular HttpResourceRef<T> inputs that must be resolved reactively?',

  description:
    'Normalizes Angular HttpResourceRef<T> inputs by observing the resource signal and extracting a resolved value for downstream pipeline processing.',

  note: FileBuilderNoteTypes.CoreBehaviorWithoutFluentApi,

  /** No configuration */
  params: [],

  /** Documentation renderer */
  documentationComponentReference: PipelineHttpResourceBehaviorComponent,

  code: [
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.None,
      symbol: 'httpResource',
      import: '@angular/common/http'
    }
  ],

  example: [
    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Replace,
      template: [
        '/**',
        ' * Replace state using an Angular httpResource.',
        ' *',
        ' * Note:',
        ' * This example intentionally calls a non-existent endpoint.',
        ' * The resulting 404 error demonstrates how the FeatureCell',
        ' * pipeline automatically captures and exposes async errors',
        ' * via state.error().',
        '*/',
        'replaceByHttpResource(id: number): void {',
        `  this.${FileBuilderTemplateTokenTypes.Vault}.replaceState(`,
        `    httpResource<${FileBuilderTemplateTokenTypes.Type}>(() => \`/api/users/\${id}\`)`,
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
        ' * Merge state using an Angular httpResource.',
        ' *',
        ' * Note:',
        ' * This example intentionally calls a non-existent endpoint.',
        ' * The resulting 404 error demonstrates how the FeatureCell',
        ' * pipeline automatically captures and exposes async errors',
        ' * via state.error().',
        '*/',
        'mergeByHttpResource(id: number): void {',
        `  this.${FileBuilderTemplateTokenTypes.Vault}.mergeState(`,
        `    httpResource<${FileBuilderTemplateTokenTypes.Type}>(() => \`/api/users/\${id}\`)`,
        '  );',
        '}'
      ]
    },

    // ---------------------------------------------------------------------
    // COMPONENT METHODS
    // ---------------------------------------------------------------------

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
        `  const sampleId = 1;`,
        `  this.${FileBuilderTemplateTokenTypes.InstantiatedServiceName}.replaceByHttpResource(sampleId);`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.Component,
      framework: StateFrameworkTypes.Angular,
      updateStrategy: FileBuilderUpdateStrategyType.Merge,
      template: [
        '/**',
        ' * Delegate httpResource-based merge to the service.',
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
        `  const sampleId = 1;`,
        `  this.${FileBuilderTemplateTokenTypes.InstantiatedServiceName}.mergeByHttpResource(sampleId);`,
        '}'
      ]
    }
  ]
};
