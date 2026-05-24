import { FeatureCellBaseShape } from '@sdux-vault/shared';
import {
  extendStateCacheFunction,
  extendWithStateCacheFluent
} from './extend-state-cache.function';

describe('Function: extendStateCache', () => {
  let cell: FeatureCellBaseShape<any>;

  beforeEach(() => {
    // minimal FeatureCellBaseModel stub
    cell = {
      key: 'test-cell'
    } as unknown as FeatureCellBaseShape<any>;
  });

  it('should attach cache and cacheLookup$ methods to the cell', () => {
    extendStateCacheFunction(cell);

    expect(typeof cell.cacheLookup).toBe('function');
    expect(typeof cell.cacheLookup$).toBe('function');
  });

  it('should attach withStateCahce methods to the cell', () => {
    extendWithStateCacheFluent(cell);

    expect(typeof cell.withStateCache).toBe('function');
  });

  describe('cache()', () => {
    it('should throw a clear error when cache behavior is not installed', async () => {
      extendStateCacheFunction(cell);

      let caught: Error | undefined;

      try {
        await cell.cacheLookup!('123');
      } catch (err) {
        caught = err as Error;
      }

      expect(caught).toBeDefined();
      expect(caught instanceof Error).toBeTrue();
      expect(caught!.message).toBe(
        '[vault] cacheLookup() behavior not installed'
      );
    });
  });

  describe('cacheLookup$()', () => {
    it('should throw a clear error when cacheLookup$ behavior is not installed', () => {
      extendStateCacheFunction(cell);

      expect(() => {
        cell.cacheLookup$!('123');
      }).toThrowError('[vault] cacheLookup$() behavior not installed');
    });
  });

  describe('withStateCache', () => {
    it('should throw a clear error when withStateCache behavior is not installed', () => {
      extendWithStateCacheFluent(cell);

      expect(() => {
        cell.withStateCache!(Object({}));
      }).toThrowError('[vault] withStateCache() behavior not installed');
    });
  });

  it('should not eagerly execute cacheLookup$ observable logic', () => {
    extendStateCacheFunction(cell);

    let thrown = false;

    try {
      cell.cacheLookup$!('123');
    } catch {
      thrown = true;
    }

    expect(thrown).toBeTrue();
  });
});
