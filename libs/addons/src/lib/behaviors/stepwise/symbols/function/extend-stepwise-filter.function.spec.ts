import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendStepwiseFilterFunction } from './extend-stepwise-filter.function';

describe('Function: extendStepwiseFilter', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseModel stub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach withStepwiseFilter methods to the cell', () => {
    extendStepwiseFilterFunction(cell);

    expect(typeof cell.withStepwiseFilter).toBe('function');
  });

  describe('withStepwiseFilter', () => {
    it('should throw a clear error when withStepwiseFilter behavior is not installed', () => {
      extendStepwiseFilterFunction(cell);

      expect(() => {
        cell.withStepwiseFilter!(Object({}));
      }).toThrowError('[vault] withStepwiseFilter() behavior not installed');
    });
  });
});
