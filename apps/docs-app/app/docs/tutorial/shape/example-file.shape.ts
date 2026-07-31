import type { ExampleFileType } from '../types/example-file.type';

/**
 * Describes one generated tutorial source entry exposed to the docs application.
 */
export interface ExampleFileShape {
  /** Identifies the generated tutorial file category. */
  readonly type: ExampleFileType;

  /** Provides the display and lookup name for the generated source file. */
  readonly fileName: string;

  /** Stores the full generated source text for the file entry. */
  readonly source: string;
}
