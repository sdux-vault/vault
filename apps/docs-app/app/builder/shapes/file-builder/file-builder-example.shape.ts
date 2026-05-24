import { FileBuilderExampleType } from '../../types/file-builder/file-builder-example.type';
import { FileBuilderUpdateStrategyType } from '../../types/file-builder/file-builder-update-strategy.type';
import { StateFrameworkType } from '../../types/state-framework.type';

export interface FileBuilderExampleShape {
  /**
   * Where this example should be generated
   */
  target: FileBuilderExampleType;

  /**
   * Optional framework constraint
   * (Angular, React, Vue, etc.)
   */
  framework?: StateFrameworkType;

  updateStrategy?: FileBuilderUpdateStrategyType;

  /**
   * Ordered method/template lines.
   * Builder controls indentation and spacing.
   */
  template: string[];
}
