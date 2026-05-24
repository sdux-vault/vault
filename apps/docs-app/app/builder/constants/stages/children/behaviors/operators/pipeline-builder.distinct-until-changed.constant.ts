import { PIPELINE_BUILDER_DISTINCT_UNTIL_CHANGED_COMPARE_AI_ASSIST_CONSTANT } from 'apps/docs-app/app/builder/constants/ai-assist/distinct-until-changed.ai-assist.constant';
import { FileBuilderArgStyleTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-arg-style.type';
import { PipelineOperatorsWithDistinctUntilChangedComponent } from '../../../../../../docs/pipeline/behaviors/components/operators/distinct-until-changed/with-distinct-until-changed.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { FileBuilderApiTypes } from '../../../../../types/file-builder/file-builder-api.type';
import { FileBuilderEmitTypes } from '../../../../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleTypes } from '../../../../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetTypes } from '../../../../../types/file-builder/file-builder-target.type';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderDistinctUntilChangedConstant: BehaviorDefinitionShape =
  {
    /** Stable identifier */
    id: BehaviorIdTypes.WithDistinctUntilChangedBehavior,

    /** Owning stage */
    parentId: StageIdTypes.Operator,

    /** UI copy */
    label: 'Distinct Until Changed',
    question: 'Should identical consecutive pipeline values be suppressed?',

    description:
      'Prevents redundant pipeline execution by suppressing emissions when the resolved and merged pipeline value is equivalent to the previously emitted value.',

    /**
     * Optional comparison function
     */
    params: [
      {
        key: 'compare',
        label: 'Custom Comparison Function',
        type: 'function',
        defaultValue: '(a, b) => a === b',
        optional: true,
        hint: `Must be a pure comparison function. Example: <code>(a, b) => a === b</code>`,
        placeholder: '(a, b) => a === b'
      }
    ],

    /** Documentation renderer */
    documentationComponentReference:
      PipelineOperatorsWithDistinctUntilChangedComponent,

    aiAssist:
      PIPELINE_BUILDER_DISTINCT_UNTIL_CHANGED_COMPARE_AI_ASSIST_CONSTANT,

    /**
     * ─────────────────────────────
     * Code emission metadata
     * ─────────────────────────────
     */
    code: [
      {
        /** Operators attach via fluent API */
        target: FileBuilderTargetTypes.Vault,

        /** Fluent API group */
        api: FileBuilderApiTypes.Operators,

        /** Function call emission */
        emit: FileBuilderEmitTypes.Call,

        /** Exported function symbol */
        symbol: 'withDistinctUntilChanged',

        /** Functional operator */
        role: FileBuilderRoleTypes.Functional,

        argStyle: FileBuilderArgStyleTypes.Object,

        import: '@sdux-vault/addons',

        /**
         * Order within operator stage
         * (respects array order during .operators([...]))
         */
        order: 0
      }
    ]
  };
