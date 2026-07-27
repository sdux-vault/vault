import { FrameworkComparisonSourceFileShape } from './framework-comparison-source-file.shape';
import { FrameworkComparisonLineMetadataShape } from './framework-comparison-line-metadata.shape';

export type FrameworkComparisonImplementationShape = {
  readonly frameworkLabel: string;
  readonly libraryLabel: string;
  readonly files: readonly FrameworkComparisonSourceFileShape[];
  readonly metadata?: FrameworkComparisonLineMetadataShape;
  readonly usesSduxBrandName?: boolean;
};
