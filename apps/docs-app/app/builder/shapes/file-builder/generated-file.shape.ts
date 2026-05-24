import { FileType } from '../../types/file-builder/file.type';
import { StackblitzFileType } from '../../types/file-builder/stackblitz-file.type';

export interface GeneratedFileShape {
  id: string;
  name: string;
  contents: string;
  stackBlitzFileType?: StackblitzFileType;
  type: FileType;
}
