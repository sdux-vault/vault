import { FileBuilderExampleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-example.type';
import { FileBuilderModeTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-mode.type';
import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { FileBuilderTemplateTokenTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-template-token.type';
import { StateFrameworkTypes } from 'apps/docs-app/app/builder/types/state-framework.type';
import { PipelineCoreFromStreamBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/resolve/core-from-stream/core-from-stream.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderCoreFromStreamConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithCoreFromStreamBehavior,

  /** Owning stage (Resolve / Core stage) */
  parentId: StageIdTypes.Resolve,

  mode: FileBuilderModeTypes.Advanced,

  /** UI copy */
  label: 'fromStream Integration',
  question:
    'Should this FeatureCell subscribe to an observable stream and inject emitted values as state updates?',

  description:
    'Extends the FeatureCell with a fromStream() API that subscribes to an observable and forwards emitted values into the pipeline as state updates.',

  note: FileBuilderNoteTypes.CoreBehaviorWithoutFluentApi,

  /** No configuration parameters at definition time */
  params: [],

  /** Documentation renderer */
  documentationComponentReference: PipelineCoreFromStreamBehaviorComponent,

  example: [
    // ---------------------------------------------------------------------
    // SERVICE – STREAM CONNECTION
    // ---------------------------------------------------------------------

    {
      target: FileBuilderExampleTypes.Service,
      framework: StateFrameworkTypes.Angular,
      template: [
        '/**',
        ' * Connect an external observable stream to this FeatureCell.',
        ' *',
        ' * Each emitted value becomes a standard state update',
        ' * and flows through the normal Vault pipeline.',
        ' *',
        ' * Component → Service → Vault → Pipeline',
        ' */',
        `connectStream(source$: Observable<${FileBuilderTemplateTokenTypes.Type}>): void {`,
        `  this.${FileBuilderTemplateTokenTypes.Vault}.fromStream(source$);`,
        '}'
      ]
    },

    // ---------------------------------------------------------------------
    // COMPONENT – LIFECYCLE STREAM WIRING
    // ---------------------------------------------------------------------

    {
      target: FileBuilderExampleTypes.ComponentLifecycle,
      framework: StateFrameworkTypes.Angular,
      template: [
        '/**',
        ' * Lifecycle hook for stream initialization.',
        ' */',
        'ngOnInit(): void {',
        `  const stream$ = this.searchControl.valueChanges.pipe(`,
        '    debounceTime(500),',
        '    takeUntil(this.destroy$)',
        '  );',
        '',
        `  this.${FileBuilderTemplateTokenTypes.Vault}.mergeStream(stream$);`,
        '}'
      ]
    },

    {
      target: FileBuilderExampleTypes.ComponentLifecycle,
      framework: StateFrameworkTypes.Angular,
      template: [
        '/**',
        ' * Cleanup lifecycle hook.',
        ' */',
        'ngOnDestroy(): void {',
        '  this.destroy$.next();',
        '  this.destroy$.complete();',
        '}'
      ]
    }
  ]
};
