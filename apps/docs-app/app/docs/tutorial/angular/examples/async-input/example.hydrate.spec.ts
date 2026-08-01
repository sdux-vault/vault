import { exampleHydrate } from './example.hydrate';

describe('exampleHydrate', () => {
  beforeEach(() => {
    // The coordinator is shared with the component and service specs. Resolve
    // any request left by another suite before asserting a fresh lifecycle.
    exampleHydrate.getResolve()?.();
  });

  describe('controller availability', () => {
    it('should not expose terminal controllers before hydration is requested', () => {
      expect(exampleHydrate.getResolve()).toBeNull();
      expect(exampleHydrate.getReject()).toBeNull();
    });
  });

  describe('active request lifecycle', () => {
    it('should resolve the authoritative collection and clear its controllers', async () => {
      const promise = exampleHydrate.getPromise();
      const resolve = exampleHydrate.getResolve();

      expect(resolve).not.toBeNull();

      resolve!();
      const characters = await promise;

      expect(characters.length).toBe(5);
      expect(exampleHydrate.getResolve()).toBeNull();
    });

    it('should reject the authoritative source and clear its controllers', async () => {
      const promise = exampleHydrate.getPromise();
      const reject = exampleHydrate.getReject();

      expect(reject).not.toBeNull();

      reject!();

      await expectAsync(promise).toBeRejectedWithError(
        'The character hydration was rejected.'
      );
      expect(exampleHydrate.getReject()).toBeNull();
    });
  });

  describe('stale controller safety', () => {
    it('should ignore a stale resolver captured from a previous cycle', async () => {
      const firstPromise = exampleHydrate.getPromise();
      const staleResolve = exampleHydrate.getResolve()!;

      staleResolve();
      await firstPromise;

      const secondPromise = exampleHydrate.getPromise();
      let secondSettled = false;
      void secondPromise.then(() => {
        secondSettled = true;
      });

      staleResolve();
      await Promise.resolve();

      expect(secondSettled).toBeFalse();

      exampleHydrate.getResolve()!();

      await expectAsync(secondPromise).toBeResolved();
    });

    it('should ignore a stale rejecter captured from a previous cycle', async () => {
      const firstPromise = exampleHydrate.getPromise();
      const staleReject = exampleHydrate.getReject()!;

      staleReject();
      await expectAsync(firstPromise).toBeRejected();

      const secondPromise = exampleHydrate.getPromise();
      let secondSettled = false;
      void secondPromise.catch(() => {
        secondSettled = true;
      });

      staleReject();
      await Promise.resolve();

      expect(secondSettled).toBeFalse();

      exampleHydrate.getReject()!();

      await expectAsync(secondPromise).toBeRejectedWithError(
        'The character hydration was rejected.'
      );
    });
  });
});
