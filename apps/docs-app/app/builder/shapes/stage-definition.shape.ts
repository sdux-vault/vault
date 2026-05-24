import { Type } from '@angular/core';
import { BehaviorSelectionModeType } from '../types/behavior-selection-mode.type';
import { FileBuilderModeType } from '../types/file-builder/file-builder-mode.type';
import { BehaviorIdType } from '../types/id/behavior-id.type';
import { StageIdType } from '../types/id/stage-id.type';
import { SelectionModeType } from '../types/selection-mode.type';
import { StageStatusType } from '../types/stage-status.type';

export interface StageDefinitionShape {
  id: StageIdType;
  label: string;
  shortDescription?: string;

  mode?: FileBuilderModeType;

  description: string;
  note?: string;
  question: string;

  /** What can be configured once selected */
  behaviors: BehaviorIdType[];

  selectionMode: SelectionModeType;
  behaviorSelectionMode: BehaviorSelectionModeType;

  selected?: boolean;
  status?: StageStatusType;
  disabled?: boolean;

  /** Optional documentation renderer */
  documentationComponentReference?: Type<unknown>;
}
