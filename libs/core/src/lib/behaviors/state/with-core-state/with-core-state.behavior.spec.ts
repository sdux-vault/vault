import {
  setVaultLogLevel,
  StateSnapshotShape,
  VAULT_CLEAR_STATE,
  VAULT_NOOP,
  VAULT_STOP,
  VaultErrorShape
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Observable, Subject } from 'rxjs';
import { withCoreStateBehavior } from './with-core-state.behavior';

describe('Behavior: CoreState', () => {
  let behavior: withCoreStateBehavior<any>;
  let warnSpy: jasmine.Spy;
  let errorSpy: jasmine.Spy;
  let mockCtx: any;
  let stopListening: any;
  const emitted: any = [];

  const state$ = new Subject<StateSnapshotShape<any>>();

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');
    errorSpy = spyOn(console, 'error');

    setVaultLogLevel('warn');
    emitted.length = 0;

    mockCtx = Object({
      state$,
      lastSnapshot: {
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      },
      incoming: undefined
    });

    stopListening = state$
      .asObservable()
      .subscribe((state) => emitted.push(state));

    behavior = new withCoreStateBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    setVaultLogLevel('off');
    stopListening.unsubscribe();
  });

  it('should have correct default metadata', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('coreState');
    expect(behavior.key).toBe('behavior key');
  });

  it('should construct via factory and expose correct static metadata', () => {
    expect(withCoreStateBehavior.critical).toBeTrue();
    expect(withCoreStateBehavior.type).toBe('coreState');
    expect(withCoreStateBehavior.key).toBe('SDUX::Behavior::Core::State');
    expect((withCoreStateBehavior as any).wantsConfig).toBeFalse();
    expect((withCoreStateBehavior as any).needsLicense).toBeFalse();
    expect((withCoreStateBehavior as any).configKey).toBeUndefined();
    expect(
      (typeof withCoreStateBehavior as any).installFluentApi
    ).toBeUndefined();
  });

  // -------------------------------------------------------
  // preparePipelineIncoming
  // -------------------------------------------------------

  describe('preparingIncoming', () => {
    describe('without options', () => {
      it('preparePipelineIncoming should set loading when present', async () => {
        mockCtx.incoming = { loading: true, value: 22 };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toEqual({
          loading: true,
          value: 22
        });

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: undefined,
              error: null,
              hasValue: false
            })
          })
        ]);
      });

      it('preparePipelineIncoming should set error when present', async () => {
        mockCtx.incoming = { error: 'An error occurred', value: 22 };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toEqual({
          error: 'An error occurred',
          value: 22
        });

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: Object({
              message: 'An error occurred',
              details: 'An error occurred',
              raw: 'An error occurred',
              timestamp: jasmine.any(Number),
              featureCellKey: 'external'
            }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: Object({
                message: 'An error occurred',
                details: 'An error occurred',
                raw: 'An error occurred',
                timestamp: jasmine.any(Number),
                featureCellKey: 'external'
              }),
              hasValue: false
            })
          })
        ]);
      });

      it('preparePipelineIncoming should not set error when present', async () => {
        mockCtx.incoming = { error: null, value: 22 };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toEqual({
          error: null,
          value: 22
        });

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            })
          })
        ]);
      });

      it('preparePipelineIncoming should clear state when incoming is nullish', async () => {
        mockCtx.incoming = null;

        mockCtx.lastSnapshot = {
          isLoading: true,
          value: 'defined',
          error: 'error',
          hasValue: true
        };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_CLEAR_STATE);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: 'defined',
            error: 'error',
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: 'defined',
              error: 'error',
              hasValue: true
            })
          })
        ]);
      });

      it('preparePipelineIncoming should set for Observable', async () => {
        mockCtx.incoming = new Observable();

        const incomingRef = mockCtx.incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);

        // passes through same reference
        expect(result).toBe(incomingRef);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([]);
      });

      it('preparePipelineIncoming should set for deferred function', async () => {
        mockCtx.incoming = () => 22;

        const incomingRef = mockCtx.incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);

        // passes through same reference
        expect(result).toBe(incomingRef);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([]);
      });

      it('preparePipelineIncoming should set loading true for HttpResourceRef', async () => {
        mockCtx.incoming = Object({
          value: true,
          isLoading: true,
          error: true,
          hasValue: true
        });

        const incomingRef = mockCtx.incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);

        // passes through same reference
        expect(result).toBe(incomingRef);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: undefined,
              error: null,
              hasValue: false
            })
          })
        ]);
      });

      it('preparePipelineIncoming should apply loading and error from plain incoming object', async () => {
        const incoming = {
          loading: true,
          error: { message: 'boom' } as VaultErrorShape
        };
        mockCtx.incoming = incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        // hasValue stays false, we did not set a value yet
        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: undefined,
            error: Object({
              message: 'Unexpected error',
              details: jasmine.any(Object),
              raw: jasmine.any(Object),
              timestamp: jasmine.any(Number),
              featureCellKey: 'external'
            }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: undefined,
              error: Object({
                message: 'Unexpected error',
                details: jasmine.any(Object),
                raw: jasmine.any(Object),
                timestamp: jasmine.any(Number),
                featureCellKey: 'external'
              }),
              hasValue: false
            })
          })
        ]);
      });

      it('preparePipelineIncoming should only set loading when error is undefined', async () => {
        const incoming = { loading: true };
        mockCtx.incoming = incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: undefined,
              error: null,
              hasValue: false
            })
          })
        ]);
      });

      it('preparePipelineIncoming should only set error when loading is undefined', async () => {
        const err = { message: 'just error' } as VaultErrorShape;
        const incoming = { error: err };
        mockCtx.incoming = incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: Object({
              message: 'Unexpected error',
              details: jasmine.any(Object),
              raw: jasmine.any(Object),
              timestamp: jasmine.any(Number),
              featureCellKey: 'external'
            }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: Object({
                message: 'Unexpected error',
                details: jasmine.any(Object),
                raw: jasmine.any(Object),
                timestamp: jasmine.any(Number),
                featureCellKey: 'external'
              }),

              hasValue: false
            })
          })
        ]);
      });

      it('preparePipelineIncoming should only set error when loading is undefined', async () => {
        const incoming = { error: null };
        mockCtx.incoming = incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,

              hasValue: false
            })
          })
        ]);
      });

      it('should emit but not mutate when incoming is empty object', async () => {
        mockCtx.incoming = {};

        const prev = { ...mockCtx.lastSnapshot };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        expect(mockCtx.lastSnapshot).toEqual(prev);

        expect(emitted.length).toBe(1);
        expect(emitted[0].snapshot).toEqual(prev);
      });

      it('should ignore value undefined but still emit', async () => {
        mockCtx.lastSnapshot.value = 'existing';

        mockCtx.incoming = { value: undefined };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        // value unchanged
        expect(mockCtx.lastSnapshot.value).toBe('existing');

        // emitted
        expect(emitted.length).toBe(1);
        expect(emitted[0].snapshot.value).toBe('existing');
      });

      it('should ignore loading undefined but still emit', async () => {
        mockCtx.lastSnapshot.isLoading = true;

        mockCtx.incoming = { loading: undefined };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot.isLoading).toBe(true);

        expect(emitted.length).toBe(1);

        expect(result).toBe(VAULT_NOOP);
      });

      it('should ignore error undefined but still emit', async () => {
        mockCtx.lastSnapshot.error = { message: 'existing' };

        mockCtx.incoming = { error: undefined };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot.error).toEqual({ message: 'existing' });

        expect(emitted.length).toBe(1);

        expect(result).toBe(VAULT_NOOP);
      });

      it('should update loading but ignore undefined value', async () => {
        mockCtx.lastSnapshot.value = 'keep me';

        mockCtx.incoming = { value: undefined, loading: true };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual({
          isLoading: true,
          value: 'keep me',
          error: null,
          hasValue: true
        });

        expect(result).toBe(VAULT_NOOP);
      });

      it('should clear error but preserve value when value is undefined', async () => {
        mockCtx.lastSnapshot.value = 'keep me';
        mockCtx.lastSnapshot.error = { message: 'old' };

        mockCtx.incoming = { value: undefined, error: null };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual({
          isLoading: false,
          value: 'keep me',
          error: null,
          hasValue: true
        });

        expect(result).toBe(VAULT_NOOP);
      });

      it('should emit exactly once even when no changes occur', async () => {
        mockCtx.incoming = { value: undefined };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(emitted.length).toBe(1);

        expect(result).toBe(VAULT_NOOP);
      });

      it('should not flip hasValue when ignoring undefined value', async () => {
        mockCtx.lastSnapshot.value = 'existing';
        mockCtx.lastSnapshot.hasValue = true;

        mockCtx.incoming = { value: undefined };

        behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot.hasValue).toBe(true);
      });

      it('should return incoming object for empty object', () => {
        const incoming = {};
        mockCtx.incoming = incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);

        expect(result).toBe(VAULT_NOOP);
      });

      it('preparePipelineIncoming should emit when incoming is empty object but should not mutate snapshot', async () => {
        const previousSnapshot = Object({
          isLoading: false,
          value: 'existing-value',
          error: Object({ message: 'existing-error' }),
          hasValue: true
        });

        mockCtx.lastSnapshot = { ...previousSnapshot };
        mockCtx.incoming = {};

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        // no mutation
        expect(mockCtx.lastSnapshot).toEqual(previousSnapshot);

        // but still emits
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: 'existing-value',
              error: Object({ message: 'existing-error' }),
              hasValue: true
            })
          })
        ]);

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
      });

      it('preparePipelineIncoming should emit when incoming value is undefined but should not mutate snapshot', async () => {
        const previousSnapshot = Object({
          isLoading: false,
          value: 'existing-value',
          error: Object({ message: 'existing-error' }),
          hasValue: true
        });

        mockCtx.lastSnapshot = { ...previousSnapshot };
        mockCtx.incoming = { value: undefined };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        // no mutation
        expect(mockCtx.lastSnapshot).toEqual(previousSnapshot);

        // but still emits
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: 'existing-value',
              error: Object({ message: 'existing-error' }),
              hasValue: true
            })
          })
        ]);

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
      });

      it('preparePipelineIncoming should ignore loading undefined but still emit', async () => {
        mockCtx.lastSnapshot = Object({
          isLoading: true,
          value: 'existing-value',
          error: null,
          hasValue: true
        });

        mockCtx.incoming = { loading: undefined };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);
        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: 'existing-value',
            error: null,
            hasValue: true
          })
        );

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: 'existing-value',
              error: null,
              hasValue: true
            })
          })
        ]);
      });

      it('preparePipelineIncoming should ignore error undefined but still emit', async () => {
        mockCtx.lastSnapshot = Object({
          isLoading: false,
          value: 'existing-value',
          error: Object({ message: 'existing-error' }),
          hasValue: true
        });

        mockCtx.incoming = { error: undefined };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);
        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: 'existing-value',
            error: Object({ message: 'existing-error' }),
            hasValue: true
          })
        );

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: 'existing-value',
              error: Object({ message: 'existing-error' }),
              hasValue: true
            })
          })
        ]);
      });

      it('preparePipelineIncoming should update loading but preserve value when value is undefined', async () => {
        mockCtx.lastSnapshot = Object({
          isLoading: false,
          value: 'existing-value',
          error: null,
          hasValue: true
        });

        mockCtx.incoming = { value: undefined, loading: true };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);
        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: 'existing-value',
            error: null,
            hasValue: true
          })
        );

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: 'existing-value',
              error: null,
              hasValue: true
            })
          })
        ]);
      });
    });

    describe('with options', () => {
      beforeEach(() => {
        mockCtx.options = Object({ value: true });
      });

      it('preparePipelineIncoming should emit with options when incoming is empty object but should not mutate snapshot', async () => {
        mockCtx.options = Object({ value: true });

        const previousSnapshot = Object({
          isLoading: false,
          value: 'existing-value',
          error: Object({ message: 'existing-error' }),
          hasValue: true
        });

        mockCtx.lastSnapshot = { ...previousSnapshot };
        mockCtx.incoming = {};

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        expect(mockCtx.lastSnapshot).toEqual(previousSnapshot);

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: 'existing-value',
              error: Object({ message: 'existing-error' }),
              hasValue: true
            }),
            options: { value: true }
          })
        ]);

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
      });

      it('preparePipelineIncoming should emit with options when incoming value is undefined but should not mutate snapshot', async () => {
        mockCtx.options = Object({ value: true });

        const previousSnapshot = Object({
          isLoading: false,
          value: 'existing-value',
          error: Object({ message: 'existing-error' }),
          hasValue: true
        });

        mockCtx.lastSnapshot = { ...previousSnapshot };
        mockCtx.incoming = { value: undefined };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        expect(mockCtx.lastSnapshot).toEqual(previousSnapshot);

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: 'existing-value',
              error: Object({ message: 'existing-error' }),
              hasValue: true
            }),
            options: { value: true }
          })
        ]);

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
      });

      it('preparePipelineIncoming should clear state when incoming is nullish', async () => {
        mockCtx.incoming = null;

        mockCtx.lastSnapshot = {
          isLoading: true,
          value: 'defined',
          error: 'error',
          hasValue: true
        };

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_CLEAR_STATE);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: 'defined',
            error: 'error',
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: 'defined',
              error: 'error',
              hasValue: true
            }),
            options: { value: true }
          })
        ]);
      });

      it('preparePipelineIncoming should set for Observable', async () => {
        mockCtx.incoming = new Observable();

        const incomingRef = mockCtx.incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);

        // passes through same reference
        expect(result).toBe(incomingRef);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([]);
      });

      it('preparePipelineIncoming should set loading true for HttpResourceRef', async () => {
        mockCtx.incoming = Object({
          value: true,
          isLoading: true,
          error: true,
          hasValue: true
        });

        const incomingRef = mockCtx.incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);

        // passes through same reference
        expect(result).toBe(incomingRef);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: undefined,
              error: null,
              hasValue: false
            }),
            options: { value: true }
          })
        ]);
      });

      it('preparePipelineIncoming should apply loading and error from plain incoming object', async () => {
        const incoming = {
          loading: true,
          error: { message: 'boom' } as VaultErrorShape
        };
        mockCtx.incoming = incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        // hasValue stays false, we did not set a value yet
        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: undefined,
            error: Object({
              message: 'Unexpected error',
              details: jasmine.any(Object),
              raw: jasmine.any(Object),
              timestamp: jasmine.any(Number),
              featureCellKey: 'external'
            }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: undefined,
              error: Object({
                message: 'Unexpected error',
                details: jasmine.any(Object),
                raw: jasmine.any(Object),
                timestamp: jasmine.any(Number),
                featureCellKey: 'external'
              }),
              hasValue: false
            }),
            options: { value: true }
          })
        ]);
      });

      it('preparePipelineIncoming should only set loading when error is undefined', async () => {
        const incoming = { loading: true };
        mockCtx.incoming = incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: true,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: true,
              value: undefined,
              error: null,
              hasValue: false
            }),
            options: { value: true }
          })
        ]);
      });

      it('preparePipelineIncoming should only set error when loading is undefined', async () => {
        const err = { message: 'just error' } as VaultErrorShape;
        const incoming = { error: err };
        mockCtx.incoming = incoming;

        const result = behavior.preparePipelineIncoming(mockCtx);
        await flushVaultPipeline();

        expect(result).toBe(VAULT_NOOP);

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: Object({
              message: 'Unexpected error',
              details: jasmine.any(Object),
              raw: jasmine.any(Object),
              timestamp: jasmine.any(Number),
              featureCellKey: 'external'
            }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        expect(emitted).toEqual([
          Object({
            type: 'Incoming Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: Object({
                message: 'Unexpected error',
                details: jasmine.any(Object),
                raw: jasmine.any(Object),
                timestamp: jasmine.any(Number),
                featureCellKey: 'external'
              }),

              hasValue: false
            }),
            options: { value: true }
          })
        ]);
      });
    });
  });

  describe('finalizePipelineVaultStop', () => {
    it('finalizePipelineVaultStop should not update the previous', async () => {
      mockCtx.incoming = Object({
        value: true,
        isLoading: true,
        error: true,
        hasValue: true
      });

      // simulate we were loading
      mockCtx.lastSnapshot.isLoading = true;
      mockCtx.lastSnapshot.value = 'hello world';

      behavior.finalizePipelineVaultStop(mockCtx);

      expect(mockCtx.lastSnapshot).toEqual(
        Object({
          isLoading: true,
          value: 'hello world',
          error: null,
          hasValue: false
        })
      );

      expect(warnSpy).not.toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();

      expect(emitted).toEqual([
        Object({
          type: 'Finalize Pipeline',
          snapshot: Object({
            isLoading: true,
            value: 'hello world',
            error: null,
            hasValue: false
          })
        })
      ]);
    });
  });

  // -------------------------------------------------------
  // finalizePipelineState
  // -------------------------------------------------------

  describe('finalizePipelineState', () => {
    describe('without options', () => {
      it('finalizePipelineState should clear loading for HttpResourceRef and set value', async () => {
        mockCtx.incoming = Object({
          value: true,
          isLoading: true,
          error: true,
          hasValue: true
        });

        // simulate we were loading
        mockCtx.lastSnapshot.isLoading = true;

        const value = [{ id: 1 }];

        behavior.finalizePipelineState(value, mockCtx);

        // loading cleared, value set

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value,
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        expect(emitted).toEqual([
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            })
          }),
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: [Object({ id: 1 })],
              error: null,
              hasValue: true
            })
          })
        ]);
      });

      it('finalizePipelineState should set value when non-terminal, non-nullish and non-http incoming', async () => {
        mockCtx.incoming = { some: 'payload' }; // non-http marker
        const value = { count: 42 };

        behavior.finalizePipelineState(value, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value,
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: Object({ count: 42 }),
              error: null,
              hasValue: true
            })
          })
        ]);
      });

      it('finalizePipelineState should clear value when finalState is null', async () => {
        mockCtx.incoming = { some: 'payload' };
        // pre-populate value
        mockCtx.lastSnapshot.value = { previous: true };
        mockCtx.lastSnapshot.hasValue = true;

        behavior.finalizePipelineState(null, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            })
          })
        ]);
      });

      it('finalizePipelineState should clear value when finalState is VAULT_NOOP', async () => {
        mockCtx.incoming = { some: 'payload' };
        mockCtx.lastSnapshot.value = { previous: true };
        mockCtx.lastSnapshot.hasValue = true;

        behavior.finalizePipelineState(VAULT_NOOP, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: { previous: true },
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: { previous: true },
              error: null,
              hasValue: true
            })
          })
        ]);
      });

      it('finalizePipelineState should do nothing when finalState is non-null pipeline terminal (e.g., VAULT_STOP)', async () => {
        mockCtx.incoming = { some: 'payload' };
        const previous = { previous: true };

        mockCtx.lastSnapshot.value = previous;
        mockCtx.lastSnapshot.hasValue = true;

        behavior.finalizePipelineState(VAULT_STOP, mockCtx);
        await flushVaultPipeline();

        // state unchanged
        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: Object({ previous: true }),
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([]);
      });
    });

    describe('with options', () => {
      beforeEach(() => {
        mockCtx.options = Object({ value: false });
      });

      it('finalizePipelineState should clear loading for HttpResourceRef and set value', async () => {
        mockCtx.incoming = Object({
          value: true,
          isLoading: true,
          error: true,
          hasValue: true
        });

        // simulate we were loading
        mockCtx.lastSnapshot.isLoading = true;

        const value = [{ id: 1 }];

        behavior.finalizePipelineState(value, mockCtx);

        // loading cleared, value set

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value,
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();

        expect(emitted).toEqual([
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            }),
            options: Object({ value: false })
          }),
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: [Object({ id: 1 })],
              error: null,
              hasValue: true
            }),
            options: Object({ value: false })
          })
        ]);
      });

      it('finalizePipelineState should set value when non-terminal, non-nullish and non-http incoming', async () => {
        mockCtx.incoming = { some: 'payload' }; // non-http marker
        const value = { count: 42 };

        behavior.finalizePipelineState(value, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value,
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: Object({ count: 42 }),
              error: null,
              hasValue: true
            }),
            options: Object({ value: false })
          })
        ]);
      });

      it('finalizePipelineState should clear value when finalState is null', async () => {
        mockCtx.incoming = { some: 'payload' };
        // pre-populate value
        mockCtx.lastSnapshot.value = { previous: true };
        mockCtx.lastSnapshot.hasValue = true;

        behavior.finalizePipelineState(null, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            }),
            options: Object({ value: false })
          })
        ]);
      });

      it('finalizePipelineState should clear value when finalState is VAULT_NOOP', async () => {
        mockCtx.incoming = { some: 'payload' };
        mockCtx.lastSnapshot.value = { previous: true };
        mockCtx.lastSnapshot.hasValue = true;

        behavior.finalizePipelineState(VAULT_NOOP, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: { previous: true },
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Finalize Pipeline',
            snapshot: Object({
              isLoading: false,
              value: { previous: true },
              error: null,
              hasValue: true
            }),
            options: Object({ value: false })
          })
        ]);
      });

      it('finalizePipelineState should do nothing when finalState is non-null pipeline terminal (e.g., VAULT_STOP)', async () => {
        mockCtx.incoming = { some: 'payload' };
        const previous = { previous: true };

        mockCtx.lastSnapshot.value = previous;
        mockCtx.lastSnapshot.hasValue = true;

        behavior.finalizePipelineState(VAULT_STOP, mockCtx);
        await flushVaultPipeline();

        // state unchanged
        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: Object({ previous: true }),
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([]);
      });
    });
  });

  // -------------------------------------------------------
  // finalizePipelineError
  // -------------------------------------------------------

  describe('finalizePipelineError', () => {
    describe('without options', () => {
      it('finalizePipelineError should set error and clear loading when currently loading', async () => {
        const err = { message: 'boom' } as VaultErrorShape;

        mockCtx.lastSnapshot.isLoading = true;

        behavior.finalizePipelineError(err, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: Object({ message: 'boom' }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Pipeline Error',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: Object({ message: 'boom' }),
              hasValue: false
            })
          })
        ]);
      });

      it('finalizePipelineError should set error and leave loading false when not loading', async () => {
        const err = { message: 'boom2' } as VaultErrorShape;

        mockCtx.lastSnapshot.isLoading = false;

        behavior.finalizePipelineError(err, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: Object({ message: 'boom2' }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Pipeline Error',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: Object({ message: 'boom2' }),
              hasValue: false
            })
          })
        ]);
      });
    });

    describe('with options', () => {
      beforeEach(() => {
        mockCtx.options = Object({ value: false });
      });

      it('finalizePipelineError should set error and clear loading when currently loading', async () => {
        const err = { message: 'boom' } as VaultErrorShape;

        mockCtx.lastSnapshot.isLoading = true;

        behavior.finalizePipelineError(err, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: Object({ message: 'boom' }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Pipeline Error',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: Object({ message: 'boom' }),
              hasValue: false
            }),
            options: Object({ value: false })
          })
        ]);
      });

      it('finalizePipelineError should set error and leave loading false when not loading', async () => {
        const err = { message: 'boom2' } as VaultErrorShape;

        mockCtx.lastSnapshot.isLoading = false;

        behavior.finalizePipelineError(err, mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: Object({ message: 'boom2' }),
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Pipeline Error',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: Object({ message: 'boom2' }),
              hasValue: false
            }),
            options: Object({ value: false })
          })
        ]);
      });
    });
  });

  // -------------------------------------------------------
  // finalizeAbort
  // -------------------------------------------------------

  describe('finalizeAbort', () => {
    describe('without options', () => {
      it('finalizeAbort should set error and clear loading when currently loading', async () => {
        mockCtx.lastSnapshot.isLoading = true;
        mockCtx.lastSnapshot.value = Object({ value: 25 });

        behavior.finalizeControllerAbort(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: Object({ value: 25 }),
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Abort Controller',
            snapshot: Object({
              isLoading: false,
              value: Object({ value: 25 }),
              error: null,
              hasValue: true
            })
          })
        ]);
      });

      it('finalizeAbort should set error and leave loading false when not loading', async () => {
        behavior.finalizeControllerAbort(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Abort Controller',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            })
          })
        ]);
      });
    });

    describe('with options', () => {
      beforeEach(() => {
        mockCtx.options = Object({ value: false });
      });

      it('finalizeAbort should set error and clear loading when currently loading', async () => {
        mockCtx.lastSnapshot.isLoading = true;

        behavior.finalizeControllerAbort(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Abort Controller',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            }),
            options: Object({ value: false })
          })
        ]);
      });

      it('finalizeAbort should set error and leave loading false when not loading', async () => {
        mockCtx.lastSnapshot.isLoading = false;

        behavior.finalizeControllerAbort(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Abort Controller',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            }),
            options: Object({ value: false })
          })
        ]);
      });
    });
  });

  // -------------------------------------------------------
  // finalizeDeny
  // -------------------------------------------------------
  describe('finalizeDeny', () => {
    describe('without options', () => {
      it('finalizeDeny should set error and clear loading when currently loading', async () => {
        mockCtx.lastSnapshot.isLoading = true;
        mockCtx.lastSnapshot.value = Object({ value: 25 });

        behavior.finalizeControllerDeny(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: Object({ value: 25 }),
            error: null,
            hasValue: true
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Deny Controller',
            snapshot: Object({
              isLoading: false,
              value: Object({ value: 25 }),
              error: null,
              hasValue: true
            })
          })
        ]);
      });

      it('finalizeDeny should set error and leave loading false when not loading', async () => {
        behavior.finalizeControllerDeny(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Deny Controller',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            })
          })
        ]);
      });
    });

    describe('with options', () => {
      beforeEach(() => {
        mockCtx.options = Object({ value: false });
      });

      it('finalizeDeny should set error and clear loading when currently loading', async () => {
        mockCtx.lastSnapshot.isLoading = true;

        behavior.finalizeControllerDeny(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Deny Controller',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            }),
            options: Object({ value: false })
          })
        ]);
      });

      it('finalizeDeny should set error and leave loading false when not loading', async () => {
        mockCtx.lastSnapshot.isLoading = false;

        behavior.finalizeControllerDeny(mockCtx);
        await flushVaultPipeline();

        expect(mockCtx.lastSnapshot).toEqual(
          Object({
            isLoading: false,
            value: undefined,
            error: null,
            hasValue: false
          })
        );

        expect(warnSpy).not.toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
        expect(emitted).toEqual([
          Object({
            type: 'Deny Controller',
            snapshot: Object({
              isLoading: false,
              value: undefined,
              error: null,
              hasValue: false
            }),
            options: Object({ value: false })
          })
        ]);
      });
    });
  });

  it('should log error when applyValue encounters an exception', async () => {
    behavior.finalizePipelineState({ some: 'value' }, Object({}) as any);
    await flushVaultPipeline();

    expect(errorSpy).toHaveBeenCalledWith(
      '[vault]',
      'behavior key an error occurred updating the state',
      jasmine.any(Error)
    );

    expect(mockCtx.lastSnapshot).toEqual(
      Object({
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      })
    );

    expect(emitted).toEqual([]);
  });

  // -------------------------------------------------------
  // destroy / reset
  // -------------------------------------------------------

  it('should validate destroy is noop', async () => {
    behavior.destroy(mockCtx);
    await flushVaultPipeline();

    expect(mockCtx.lastSnapshot).toEqual(
      Object({
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      })
    );

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'behavior key - destroy');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(emitted).toEqual([
      Object({
        type: 'Pipeline Destroy',
        snapshot: Object({
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        })
      })
    ]);
  });

  it('should validate reset is noop', async () => {
    behavior.reset(mockCtx);
    await flushVaultPipeline();

    expect(mockCtx.lastSnapshot).toEqual(
      Object({
        isLoading: false,
        value: undefined,
        error: null,
        hasValue: false
      })
    );

    expect(warnSpy).toHaveBeenCalledWith('[vault]', 'behavior key - reset');
    expect(errorSpy).not.toHaveBeenCalled();
    expect(emitted).toEqual([
      Object({
        type: 'Pipeline Reset',
        snapshot: Object({
          isLoading: false,
          value: undefined,
          error: null,
          hasValue: false
        })
      })
    ]);
  });
});
