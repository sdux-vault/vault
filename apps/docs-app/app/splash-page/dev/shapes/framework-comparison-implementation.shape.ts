import { FrameworkComparisonSourceFileShape } from './framework-comparison-source-file.shape';

export type FrameworkComparisonImplementationShape = {
  readonly frameworkLabel: string;
  readonly libraryLabel: string;
  readonly files: readonly FrameworkComparisonSourceFileShape[];
  readonly usesSduxBrandName?: boolean;
};
