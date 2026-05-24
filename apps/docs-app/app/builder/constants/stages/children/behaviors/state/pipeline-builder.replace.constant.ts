import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { PipelineCoreStateBehaviorComponent } from '../../../../../../docs/pipeline/behaviors/components/state/with-core-state.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderReplaceStateConstant: BehaviorDefinitionShape = {
  id: BehaviorIdTypes.WithReplaceStateBehavior,

  parentId: StageIdTypes.UpdateStrategy,

  mode: 'basic',

  label: 'Replace Existing State',

  question:
    'Should the next state value completely replace the existing state?',

  description:
    'Discards the current state and replaces it entirely with the next computed value produced by the reducer stage.',

  note: FileBuilderNoteTypes.CoreBehaviorWithoutFluentApi,

  params: [],

  documentationComponentReference: PipelineCoreStateBehaviorComponent,

  code: []
};
