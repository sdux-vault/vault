import { FrameworkComparisonImplementationShape } from './framework-comparison-implementation.shape';

export type FrameworkComparisonPairShape = {
  readonly id: string;
  readonly selectorLabel: string;
  readonly displayCeremony: boolean;
  readonly sharedSetupFileNames?: readonly string[];
  readonly left: FrameworkComparisonImplementationShape;
  readonly right: FrameworkComparisonImplementationShape;
};
