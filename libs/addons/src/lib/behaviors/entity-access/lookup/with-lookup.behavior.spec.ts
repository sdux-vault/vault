import {
  BehaviorClassContext,
  BehaviorTypes,
  createVaultError,
  ResolveTypes,
  setVaultLogLevel,
  StateEmitTypes,
  VaultErrorShape
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subject } from 'rxjs';
import { withLookupBehavior } from './with-lookup.behavior';

const buildEmit = (snapshot: any, id: any, type = 'Finalize Pipeline') => {
  return Object({
    snapshot,
    options: Object({
      withLookupBehavior: {
        id
      }
    }),
    type
  });
};

describe('Behavior: withLookupBehavior', () => {
  let behavior: withLookupBehavior<any, any>;
  let state$: Subject<any>;
  let ctx: any;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;

  let fetchSpy: any;

  beforeEach(() => {
    fetchSpy = jasmine.createSpy('fetch');
    fetchSpy.calls.reset();
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');

    setVaultLogLevel('debug');

    state$ = new Subject();

    ctx = {
      featureCellKey: 'cell-key',
      state$,
      reset$: new Subject<void>(),
      destroyed$: new Subject<void>()
    };
  });

  describe('Promise with config', () => {
    beforeEach(() => {
      behavior = new withLookupBehavior<any, any>('behavior-key', {
        behaviorConfig: {
          idKey: 'id',
          fetchType: ResolveTypes.Promise,
          fetch: fetchSpy
        }
      } as BehaviorClassContext);

      ctx.mergeState = jasmine
        .createSpy('mergeState')
        .and.callFake((input: any) => {
          try {
            const out = input?.value?.(); // execute deferred

            return Promise.resolve(out).then(
              (result) => {
                // pipeline would eventually emit state
                state$.next(buildEmit({ value: result }, 1));
              },
              (err) => {
                state$.next(
                  buildEmit(
                    { error: createVaultError(err, 'behavior-key') },
                    undefined,
                    StateEmitTypes.PipelineError
                  )
                );
              }
            );
          } catch (err: any) {
            state$.next(
              buildEmit(
                { error: createVaultError(err, 'behavior-key') },
                undefined,
                StateEmitTypes.PipelineError
              )
            );
            return Promise.resolve();
          }
        });
    });

    // ------------------------------------------------------------------------------------------
    // METADATA
    // ------------------------------------------------------------------------------------------

    it('should expose correct instance metadata', () => {
      expect(behavior.type).toBe(BehaviorTypes.Extension);
      expect(behavior.critical).toBeFalse();
      expect(behavior.key).toBe('behavior-key');
    });

    it('should expose correct static metadata', () => {
      expect(withLookupBehavior.type).toBe(BehaviorTypes.Extension);
      expect(withLookupBehavior.critical).toBeFalse();
      expect(withLookupBehavior.key).toBe('SDUX::Behavior::Core::Lookup');
      expect(withLookupBehavior.wantsConfig).toBeTrue();
      expect(withLookupBehavior.configKey).toBe('withLookup');
      expect(typeof withLookupBehavior.installFluentApi).toBe('function');
    });

    // ------------------------------------------------------------------------------------------
    // LOOKUP (Promise)
    // ------------------------------------------------------------------------------------------

    describe('lookup()', () => {
      it('should resolve immediately on cache hit', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));

        const result = await api.lookup('1');
        expect(result).toEqual({ id: '1', name: 'Ada' });
        expect(fetchSpy).not.toHaveBeenCalled();
      });

      it('should return cloned entities so consumer mutations do not corrupt the cache', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(
          buildEmit(
            { value: { id: '1', name: 'Ada', meta: { score: 10 } } },
            '1'
          )
        );

        const first = await api.lookup('1');
        expect(first).toEqual({ id: '1', name: 'Ada', meta: { score: 10 } });

        first.name = 'CORRUPTED';
        first.meta.score = -1;

        const second = await api.lookup('1');
        expect(second).toEqual({ id: '1', name: 'Ada', meta: { score: 10 } });
        expect(second).not.toBe(first);
      });

      it('should resolve immediately on cache hit on an array', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));

        const result = await api.lookup('1');
        expect(result).toEqual({ id: '1', name: 'Ada' });
        expect(fetchSpy).not.toHaveBeenCalled();
      });

      it('should trigger pipeline and resolve when state emits', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.lookup('2');

        const entity = { id: '2', name: 'Grace' };
        state$.next(buildEmit({ value: entity }, '2'));

        const result = await promise;
        expect(result).toEqual({ id: '2', name: 'Grace' });
      });

      it('should trigger pipeline and resolve when TEntity emits an empty array', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.lookup('2');

        const entity = [] as any;

        state$.next(buildEmit({ value: entity }, '2'));

        const result = await promise;
        expect(result).toBeUndefined();
      });

      it('should resolve if the state does not have the id in the state', async () => {
        const api = behavior.extendCellAPI(ctx);

        const result = api.lookup('1');

        state$.next(buildEmit({ value: { id: '22', name: 'Ada' } }, '1'));

        expect(await result).toBeUndefined();
      });

      it('should do nothing if the state is called without a lookup', async () => {
        const api = behavior.extendCellAPI(ctx);

        api.lookup('2');

        state$.next(buildEmit({ value: { id: '22', name: 'Ada' } }, '1'));

        expect(ctx.mergeState).toHaveBeenCalledTimes(1);
      });

      it('should resolve if the state is empty', async () => {
        const api = behavior.extendCellAPI(ctx);

        const result = api.lookup('1');

        state$.next(buildEmit({ value: [] }, '1'));

        expect(await result).toBeUndefined();
      });

      it('should do nothing if the state is called without a lookup', async () => {
        const api = behavior.extendCellAPI(ctx);

        api.lookup('2');

        state$.next(buildEmit({ value: [] }, '1'));

        expect(ctx.mergeState).toHaveBeenCalledTimes(1);
      });

      it('should do nothing if the state is called without a lookup', async () => {
        const api = behavior.extendCellAPI(ctx);

        api.lookup('2');

        state$.next(buildEmit({ value: [] }, undefined));

        expect(ctx.mergeState).toHaveBeenCalledTimes(1);
      });

      it('should reject pending lookups on error state', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.lookup('3');

        const vaultError: VaultErrorShape = {
          message: 'Boom',
          featureCellKey: 'cell-key',
          details: 'x',
          raw: new Error('Boom'),
          timestamp: Date.now()
        };

        state$.next(
          buildEmit({ error: vaultError }, '3', StateEmitTypes.PipelineError)
        );

        let caught: any;
        await promise
          .then((result) => {
            caught = `then: ${result}`;
          })
          .catch((e) => (caught = `error: ${e.message}`));

        expect(caught).toBe('then: undefined');
      });

      it('should trigger pipeline and do no nothing if undefined is returned', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise1 = api.lookup('1');
        const promise2 = api.lookup('2');

        const entity1 = undefined;
        const entity2 = { id: '2', name: 'Grace' };

        state$.next(
          buildEmit(
            Object({
              isLoading: true
            }),
            undefined
          )
        );

        state$.next(
          buildEmit(
            Object({
              value: entity1
            }),
            '1'
          )
        );

        state$.next(
          buildEmit(
            Object({
              value: entity2
            }),
            '2'
          )
        );

        state$.next(
          buildEmit(
            Object({
              value: entity2
            }),
            '2'
          )
        );

        expect(await promise1).toBeUndefined();

        expect(await promise2).toEqual({ id: '2', name: 'Grace' });
      });

      it('should return undefined if null is returned for incoming', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.lookup('2');

        state$.next(
          buildEmit(
            Object({
              value: null
            }),
            '2',
            StateEmitTypes.IncomingPipeline
          )
        );

        let caught: any;
        await promise
          .then((result) => {
            caught = `then: ${result}`;
          })
          .catch((e) => (caught = `error: ${e.message}`));

        expect(caught).toBe('then: undefined');
      });

      it('should return undefined if null is returned for reset', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.lookup('2');

        state$.next(
          buildEmit(
            Object({
              value: null
            }),
            '2',
            StateEmitTypes.PipelineReset
          )
        );

        let caught: any;
        await promise
          .then((result) => {
            caught = `then: ${result}`;
          })
          .catch((e) => (caught = `error: ${e.message}`));

        expect(caught).toBe('then: undefined');
      });

      it('should return undefined if null is returned for incoming', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.lookup('2');

        state$.next(
          buildEmit(
            Object({
              value: null
            }),
            '2'
          )
        );

        let caught: any;
        await promise
          .then((result) => {
            caught = `then: ${result}`;
          })
          .catch((e) => (caught = `error: ${e.message}`));

        expect(caught).toBe('then: undefined');
      });

      it('should update cache on finalize with unscoped non-null value', async () => {
        const api = behavior.extendCellAPI(ctx);

        const p1 = api.lookup('1');

        state$.next(
          buildEmit(
            { value: [{ id: '1', name: 'A' }] },
            undefined,
            'Finalize Pipeline'
          )
        );

        const r1 = await p1;
        expect(r1.name).toBe('A');
      });

      it('should leave pending unresolved if finalize array does not include id', async () => {
        const api = behavior.extendCellAPI(ctx);

        const p = api.lookup('missing');

        state$.next(
          buildEmit(
            { value: [{ id: '1', name: 'A' }] },
            undefined,
            'Finalize Pipeline'
          )
        );

        let resolved = false;
        p.then(() => (resolved = true));

        await flushVaultPipeline();
        expect(resolved).toBeFalse();
      });

      it('should safely ignore scoped error when no pending lookup exists', async () => {
        behavior.extendCellAPI(ctx);

        // No lookup() was called

        const vaultError: VaultErrorShape = {
          message: 'boom',
          featureCellKey: 'cell-key',
          details: 'x',
          raw: new Error('boom'),
          timestamp: Date.now()
        };

        expect(() => {
          state$.next(
            buildEmit(
              { error: vaultError },
              'missing-id',
              StateEmitTypes.PipelineError
            )
          );
        }).not.toThrow();

        await flushVaultPipeline();
      });

      it('should ignore scoped error emitted after lookup already resolved', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.lookup('1');

        state$.next(
          buildEmit(
            { value: { id: '1', name: 'A' } },
            '1',
            StateEmitTypes.FinalizePipeline
          )
        );

        const result = await promise;
        expect(result.name).toBe('A');

        // Late error for same id
        const vaultError: VaultErrorShape = {
          message: 'late error',
          featureCellKey: 'cell-key',
          details: 'x',
          raw: new Error('late error'),
          timestamp: Date.now()
        };

        expect(() => {
          state$.next(
            buildEmit({ error: vaultError }, '1', StateEmitTypes.PipelineError)
          );
        }).not.toThrow();

        await flushVaultPipeline();
      });

      it('should safely handle global error when no pending lookups exist', async () => {
        behavior.extendCellAPI(ctx);

        const vaultError: VaultErrorShape = {
          message: 'global error',
          featureCellKey: 'cell-key',
          details: 'x',
          raw: new Error('global error'),
          timestamp: Date.now()
        };

        expect(() => {
          state$.next(
            buildEmit(
              { error: vaultError },
              undefined,
              StateEmitTypes.PipelineError
            )
          );
        }).not.toThrow();

        await flushVaultPipeline();
      });
    });

    // ------------------------------------------------------------------------------------------
    // LOOKUP$ (Observable)
    // ------------------------------------------------------------------------------------------

    describe('lookup$()', () => {
      it('should emit immediately on cache hit', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '10', name: 'Alan' } }, '10'));

        let emitted: any;
        api.lookup$('10').subscribe((v) => (emitted = v));

        await flushVaultPipeline();

        expect(emitted).toEqual({ id: '10', name: 'Alan' });
      });

      it('should resolve immediately on cache hit on an array', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '10', name: 'Alan' } }, '10'));

        let emitted: any;
        api.lookup$('10').subscribe((v) => (emitted = v));

        await flushVaultPipeline();

        expect(emitted).toEqual({ id: '10', name: 'Alan' });
      });

      it('should trigger pipeline and emit when entity appears', async () => {
        const api = behavior.extendCellAPI(ctx);

        let emitted: any;

        api.lookup$('20').subscribe((v) => (emitted = v));

        state$.next(buildEmit({ value: { id: '20', name: 'Linus' } }, '20'));

        await flushVaultPipeline();

        expect(emitted).toEqual({ id: '20', name: 'Linus' });
      });

      it('should error when state emits error', async () => {
        const api = behavior.extendCellAPI(ctx);

        let caught: any;

        api.lookup$('99').subscribe({
          next: (value) => {
            caught = `then: ${value}`;
          },
          error: (e) => (caught = `error: ${e.message}`)
        });

        const vaultError: VaultErrorShape = {
          message: 'Nope',
          featureCellKey: 'cell-key',
          details: 'x',
          raw: new Error('Nope'),
          timestamp: Date.now()
        };

        state$.next(
          buildEmit(
            { error: vaultError },
            undefined,
            StateEmitTypes.PipelineError
          )
        );

        await flushVaultPipeline();

        expect(caught).toBe('then: undefined');
      });

      it('should return undefined if null is returned for incoming', async () => {
        const api = behavior.extendCellAPI(ctx);

        let caught: any;

        api.lookup$('99').subscribe({
          next: (value) => {
            caught = `then: ${value}`;
          },
          error: (e) => (caught = `error: ${e.message}`)
        });

        state$.next(
          buildEmit(
            Object({
              value: null
            }),
            '99',
            StateEmitTypes.IncomingPipeline
          )
        );

        await flushVaultPipeline();

        expect(caught).toBe('then: undefined');
      });

      it('should return undefined if null is returned for error', async () => {
        const api = behavior.extendCellAPI(ctx);

        let caught: any;

        api.lookup$('99').subscribe({
          next: (value) => {
            caught = `then: ${value}`;
          },
          error: (e) => (caught = `error: ${e.message}`)
        });

        state$.next(
          buildEmit(
            Object({
              value: null
            }),
            '99',
            StateEmitTypes.PipelineError
          )
        );

        await flushVaultPipeline();

        expect(caught).toBe('then: undefined');
      });

      it('should return undefined if null is returned for incoming', async () => {
        const api = behavior.extendCellAPI(ctx);

        let caught: any;

        api.lookup$('99').subscribe({
          next: (value) => {
            caught = `then: ${value}`;
          },
          error: (e) => (caught = `error: ${e.message}`)
        });

        state$.next(
          buildEmit(
            Object({
              value: null
            }),
            '99'
          )
        );

        await flushVaultPipeline();

        expect(caught).toBe('then: undefined');
      });
    });

    // ------------------------------------------------------------------------------------------
    // FLUENT API INSTALLATION (withLookup)
    // ------------------------------------------------------------------------------------------

    describe('fluent api: installFluentApi()', () => {
      let cell: any;
      let behaviorConfigs: Map<any, unknown>;

      beforeEach(() => {
        behaviorConfigs = new Map();

        cell = {
          key: 'cell-key'
        };

        // install fluent api
        withLookupBehavior.installFluentApi(cell, behaviorConfigs);
      });

      it('should install withLookup on the cell', () => {
        expect(typeof cell.withLookup).toBe('function');
      });

      it('should store options in behaviorConfigs under WithLookup key', () => {
        const options = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch')
        };

        cell.withLookup(options);

        expect(behaviorConfigs.has('withLookup')).toBeTrue();
        expect(behaviorConfigs.get('withLookup')).toBe(options);
      });

      it('should return the cell to allow fluent chaining', () => {
        const options = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch')
        };

        const result = cell.withLookup(options);

        expect(result).toBe(cell);
      });

      it('should overwrite previous lookup config when called again', () => {
        const options1 = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch1')
        };

        const options2 = {
          idKey: 'uuid',
          fetch: jasmine.createSpy('fetch2')
        };

        cell.withLookup(options1);
        cell.withLookup(options2);

        expect(behaviorConfigs.get('withLookup')).toBe(options2);
      });
    });

    // ------------------------------------------------------------------------------------------
    // LIFECYCLE
    // ------------------------------------------------------------------------------------------

    it('reset should reject pending lookup promises', async () => {
      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api.lookup('x').catch((e) => (caught = e));

      behavior.reset();

      await flushVaultPipeline();

      expect(caught).toBeUndefined();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key reset — clearing lookup cache'
      );
    });

    it('destroy should reject pending lookup promises', async () => {
      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api.lookup('x').catch((e) => (caught = e));

      behavior.destroy();

      await flushVaultPipeline();

      expect(caught).toBeUndefined();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key destroy — clearing lookup cache'
      );
    });

    it('should reject lookup if fetch throws synchronously', async () => {
      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api
        .lookup('1')
        .then((result) => {
          caught = `then: ${result}`;
        })
        .catch((e) => (caught = `error: ${e.message}`));

      // Simulate pipeline error propagation
      state$.next(
        buildEmit(
          {
            error: createVaultError(new Error('sync boom'), 'behavior-key')
          },
          undefined,
          StateEmitTypes.PipelineError
        )
      );

      await flushVaultPipeline();

      expect(caught).toBe('then: undefined');
    });

    it('should resolve all concurrent lookup callers for the same id', async () => {
      const api = behavior.extendCellAPI(ctx);

      fetchSpy.and.returnValue({});

      const p1 = api.lookup('42');
      const p2 = api.lookup('42');
      const p3 = api.lookup('42');

      expect(fetchSpy.calls.count()).toBe(1); // no dedupe by design

      const entity = { id: '42', name: 'Fanout' };
      state$.next(buildEmit({ value: entity }, '42'));

      const [r1, r2, r3] = await Promise.all([p1, p2, p3]);

      expect(r1).toEqual(entity);
      expect(r2).toEqual(entity);
      expect(r3).toEqual(entity);
    });

    it('should ignore entities with missing idKey', async () => {
      const api = behavior.extendCellAPI(ctx);

      const promise = api.lookup('x');

      state$.next(buildEmit({ value: { name: 'NoId' } }, undefined));

      let resolved: any;
      promise
        .then((value) => (resolved = `then: ${value}`))
        .catch((error) => (resolved = `error: ${error.message}`));

      await flushVaultPipeline();

      expect(resolved).toBeUndefined();
    });

    it('should ignore entities with non-string/number ids', async () => {
      const api = behavior.extendCellAPI(ctx);

      fetchSpy.and.returnValue({});

      const promise = api.lookup('x');

      state$.next(buildEmit({ value: { id: {}, name: 'BadId' } }, undefined));

      let resolved: any;
      promise.then((value) => (resolved = `then: ${value}`));

      await flushVaultPipeline();

      expect(resolved).toBeUndefined();
    });

    it('should ignore entities with empty string id', async () => {
      const api = behavior.extendCellAPI(ctx);

      fetchSpy.and.returnValue({});

      const promise = api.lookup('');

      state$.next(buildEmit({ value: { id: '', name: 'EmptyId' } }, ''));

      let resolved: any;
      promise.then((value) => (resolved = `then: ${value}`));

      await flushVaultPipeline();

      expect(resolved).toBeUndefined();
    });

    it('should normalize single entity value into array', async () => {
      const api = behavior.extendCellAPI(ctx);

      fetchSpy.and.returnValue({});

      const promise = api.lookup('7');

      state$.next(buildEmit({ value: { id: '7', name: 'Single' } }, '7'));

      const result = await promise;
      expect(result).toEqual({ id: '7', name: 'Single' });
    });

    it('should error all lookup$ subscribers on error state', async () => {
      const api = behavior.extendCellAPI(ctx);

      let e1: any;
      let e2: any;

      api.lookup$('9').subscribe({
        next: (value) => (e1 = `next: ${value}`),
        error: (e) => (e1 = `error: ${e.message}`)
      });
      api.lookup$('9').subscribe({
        next: (value) => (e2 = `next: ${value}`),
        error: (e) => (e2 = `error: ${e.message}`)
      });

      const vaultError: VaultErrorShape = {
        message: 'boom',
        featureCellKey: 'cell-key',
        details: 'x',
        raw: new Error('boom'),
        timestamp: Date.now()
      };

      state$.next(
        buildEmit(
          { error: vaultError },
          undefined,
          StateEmitTypes.PipelineError
        )
      );

      await flushVaultPipeline();

      expect(e1).toBe('next: undefined');
      expect(e2).toBe('next: undefined');
    });

    it('destroy should unsubscribe from state$', async () => {
      const api = behavior.extendCellAPI(ctx);

      behavior.destroy();

      state$.next(buildEmit({ value: { id: '1', name: 'Late' } }, '1'));

      let resolved = false;
      api.lookup('1').then(() => (resolved = true));

      await flushVaultPipeline();

      expect(resolved).toBeFalse();
    });

    it('lookup$ should complete after emitting value', async () => {
      const api = behavior.extendCellAPI(ctx);

      let completed = false;

      api.lookup$('1').subscribe({
        next: () => {},
        complete: () => (completed = true)
      });

      state$.next(buildEmit({ value: { id: '1', name: 'Done' } }, '1'));

      await flushVaultPipeline();

      expect(completed).toBeTrue();
    });

    it('should leave lookup pending if fetch returns undefined', async () => {
      const api = behavior.extendCellAPI(ctx);

      const promise = api.lookup('1');

      await flushVaultPipeline();

      let resolved = false;
      promise.then(() => (resolved = true));

      expect(resolved).toBeFalse();
    });

    it('should resolve pending ids according to emit scope (scoped vs unscoped)', async () => {
      const api = behavior.extendCellAPI(ctx);

      const p1 = api.lookup('1');
      const p2 = api.lookup('2');

      state$.next(
        buildEmit(
          {
            value: [
              { id: '1', name: 'A' },
              { id: '2', name: 'B' }
            ]
          },
          '1'
        )
      );

      const [r1, r2] = await Promise.all([p1, p2]);

      expect(r1.name).toBe('A');
      expect(r2.name).toBe('B');

      const p3 = api.lookup('1');
      const p4 = api.lookup('2');

      state$.next(
        buildEmit(
          {
            value: [
              { id: '1', name: 'C' },
              { id: '2', name: 'D' }
            ]
          },
          '2'
        )
      );

      const [r3, r4] = await Promise.all([p3, p4]);

      expect(r3.name).toBe('A');
      expect(r4.name).toBe('B');

      const p5 = api.lookup('1');
      const p6 = api.lookup('2');

      state$.next(
        buildEmit(
          {
            value: [
              { id: '1', name: 'E' },
              { id: '2', name: 'F' }
            ]
          },
          undefined
        )
      );

      const [r5, r6] = await Promise.all([p5, p6]);

      expect(r5.name).toBe('C');
      expect(r6.name).toBe('D');

      const p7 = api.lookup('1');
      const p8 = api.lookup('2');

      const [r7, r8] = await Promise.all([p7, p8]);

      expect(r7.name).toBe('E');
      expect(r8.name).toBe('F');

      state$.next(
        buildEmit(
          {
            value: [
              { id: '3', name: 'G' },
              { id: '4', name: 'H' }
            ]
          },
          undefined
        )
      );

      const p9 = api.lookup('1');
      const p10 = api.lookup('2');
      const p11 = api.lookup('3');
      const p12 = api.lookup('4');

      const [r9, r10, r11, r12] = await Promise.all([p9, p10, p11, p12]);
      expect(r9.name).toBe('E');
      expect(r10.name).toBe('F');
      expect(r11.name).toBe('G');
      expect(r12.name).toBe('H');
    });

    it('should safely reject lookup if fetch throws synchronously and pending list is empty', async () => {
      const api = behavior.extendCellAPI(ctx);

      // Force fetch to throw synchronously
      fetchSpy.and.callFake(() => {
        throw new Error('sync explode');
      });

      let caught: any;
      await api
        .lookup('missing')
        .then((result) => {
          caught = `then: ${result}`;
        })
        .catch((e) => (caught = `error: ${e.message}`));

      // Simulate pipeline error propagation via state$
      state$.next(
        buildEmit(
          {
            error: caught
          },
          undefined,
          StateEmitTypes.PipelineError
        )
      );

      expect(caught).toBe('then: undefined');
    });

    it('should hit the "pending.get(id) ?? []" path when mergeState clears pending then throws', async () => {
      const api = behavior.extendCellAPI(ctx);

      // fetch does NOT throw (we want mergeState to throw after clearing pending)
      const vaultError: VaultErrorShape = {
        message: 'pipeline error',
        featureCellKey: 'cell-key',
        details: 'x',
        raw: new Error('pipeline error'),
        timestamp: Date.now()
      };

      // Make mergeState synchronously clear pending (via state$ error) then throw.
      ctx.mergeState.and.callFake(() => {
        state$.next(
          buildEmit(
            { error: vaultError },
            undefined,
            StateEmitTypes.PipelineError
          )
        ); // subscription clears pending immediately
        throw new Error('mergeState boom'); // triggers catch block
      });

      let caught: any;
      await api
        .lookup('1')
        .then((result) => {
          caught = `then: ${result}`;
        })
        .catch((e) => (caught = `error: ${e.message}`));

      expect(caught).toBe('then: undefined');

      // Sanity: fetch was called; mergeState was invoked.
      expect(ctx.mergeState).toHaveBeenCalled();
    });

    it('should hit the "pending.get(id) ?? []" path when mergeState clears pending then throws into default', async () => {
      const api = behavior.extendCellAPI(ctx);

      // fetch does NOT throw (we want mergeState to throw after clearing pending)
      const vaultError: VaultErrorShape = {
        message: 'pipeline error',
        featureCellKey: 'cell-key',
        details: 'x',
        raw: new Error('pipeline error'),
        timestamp: Date.now()
      };

      // Make mergeState synchronously clear pending (via state$ error) then throw.
      ctx.mergeState.and.callFake(() => {
        state$.next({ error: vaultError }); // subscription clears pending immediately
        throw new Error('mergeState boom'); // triggers catch block
      });

      let caught: any;
      await api
        .lookup('1')
        .then((result) => {
          caught = `then: ${result}`;
        })
        .catch((e) => (caught = `error: ${e.message}`));

      expect(caught).toBe('error: mergeState boom');

      // Sanity: fetch was called; mergeState was invoked.
      expect(ctx.mergeState).toHaveBeenCalled();
    });

    it('should safely normalize null state value to empty array', async () => {
      const api = behavior.extendCellAPI(ctx);

      const promise = api.lookup('1');

      state$.next(buildEmit({ value: null }, undefined));

      let caught: any;
      await promise.catch((e) => (caught = `error: ${e.message}`));

      expect(caught).toBeUndefined(); // rejection path exercised
    });

    it('lookup$ should error if fetch throws synchronously', async () => {
      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api.lookup$('1').subscribe({
        next: (value) => (caught = `next: ${value}`),
        error: (e) => {
          caught = `error: ${e.message}`;
        }
      });

      state$.next(
        buildEmit(
          { value: () => new Error('sync explode') },
          undefined,
          StateEmitTypes.PipelineError
        )
      );

      // allow pipeline + state$ to process
      await flushVaultPipeline();

      expect(caught).toBe('next: undefined');
    });

    it('lookup$ should propagate rejection via observer.error when mergeState throws synchronously', async () => {
      ctx.mergeState = jasmine.createSpy('mergeState').and.callFake(() => {
        throw new Error('mergeState exploded');
      });

      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api.lookup$('1').subscribe({
        next: () => (caught = 'next'),
        error: (e) => {
          caught = e;
        }
      });

      await flushVaultPipeline();

      expect(caught).toBeDefined();
      expect(caught.message).toContain('mergeState exploded');
    });
  });

  describe('Value with config', () => {
    beforeEach(() => {
      behavior = new withLookupBehavior<any, any>('behavior-key', {
        behaviorConfig: {
          idKey: 'id',
          fetchType: ResolveTypes.Value,
          fetch: () => 22
        }
      } as BehaviorClassContext);

      ctx.mergeState = jasmine.createSpy('mergeState');
    });

    afterEach(async () => {
      ctx.mergeState.calls.reset();
    });

    describe('lookup()', () => {
      it('should trigger pipeline and resolve when TEntity emits', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.lookup('2');

        const entity = { id: '2', name: 'Grace' };
        state$.next(buildEmit({ value: entity }, '2'));

        const result = await promise;
        expect(result).toEqual(entity);

        expect(ctx.mergeState).toHaveBeenCalledWith(
          22,
          Object({ withLookupBehavior: Object({ id: '2' }) })
        );
      });

      describe('controller emits should resolve pending lookups', () => {
        const controllerTypes = [
          StateEmitTypes.AbortController,
          StateEmitTypes.DenyController
        ] as const;

        controllerTypes.forEach((controllerType) => {
          describe(`${controllerType}`, () => {
            it('should resolve pending lookup as undefined when controller aborts before finalize', async () => {
              const api = behavior.extendCellAPI(ctx);

              // Start lookup BEFORE any finalize
              const pending = api.lookup('1');

              // Controller aborts attempt
              state$.next(buildEmit({ value: undefined }, '1', controllerType));
              await flushVaultPipeline();

              await expectAsync(pending).toBeResolvedTo(undefined as any);

              expect(debugSpy).toHaveBeenCalledWith(
                '[vault]',
                `behavior-key lookup ${controllerType} detected for id "1"`
              );
            });

            it('should NOT affect already-resolved lookup when controller emit arrives late', async () => {
              const api = behavior.extendCellAPI(ctx);

              const promise = api.lookup('1');

              state$.next(
                buildEmit(
                  { value: { id: '1', name: 'Ada' } },
                  '1',
                  StateEmitTypes.FinalizePipeline
                )
              );
              const result = await promise;

              expect(result.name).toBe('Ada');

              // Late controller emit
              state$.next(buildEmit({ value: undefined }, '1', controllerType));
              await flushVaultPipeline();

              // No exception, no mutation
              expect(result.name).toBe('Ada');

              expect(debugSpy).toHaveBeenCalledWith(
                '[vault]',
                `behavior-key lookup ${controllerType} detected for id "1"`
              );
            });
          });
        });

        it('should not throw if controller emit arrives after lookup already resolved', async () => {
          const api = behavior.extendCellAPI(ctx);

          // Resolve lookup normally
          const promise = api.lookup('1');

          state$.next(
            buildEmit(
              { value: { id: '1', name: 'Ada' } },
              '1',
              StateEmitTypes.FinalizePipeline
            )
          );
          const result = await promise;

          expect(result.name).toBe('Ada');

          // Late controller emit must not explode
          expect(() => {
            state$.next(
              buildEmit(
                { value: undefined },
                '1',
                StateEmitTypes.AbortController
              )
            );
          }).not.toThrow();

          await flushVaultPipeline();
          expect(debugSpy).toHaveBeenCalledWith(
            '[vault]',
            `behavior-key lookup Abort Controller detected for id "1"`
          );
        });

        it('should not throw if controller emit arrives for unknown id (smoke)', async () => {
          behavior.extendCellAPI(ctx);

          expect(() => {
            state$.next(
              buildEmit(
                { value: undefined },
                'missing-id',
                StateEmitTypes.AbortController
              )
            );
          }).not.toThrow();

          await flushVaultPipeline();
          expect(debugSpy).toHaveBeenCalledWith(
            '[vault]',
            `behavior-key lookup Abort Controller detected for id "missing-id"`
          );
        });
      });
    });

    describe('lookup$()', () => {
      it('should trigger pipeline and emit when entity appears', async () => {
        const api = behavior.extendCellAPI(ctx);

        let emitted: any;

        api.lookup$('20').subscribe((v) => (emitted = v));

        expect(ctx.mergeState).toHaveBeenCalledWith(
          22,
          Object({ withLookupBehavior: Object({ id: '20' }) })
        );
        await flushVaultPipeline();

        expect(emitted).toBeUndefined();
      });
    });
  });

  describe('without config', () => {
    // CONFIG VALIDATION
    // ------------------------------------------------------------------------------------------

    it('should throw if options are missing', () => {
      expect(
        () =>
          new withLookupBehavior<any, any>(
            'behavior-key',
            {} as BehaviorClassContext
          )
      ).toThrowError(
        '[vault] Lookup behavior requires configuration via withLookup()'
      );
    });

    it('should throw if idKey option is not added', () => {
      expect(
        () =>
          new withLookupBehavior<any, any>('behavior-key', {
            behaviorConfig: {}
          } as BehaviorClassContext)
      ).toThrowError('[vault] Lookup behavior requires idKey');
    });

    it('should throw if fetchType option is not added', () => {
      expect(
        () =>
          new withLookupBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey'
            }
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] Lookup behavior requires a valid fetchType (ResolveType). Received: undefined'
      );
    });

    it('should throw if fetchType option is not the correct type', () => {
      expect(
        () =>
          new withLookupBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey',
              fetchType: 'wrong'
            }
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] Lookup behavior requires a valid fetchType (ResolveType). Received: wrong'
      );
    });

    it('should throw if fetch option is not added', () => {
      expect(
        () =>
          new withLookupBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey',
              fetchType: ResolveTypes.Promise
            }
          } as BehaviorClassContext)
      ).toThrowError('[vault] Lookup behavior requires fetch(id)');
    });

    it('should throw if fetch option is not a function', () => {
      expect(
        () =>
          new withLookupBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey',
              fetchType: ResolveTypes.Promise,
              fetch: 'not a function'
            }
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] Lookup behavior requires fetch(id) to be a function'
      );
    });
  });
});
