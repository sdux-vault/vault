import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderCallStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-call-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { ParameterTypes } from 'apps/docs-app/app/builder/types/parameter.type';
import { PipelineLookupBehaviorComponent } from 'apps/docs-app/app/docs/pipeline/behaviors/components/entity-access/lookup/lookup.behavior.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderLookupConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithLookupBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Lookup,

  /** UI label */
  label: 'Lookup',

  question:
    'Do you want to enable identifier-based entity lookup coordinated through the state pipeline?',

  description:
    'Extends the FeatureCell with deterministic identifier-based lookup. ' +
    'Lookup resolution and concurrent fan-out are coordinated through the state pipeline and populated exclusively from finalized state emissions.',

  /**
   * Lookup configuration parameters
   */
  params: [
    {
      key: 'idKey',
      label: 'Entity Identifier Key',
      type: ParameterTypes.String,
      defaultValue: 'id',
      optional: false,
      hint: 'Property name used to extract a unique identifier from resolved entities.'
    },
    {
      key: 'fetchType',
      label: 'Fetch Resolve Type',
      type: ParameterTypes.Select,
      defaultValue: 'ResolveTypes.Promise',
      options: [
        {
          label: 'HTTP resource',
          value: 'ResolveTypes.HttpResource'
        },
        {
          label: 'Observable',
          value: 'ResolveTypes.Observable'
        },
        {
          label: 'Promise',
          value: 'ResolveTypes.Promise'
        },
        {
          label: 'Synchronous value',
          value: 'ResolveTypes.Value'
        }
      ],
      optional: false,
      hint: 'Determines how lookup resolution is executed through the FeatureCell pipeline when an entity is not already resolved.'
    },
    {
      key: 'fetch',
      label: 'Fetch Function',
      type: ParameterTypes.Function,
      defaultValue: `(id) => fetchEntityById(id)`,
      optional: false,
      hint: 'Function invoked when an entity is not found in lookup state. The returned value is merged through the pipeline using the configured resolve strategy.',
      placeholder: `(id) => fetchEntityById(id)`
    }
  ],

  /** Documentation renderer */
  documentationComponentReference: PipelineLookupBehaviorComponent,

  /**
   * ─────────────────────────────
   * Code emission metadata
   * ─────────────────────────────
   */
  code: [
    /**
     * Structural registration
     */
    {
      target: FileBuilderTargetTypes.FeatureCell,
      api: FileBuilderApiTypes.Behaviors,
      emit: FileBuilderEmitTypes.Reference,
      symbol: 'withLookupBehavior',
      role: FileBuilderRoleTypes.Structural,
      import: '@sdux-vault/addons',
      order: 0
    },

    /**
     * Fluent configuration
     */
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.Lookup,
      emit: FileBuilderEmitTypes.Call,
      symbol: 'withLookup',
      role: FileBuilderRoleTypes.Functional,
      callStyle: FileBuilderCallStyleTypes.Fluent,
      argStyle: FileBuilderArgStyleTypes.Object,
      order: 1
    }
  ]
};
