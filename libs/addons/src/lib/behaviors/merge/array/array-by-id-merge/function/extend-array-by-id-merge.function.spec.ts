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

  it('should attach query methods to the cell', () => {
    extendArrayByIdMergeFunction(cell);

    expect(typeof cell.delete).toBe('function');
    expect(typeof cell.withArrayMergeId).toBe('function');
  });

  describe('delete()', () => {
    it('should throw a clear error when delete behavior is not installed', async () => {
      extendArrayByIdMergeFunction(cell);

      let caught: Error | undefined;

      try {
        await cell.delete!('123');
      } catch (err) {
        caught = err as Error;
      }

      expect(caught).toBeDefined();
      expect(caught instanceof Error).toBeTrue();
      expect(caught!.message).toBe('[vault] delete() behavior not installed');
    });
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
