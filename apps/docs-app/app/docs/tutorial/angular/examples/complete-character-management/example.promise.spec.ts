import { examplePromise } from './example.promise';

describe('examplePromise', () => {
  it('should not expose a resolver before a Promise is requested', () => {
    expect(examplePromise.getResolve()).toBeNull();
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
  });

  it('should create a fresh request and ignore repeated resolver calls', async () => {
    const pendingPromise = examplePromise.getPromise();
    const resolvePromise = examplePromise.getResolve()!;

    resolvePromise();
    resolvePromise();

    await pendingPromise;

    const nextPromise = examplePromise.getPromise();
    expect(nextPromise).not.toBe(pendingPromise);

    examplePromise.getResolve()!();
    await nextPromise;
  });
});
