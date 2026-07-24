import { examplePromise } from './example.promise';

describe('examplePromise', () => {
  it('should not expose a resolver before a Promise is requested', () => {
    expect(examplePromise.getResolve()).toBeNull();
    expect(examplePromise.getReject()).toBeNull();
  });

  it('should reuse the pending Promise until its resolver completes it', async () => {
    const pendingPromise = examplePromise.getPromise();

    expect(examplePromise.getPromise()).toBe(pendingPromise);

    const resolvePromise = examplePromise.getResolve();
    expect(resolvePromise).not.toBeNull();
    resolvePromise!();

    expect(await pendingPromise).toEqual([
      {
        id: 101,
        name: 'Ahsoka',
        lastName: 'Tano',
        faction: 'Jedi Order',
        isForceSensitive: true
      },
      {
        id: 102,
        name: 'Din',
        lastName: 'Djarin',
        faction: 'Unaffiliated',
        isForceSensitive: false
      },
      {
        id: 103,
        name: 'Grogu',
        lastName: 'unknown',
        faction: 'Jedi Order',
        isForceSensitive: true
      }
    ]);
    expect(examplePromise.getResolve()).toBeNull();
    expect(examplePromise.getReject()).toBeNull();
  });

  it('should reject the pending Promise and clear both terminal controllers', async () => {
    const pendingPromise = examplePromise.getPromise();
    const rejected = expectAsync(pendingPromise).toBeRejectedWithError(
      'The character request was rejected.'
    );
    const rejectPromise = examplePromise.getReject();

    expect(examplePromise.getResolve()).not.toBeNull();
    expect(rejectPromise).not.toBeNull();

    rejectPromise!();
    await rejected;

    expect(examplePromise.getResolve()).toBeNull();
    expect(examplePromise.getReject()).toBeNull();
  });

  it('should create a fresh request and ignore repeated resolver calls', async () => {
    const pendingPromise = examplePromise.getPromise();
    const resolvePromise = examplePromise.getResolve()!;
    const rejectPromise = examplePromise.getReject()!;

    resolvePromise();
    resolvePromise();
    rejectPromise();

    await pendingPromise;

    const nextPromise = examplePromise.getPromise();
    expect(nextPromise).not.toBe(pendingPromise);

    examplePromise.getResolve()!();
    await nextPromise;
  });
});
