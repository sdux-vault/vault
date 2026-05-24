import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendQueryFunction } from './extend-query.function';

describe('extendQuery', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseModel stub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach query methods to the cell', () => {
    extendQueryFunction(cell);

    expect(typeof cell.query).toBe('function');
    expect(typeof cell.withQuery).toBe('function');
  });

  describe('query()', () => {
    it('should throw a clear error when query behavior is not installed', async () => {
      extendQueryFunction(cell);

      let caught: Error | undefined;

      try {
        await cell.query!('123');
      } catch (err) {
        caught = err as Error;
      }

      expect(caught).toBeDefined();
      expect(caught instanceof Error).toBeTrue();
      expect(caught!.message).toBe('[vault] query() behavior not installed');
    });
  });

  describe('withQuery', () => {
    it('should throw a clear error when withQuery behavior is not installed', () => {
      extendQueryFunction(cell);

      expect(() => {
        cell.withQuery!(Object({}));
      }).toThrowError('[vault] withQuery() behavior not installed');
    });
  });
});
