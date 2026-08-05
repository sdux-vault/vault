import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendArrayByIdMergeFunction } from './extend-array-by-id-merge.function';

describe('Function: extendArrayByIdMerge', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseModel stub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach array by id merge method to the cell', () => {
    extendArrayByIdMergeFunction(cell);

    expect(typeof cell.withArrayMergeId).toBe('function');
  });

  describe('withArrayMergeId', () => {
    it('should throw a clear error when withArrayMergeId behavior is not installed', () => {
      extendArrayByIdMergeFunction(cell);

      expect(() => {
        cell.withArrayMergeId!(Object({}));
      }).toThrowError('[vault] withArrayMergeId() behavior not installed');
    });
  });
});
