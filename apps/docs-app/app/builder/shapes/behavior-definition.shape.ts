import { Type } from '@angular/core';
import { FileBuilderExampleShape } from '../shapes/file-builder/file-builder-example.shape';
import { FileBuilderModeType } from '../types/file-builder/file-builder-mode.type';
import { FileBuilderNoteType } from '../types/file-builder/file-builder-note.type';
import { BehaviorIdType } from '../types/id/behavior-id.type';
import { StageIdType } from '../types/id/stage-id.type';
import { StateFrameworkType } from '../types/state-framework.type';
import { FileBuilderCodeShape } from './file-builder/file-builder-code.shape';
import { ParameterDefinition } from './parameter-definition.shape';

export interface BehaviorDefinitionShape {
  /** Stable identifier */
  id: BehaviorIdType;

  /** Owning stage */
  parentId: StageIdType;

  mode?: FileBuilderModeType;

  frameworks?: StateFrameworkType[];

  /** UI copy */
  label: string;
  question: string;
  description?: string;

  disabledNote?: string;

  /** Optional UI helpers */

  selected?: boolean;
  complete?: boolean;
  disabled?: boolean;
  default?: boolean;

  /** Optional configuration parameters */
  params?: ParameterDefinition[];

  note?: FileBuilderNoteType;

  aiAssist?: string;

  /** Optional documentation renderer */
  documentationComponentReference?: Type<unknown>;

  /**
   * ─────────────────────────────
   * Code emission metadata
   * ─────────────────────────────
   */
  code?: FileBuilderCodeShape[];

  example?: FileBuilderExampleShape[];
}
