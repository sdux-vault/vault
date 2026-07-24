import { exampleObservable } from './example.observable';

describe('exampleObservable', () => {
  it('should not expose terminal controllers before an Observable is requested', () => {
    expect(exampleObservable.getEmit()).toBeNull();
    expect(exampleObservable.getError()).toBeNull();
  });

  it('should reuse the pending Observable until its emitter completes it', () => {
    const pendingObservable = exampleObservable.getObservable();
    const emitted: unknown[] = [];
    let completed = false;

    expect(exampleObservable.getObservable()).toBe(pendingObservable);

    pendingObservable.subscribe({
      next: (characters) => emitted.push(characters),
      complete: () => {
        completed = true;
      }
    });

    const emitObservable = exampleObservable.getEmit();
    expect(emitObservable).not.toBeNull();
    emitObservable!();

    expect(emitted).toEqual([
      [
        {
          id: 201,
          name: 'Ezra',
          lastName: 'Bridger',
          faction: 'Jedi Order',
          isForceSensitive: true
        },
        {
          id: 202,
          name: 'Hera',
          lastName: 'Syndulla',
          faction: 'Rebel Alliance',
          isForceSensitive: false
        },
        {
          id: 203,
          name: 'R2-D2',
          lastName: 'unknown',
          faction: 'Rebel Alliance',
          isForceSensitive: false
        }
      ]
    ]);
    expect(completed).toBeTrue();
    expect(exampleObservable.getEmit()).toBeNull();
    expect(exampleObservable.getError()).toBeNull();
  });

  it('should error the pending Observable and clear both terminal controllers', () => {
    const pendingObservable = exampleObservable.getObservable();
    let emittedError: unknown;

    pendingObservable.subscribe({
      error: (error) => {
        emittedError = error;
      }
    });

    const errorObservable = exampleObservable.getError();

    expect(exampleObservable.getEmit()).not.toBeNull();
    expect(errorObservable).not.toBeNull();

    errorObservable!();

    expect(emittedError).toEqual(
      jasmine.objectContaining({
        message: 'The character request was rejected.'
      })
    );
    expect(exampleObservable.getEmit()).toBeNull();
    expect(exampleObservable.getError()).toBeNull();
  });

  it('should create a fresh source and ignore repeated terminal calls', () => {
    const pendingObservable = exampleObservable.getObservable();
    const emitObservable = exampleObservable.getEmit()!;
    const errorObservable = exampleObservable.getError()!;

    pendingObservable.subscribe();
    emitObservable();
    emitObservable();
    errorObservable();

    const nextObservable = exampleObservable.getObservable();
    expect(nextObservable).not.toBe(pendingObservable);

    nextObservable.subscribe();
    exampleObservable.getEmit()!();
  });
});
