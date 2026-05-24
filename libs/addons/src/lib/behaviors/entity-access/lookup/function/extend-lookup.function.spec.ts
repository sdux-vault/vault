import { FeatureCellBaseShape } from '@sdux-vault/shared';
import { extendLookupFunction } from './extend-lookup.function';

describe('extendLookup', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseModel stub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach lookup and lookup$ methods to the cell', () => {
    extendLookupFunction(cell);

    expect(typeof cell.lookup).toBe('function');
    expect(typeof cell.lookup$).toBe('function');
    expect(typeof cell.withLookup).toBe('function');
  });

  describe('lookup()', () => {
    it('should throw a clear error when lookup behavior is not installed', async () => {
      extendLookupFunction(cell);

      let caught: Error | undefined;

      try {
        await cell.lookup!('123');
      } catch (err) {
        caught = err as Error;
      }

      expect(caught).toBeDefined();
      expect(caught instanceof Error).toBeTrue();
      expect(caught!.message).toBe('[vault] lookup() behavior not installed');
    });
  });

  describe('lookup$()', () => {
    it('should throw a clear error when lookup$ behavior is not installed', () => {
      extendLookupFunction(cell);

      expect(() => {
        cell.lookup$!('123');
      }).toThrowError('[vault] lookup$() behavior not installed');
    });
  });

  describe('withLookup', () => {
    it('should throw a clear error when withLookup behavior is not installed', () => {
      extendLookupFunction(cell);

      expect(() => {
        cell.withLookup!(Object({}));
      }).toThrowError('[vault] withLookup() behavior not installed');
    });
  });

  it('should not eagerly execute lookup$ observable logic', () => {
    extendLookupFunction(cell);

    let thrown = false;

    try {
      cell.lookup$!('123');
    } catch {
      thrown = true;
    }

    expect(thrown).toBeTrue();
  });
});
