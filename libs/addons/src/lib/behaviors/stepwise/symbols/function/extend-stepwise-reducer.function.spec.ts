import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendStepwiseReducerFunction } from './extend-stepwise-reducer.function';

describe('Function: extendStepwiseReducer', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseModel stub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach withStepwiseReducer methods to the cell', () => {
    extendStepwiseReducerFunction(cell);

    expect(typeof cell.withStepwiseReducer).toBe('function');
  });

  describe('withStepwiseReducer', () => {
    it('should throw a clear error when withStepwiseReducer behavior is not installed', () => {
      extendStepwiseReducerFunction(cell);

      expect(() => {
        cell.withStepwiseReducer!(Object({}));
      }).toThrowError('[vault] withStepwiseReducer() behavior not installed');
    });
  });
});
