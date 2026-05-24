import { FileBuilderApiType } from '../../types/file-builder/file-builder-api.type';
import { FileBuilderArgStyleType } from '../../types/file-builder/file-builder-arg-style.type';
import { FileBuilderCallStyleType } from '../../types/file-builder/file-builder-call-style.type';
import { FileBuilderEmitType } from '../../types/file-builder/file-builder-emit.type';
import { FileBuilderRoleType } from '../../types/file-builder/file-builder-role.type';
import { FileBuilderTargetType } from '../../types/file-builder/file-builder-target.type';

export interface FileBuilderCodeShape {
  /**
   * Where this behavior attaches
   */
  target: FileBuilderTargetType;

  /**
   * Fluent API group
   */
  api: FileBuilderApiType;

  /**
   * How this behavior is emitted
   *
   * - call      → withDebounce(300)
   * - reference → withReplayGlobalErrorController
   */
  emit?: FileBuilderEmitType;

  /**
   * Function or class symbol name
   */
  symbol: string;

  /**
   * Optional import source
   */
  import?: string;

  /**
   * Structural behaviors affect topology
   * (controllers vs functional modifiers)
   */
  role?: FileBuilderRoleType;

  callStyle?: FileBuilderCallStyleType;

  argStyle?: FileBuilderArgStyleType;

  /**
   * Optional ordering hint within the same API group
   */
  order?: number;
}
