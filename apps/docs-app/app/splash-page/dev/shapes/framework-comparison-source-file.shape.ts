import type { FrameworkFileType } from '../type/framework-file.type';

export type FrameworkComparisonSourceFileShape = {
  readonly type: FrameworkFileType;
  readonly fileName: string;
  readonly source: string;
  readonly numberedSource: string;
};
