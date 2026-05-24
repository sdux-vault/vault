// behavior-instance.shape.ts

import { FileBuilderModeType } from '../types/file-builder/file-builder-mode.type';
import { BehaviorIdType } from '../types/id/behavior-id.type';
import { StageIdType } from '../types/id/stage-id.type';
import { StateFrameworkType } from '../types/state-framework.type';

export interface BehaviorInstanceShape {
  /** Which behavior definition this refers to */
  behaviorId: BehaviorIdType;

  /** Which stage this belongs to (denormalized for fast lookup) */
  stageId: StageIdType;

  /** Was this behavior selected by the user */
  selected: boolean | null;

  /** Was this behavior selected by the user */
  default: boolean | null;

  /** Are all required params satisfied */
  complete: boolean | null;

  mode?: FileBuilderModeType;

  /** Parameter values chosen by the user */
  params?: Record<string, unknown>;

  frameworks: StateFrameworkType[];
}
