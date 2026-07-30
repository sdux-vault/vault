import { Injectable } from '@angular/core';
import type { ExampleFileShape } from '../shape/example-file.shape';
import type { ExampleFileType } from '../types/example-file.type';

/**
 * Resolves one generated tutorial source entry from a file collection by its declared type.
 */
@Injectable({ providedIn: 'root' })
export class ExampleFileService {
  /**
   * Returns the first generated tutorial file whose type matches the requested category.
   * @param files - Candidate tutorial source entries available to search.
   * @param type - File category to match against the generated source entries.
   * @returns The matching tutorial source entry, or undefined when no file has the requested type.
   */
  getFile(
    files: readonly ExampleFileShape[],
    type: ExampleFileType
  ): ExampleFileShape {
    return files.find((file) => file.type === type) || ({} as ExampleFileShape);
  }
}
