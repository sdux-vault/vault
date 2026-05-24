import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendStepwiseResolveFunction } from './extend-stepwise-resolve.function';

describe('Function: extendStepwiseResolve', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseModel stub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach withStepwiseResolve methods to the cell', () => {
    extendStepwiseResolveFunction(cell);

    expect(typeof cell.withStepwiseResolve).toBe('function');
  });

  describe('withStepwiseResolve', () => {
    it('should throw a clear error when withStepwiseResolve behavior is not installed', () => {
      extendStepwiseResolveFunction(cell);

      expect(() => {
        cell.withStepwiseResolve!(Object({}));
      }).toThrowError('[vault] withStepwiseResolve() behavior not installed');
    });
  });
});
