import { FileBuilderNoteTypes } from 'apps/docs-app/app/builder/types/file-builder/file-builder-note.type';
import { PipelineCoreStateBehaviorComponent } from '../../../../../../docs/pipeline/behaviors/components/state/with-core-state.pipeline.component';
import { BehaviorDefinitionShape } from '../../../../../shapes/behavior-definition.shape';
import { BehaviorIdTypes } from '../../../../../types/id/behavior-id.type';
import { StageIdTypes } from '../../../../../types/id/stage-id.type';

export const PipelineBuilderMergeStateConstant: BehaviorDefinitionShape = {
  id: BehaviorIdTypes.WithMergeStateBehavior,

  parentId: StageIdTypes.UpdateStrategy,

  mode: 'basic',

  label: 'Merge Into Existing State',

  question:
    'Should the next state value be merged into the existing state instead of replacing it entirely?',

  note: FileBuilderNoteTypes.CoreBehaviorWithoutFluentApi,

  description:
    'Preserves existing state properties and merges the next value into the current state object. Only explicitly updated properties are overwritten.',

  params: [],

  documentationComponentReference: PipelineCoreStateBehaviorComponent,

  code: []
};
