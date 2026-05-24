import { FileBuilderApiTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { FileBuilderCallStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-call-style.type';
import { FileBuilderEmitTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-target.type';
import { ParameterTypes } from 'apps/docs-app/app/builder/types/parameter.type';
import { PipelineStateCacheBehaviorComponent } from '../../../../../../docs/pipeline/behaviors/components/entity-access/state-cache/state-cache.behavior.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderStateCacheConstant: BehaviorDefinitionShape = {
  /** Stable identifier */
  id: BehaviorIdTypes.WithStateCacheBehavior,

  /** Owning stage */
  parentId: StageIdTypes.Cache,

  /** UI label */
  label: 'State Cache',

  question:
    'Do you want to enable TTL-based entity caching with coordinated cache lookup and refresh behavior?',

  description:
    'Extends the FeatureCell with TTL-based entity caching. Cache lookups, cache-miss resolution, and refresh are coordinated through the state pipeline and populated exclusively from finalized state emissions.',

  /**
   * State Cache configuration parameters
   */
  params: [
    {
      key: 'ttl',
      label: 'Time-To-Live (TTL)',
      type: ParameterTypes.Select,
      defaultValue: 'CacheTTL.FiveMinutes',
      options: [
        {
          label: '1 minute',
          value: 'CacheTTL.OneMinute'
        },
        {
          label: '5 minutes',
          value: 'CacheTTL.FiveMinutes'
        },
        {
          label: '10 minutes',
          value: 'CacheTTL.TenMinutes'
        },
        {
          label: '15 minutes',
          value: 'CacheTTL.FifteenMinutes'
        },
        {
          label: '30 minutes',
          value: 'CacheTTL.ThirtyMinutes'
        },
        {
          label: '1 hour',
          value: 'CacheTTL.OneHour'
        }
      ],
      optional: false,
      hint: 'Determines how long cached entities remain valid before requiring refresh through the pipeline.'
    },
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
      defaultValue: 'ResolveType.Promise',
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
      hint: 'Determines how cache-miss resolution is executed through the FeatureCell pipeline.'
    },
    {
      key: 'fetch',
      label: 'Fetch Function',
      type: ParameterTypes.Function,
      defaultValue: `(id) => fetchEntityById(id)`,
      optional: false,
      hint: 'Function invoked when a cache miss or TTL expiration occurs. The returned value is merged through the pipeline using the configured resolve strategy.',
      placeholder: `(id) => fetchEntityById(id)`
    }
  ],

  /** Documentation renderer */
  documentationComponentReference: PipelineStateCacheBehaviorComponent,

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
      symbol: 'withStateCacheBehavior',
      role: FileBuilderRoleTypes.Structural,
      import: '@sdux-vault/addons',
      order: 0
    },

    /**
     * Fluent configuration
     */
    {
      target: FileBuilderTargetTypes.Vault,
      api: FileBuilderApiTypes.StateCache,
      emit: FileBuilderEmitTypes.Call,
      symbol: 'withStateCache',
      role: FileBuilderRoleTypes.Functional,
      callStyle: FileBuilderCallStyleTypes.Fluent,
      argStyle: FileBuilderArgStyleTypes.Object,
      order: 1
    }
  ]
};
