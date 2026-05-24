import { DeferredFactory } from '@sdux-vault/shared';
import { extendFromPromise } from './extend-from-promise.function';

describe('Function: extendFromPromise', () => {
  const mockCell = (): any => ({});

  it('should attach fromDeferred to the FeatureCell', () => {
    const cell = mockCell();

    expect(cell.fromDeferred).toBeUndefined();

    extendFromPromise(cell);

    expect(typeof cell.fromDeferred).toBe('function');
  });

  it('should attach fromPromise to the FeatureCell', () => {
    const cell = mockCell();

    expect(cell.fromPromise).toBeUndefined();

    extendFromPromise(cell);

    expect(typeof cell.fromPromise).toBe('function');
  });

  it('fromDeferred should throw when behavior is not installed', async () => {
    const cell = mockCell();
    extendFromPromise(cell);

    let error: any;

    try {
      await cell.fromDeferred!({} as DeferredFactory<any>);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('[vault] fromDeferred() behavior not installed');
  });

  it('fromPromise should throw when behavior is not installed', async () => {
    const cell = mockCell();
    extendFromPromise(cell);

    let error: any;

    try {
      await cell.fromPromise!({} as DeferredFactory<any>);
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('[vault] fromPromise() behavior not installed');
  });

  it('should not modify existing cell properties', () => {
    const cell = {
      existing: true
    };

    extendFromPromise(cell as any);

    expect(cell.existing).toBeTrue();
  });
});
