import { BehaviorSelectionModeType } from '../types/behavior-selection-mode.type';
import { FileBuilderModeType } from '../types/file-builder/file-builder-mode.type';
import { StageIdType } from '../types/id/stage-id.type';
import { StageStatusType } from '../types/stage-status.type';

export interface StageInstanceShape {
  stageId: StageIdType;

  /** Step 1 */
  selected: boolean | null;

  /** Step 2 navigation */
  status: StageStatusType;

  mode?: FileBuilderModeType;

  /** Optional — for ordering */
  index: number;

  behaviorSelectionMode: BehaviorSelectionModeType;
}
