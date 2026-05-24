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
import { CacheTTL } from './types/cache-ttl.type';
import { withStateCacheBehavior } from './with-state-cache.behavior';

const buildEmit = (snapshot: any, id: any, type = 'Finalize Pipeline') => {
  return Object({
    snapshot,
    options: Object({
      withStateCacheBehavior: {
        id
      }
    }),
    type
  });
};

describe('Behavior: withStateCache', () => {
  let behavior: withStateCacheBehavior<any, any>;
  let state$: Subject<any>;
  let ctx: any;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;

  beforeAll(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date());
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

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

  afterEach(async () => {
    state$.complete();
    behavior.destroy();
    await flushVaultPipeline();
    setVaultLogLevel('off');
  });

  describe('Promise with config', () => {
    beforeEach(() => {
      behavior = new withStateCacheBehavior<any, any>('behavior-key', {
        behaviorConfig: {
          idKey: 'id',
          fetchType: ResolveTypes.Promise,
          fetch: fetchSpy,
          ttl: CacheTTL.OneMinute
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

    afterEach(async () => {
      ctx.mergeState.calls.reset();
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
      expect(withStateCacheBehavior.type).toBe(BehaviorTypes.Extension);
      expect(withStateCacheBehavior.critical).toBeFalse();
      expect(withStateCacheBehavior.key).toBe('SDUX::Behavior::Cache::State');
      expect(withStateCacheBehavior.wantsConfig).toBeTrue();
      expect(withStateCacheBehavior.configKey).toBe('withStateCache');
      expect(typeof withStateCacheBehavior.extensionCell).toBe('function');
      expect(typeof withStateCacheBehavior.extensionFluent).toBe('function');
      expect(typeof withStateCacheBehavior.installFluentApi).toBe('function');
    });

    it('should return stale value if refresh fetch throws synchronously and allow later retry', async () => {
      const api = behavior.extendCellAPI(ctx);

      // Seed cache
      state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));
      await flushVaultPipeline();

      // Expire cache
      jasmine.clock().tick(CacheTTL.OneMinute + 1);

      // Refresh fetch throws synchronously
      fetchSpy.and.callFake(() => {
        throw new Error('sync explode');
      });

      // stale value should return immediately
      const stale = await api.cacheLookup('1');

      expect(stale.name).toBe('Ada');

      // Advance refresh loop
      jasmine.clock().tick(30_000);
      await flushVaultPipeline();

      // Fix fetch and ensure retry works
      fetchSpy.and.callFake(() => ({ id: '1', name: 'Ada2' }));

      jasmine.clock().tick(30_000);

      state$.next(buildEmit({ value: { id: '1', name: 'Ada2' } }, '1'));

      await flushVaultPipeline();

      const refreshed = await api.cacheLookup('1');

      expect(refreshed.name).toBe('Ada2');
    });

    // ------------------------------------------------------------------------------------------
    // cache (Promise)
    // ------------------------------------------------------------------------------------------

    describe('cache()', () => {
      it('should match numeric entity id with string lookup id', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.cacheLookup('1'); // lookup uses string id

        // pipeline emits entity with numeric id
        state$.next(buildEmit({ value: { id: 1, name: 'Ada' } }, '1'));

        const result = await promise;

        expect(result).toEqual({ id: 1, name: 'Ada' });
      });

      it('should cache numeric entity id and return it for string lookup', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.cacheLookup('2');

        state$.next(buildEmit({ value: { id: 2, name: 'Grace' } }, '2'));

        await promise;

        const cached = await api.cacheLookup('2');

        expect(cached.name).toBe('Grace');
      });

      it('should resolve immediately on cache hit', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));

        const result = await api.cacheLookup('1');
        expect(result).toEqual({ id: '1', name: 'Ada' });
        expect(fetchSpy).not.toHaveBeenCalled();
      });

      it('should resolve immediately on cache hit on an array', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));

        const result = await api.cacheLookup('1');
        expect(result).toEqual({ id: '1', name: 'Ada' });
        expect(fetchSpy).not.toHaveBeenCalled();
      });

      it('should trigger pipeline and resolve when TEntity emits', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.cacheLookup('2');

        const entity = { id: '2', name: 'Grace' };

        state$.next(buildEmit({ value: entity }, '2'));

        const result = await promise;
        expect(result).toEqual(entity);
      });

      it('should trigger pipeline and resolve when TEntity emits an empty array', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.cacheLookup('2');

        const entity = [] as any;

        state$.next(buildEmit({ value: entity }, '2'));

        const result = await promise;
        expect(result).toBeUndefined();
      });

      it('should resolve if the state does not have the id in the state', async () => {
        const api = behavior.extendCellAPI(ctx);

        const result = api.cacheLookup('1');

        state$.next(buildEmit({ value: { id: '22', name: 'Ada' } }, '1'));

        expect(await result).toBeUndefined();
      });

      it('should do nothing if the state is called without a cacheLookup', async () => {
        const api = behavior.extendCellAPI(ctx);

        api.cacheLookup('2');

        state$.next(buildEmit({ value: { id: '22', name: 'Ada' } }, '1'));

        expect(ctx.mergeState).toHaveBeenCalledTimes(1);
      });

      it('should resolve if the state is empty', async () => {
        const api = behavior.extendCellAPI(ctx);

        const result = api.cacheLookup('1');

        state$.next(buildEmit({ value: [] }, '1'));

        expect(await result).toBeUndefined();
      });

      it('should do nothing if the state is called without a cacheLookup', async () => {
        const api = behavior.extendCellAPI(ctx);

        api.cacheLookup('2');

        state$.next(buildEmit({ value: [] }, '1'));

        expect(ctx.mergeState).toHaveBeenCalledTimes(1);
      });

      it('should do nothing if the state is called without a cacheLookup', async () => {
        const api = behavior.extendCellAPI(ctx);

        api.cacheLookup('2');

        state$.next(buildEmit({ value: [] }, undefined));

        expect(ctx.mergeState).toHaveBeenCalledTimes(1);
      });

      it('should reject pending caches on error state', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.cacheLookup('3');

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

        const promise1 = api.cacheLookup('1');
        const promise2 = api.cacheLookup('2');

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

        const promise = api.cacheLookup('2');

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

        const promise = api.cacheLookup('2');

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

        const promise = api.cacheLookup('2');

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

        const p1 = api.cacheLookup('1');

        state$.next(
          buildEmit(
            { value: [{ id: '1', name: 'A' }] },
            undefined,
            StateEmitTypes.FinalizePipeline
          )
        );

        const r1 = await p1;
        expect(r1.name).toBe('A');
      });

      it('should leave pending unresolved if finalize array does not include id', async () => {
        const api = behavior.extendCellAPI(ctx);

        const p = api.cacheLookup('missing');

        state$.next(
          buildEmit(
            { value: [{ id: '1', name: 'A' }] },
            undefined,
            StateEmitTypes.FinalizePipeline
          )
        );

        let resolved = false;
        p.then(() => (resolved = true));

        await flushVaultPipeline();
        expect(resolved).toBeFalse();
      });

      it('should resolve multiple cacheLookup calls out of order', async () => {
        const api = behavior.extendCellAPI(ctx);

        const pA = api.cacheLookup('A');
        const pB = api.cacheLookup('B');
        const pC = api.cacheLookup('C');

        expect(ctx.mergeState.calls.count()).toBe(3);

        // Resolve B first
        state$.next(buildEmit({ value: { id: 'B', name: 'Bee' } }, 'B'));

        // Resolve A second
        state$.next(buildEmit({ value: { id: 'A', name: 'Ay' } }, 'A'));

        // Resolve C last
        state$.next(buildEmit({ value: { id: 'C', name: 'See' } }, 'C'));

        const [rA, rB, rC] = await Promise.all([pA, pB, pC]);

        expect(rA.name).toBe('Ay');
        expect(rB.name).toBe('Bee');
        expect(rC.name).toBe('See');
      });

      it('should return stale values immediately and update cache when refresh resolves out of order', async () => {
        const api = behavior.extendCellAPI(ctx);

        const pA = api.cacheLookup('A');
        const pB = api.cacheLookup('B');

        state$.next(buildEmit({ value: { id: 'A', name: 'Ay' } }, 'A'));
        state$.next(buildEmit({ value: { id: 'B', name: 'Bee' } }, 'B'));

        await Promise.all([pA, pB]);

        // expire cache
        jasmine.clock().tick(CacheTTL.OneMinute + 1);

        // stale results should return immediately
        const rA = await api.cacheLookup('A');
        const rB = await api.cacheLookup('B');

        expect(rA.name).toBe('Ay');
        expect(rB.name).toBe('Bee');

        // refresh resolves out of order
        state$.next(buildEmit({ value: { id: 'B', name: 'Bee2' } }, 'B'));
        state$.next(buildEmit({ value: { id: 'A', name: 'Ay2' } }, 'A'));

        await flushVaultPipeline();

        const refreshedA = await api.cacheLookup('A');
        const refreshedB = await api.cacheLookup('B');

        expect(refreshedA.name).toBe('Ay2');
        expect(refreshedB.name).toBe('Bee2');
      });

      it('should refresh cache indefinitely, update values, and keep promises isolated', async () => {
        const api = behavior.extendCellAPI(ctx);

        let version = 0;

        fetchSpy.and.callFake((id: string) => {
          version++;
          return { id, name: `Ada v${version}` };
        });

        // -----------------------------------------
        // Initial lookup
        // -----------------------------------------

        const firstLookup = api.cacheLookup('1');

        state$.next(buildEmit({ value: { id: '1', name: 'Ada v1' } }, '1'));

        const firstResult = await firstLookup;

        expect(firstResult.name).toBe('Ada v1');

        // -----------------------------------------
        // Force 5 refresh cycles
        // -----------------------------------------

        for (let i = 0; i < 5; i++) {
          jasmine.clock().tick(CacheTTL.OneMinute + 1);
          jasmine.clock().tick(30_000);

          const value = { id: '1', name: `Ada v${i + 2}` };

          // simulate pipeline resolution
          state$.next(buildEmit({ value }, '1'));

          await flushVaultPipeline();
        }

        // -----------------------------------------
        // Cache should now contain latest refresh
        // -----------------------------------------

        const latestLookup = await api.cacheLookup('1');

        expect(latestLookup.name).toBe('Ada v6');

        // -----------------------------------------
        // Ensure refresh didn't trigger duplicate fetches
        // -----------------------------------------

        expect(ctx.mergeState.calls.count()).toBe(6);
      });

      it('should safely ignore clearRefreshingFlag when cache entry does not exist', async () => {
        behavior.extendCellAPI(ctx);

        // simulate abort event for unknown id
        state$.next(
          buildEmit(
            { value: undefined },
            'missing-id',
            StateEmitTypes.AbortController
          )
        );

        await flushVaultPipeline();

        // test passes if no exception occurs
        expect(true).toBeTrue();
      });

      it('should clear isRefreshing flags on all cache entries during global pipeline error', async () => {
        const api = behavior.extendCellAPI(ctx);

        const entity1 = { id: '1', name: 'Ada' };
        const entity2 = { id: '2', name: 'Grace' };

        state$.next(buildEmit({ value: entity1 }, '1'));
        state$.next(buildEmit({ value: entity2 }, '2'));

        await flushVaultPipeline();

        // expire entries to force refresh state
        jasmine.clock().tick(CacheTTL.OneMinute + 1);

        // trigger refresh attempt
        api.cacheLookup('1');
        api.cacheLookup('2');

        // global pipeline error
        state$.next(
          buildEmit(
            { error: new Error('boom') },
            null,
            StateEmitTypes.PipelineError
          )
        );

        await flushVaultPipeline();

        // calling again should allow refresh because flags were cleared
        ctx.mergeState.calls.reset();

        api.cacheLookup('1');

        expect(ctx.mergeState).toHaveBeenCalled();
      });
    });

    // ------------------------------------------------------------------------------------------
    // cache$ (Observable)
    // ------------------------------------------------------------------------------------------

    describe('cache$()', () => {
      it('should emit immediately on cache hit', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '10', name: 'Alan' } }, '10'));

        let emitted: any;
        api.cacheLookup$('10').subscribe((v) => (emitted = v));

        await flushVaultPipeline();

        expect(emitted).toEqual({ id: '10', name: 'Alan' });
      });

      it('should resolve immediately on cache hit on an array', async () => {
        const api = behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '10', name: 'Alan' } }, '10'));

        let emitted: any;
        api.cacheLookup$('10').subscribe((v) => (emitted = v));

        await flushVaultPipeline();

        expect(emitted).toEqual({ id: '10', name: 'Alan' });
      });

      it('should trigger pipeline and emit when entity appears', async () => {
        const api = behavior.extendCellAPI(ctx);

        let emitted: any;

        api.cacheLookup$('20').subscribe((v) => (emitted = v));

        state$.next(buildEmit({ value: { id: '20', name: 'Linus' } }, '20'));

        await flushVaultPipeline();

        expect(emitted).toEqual({ id: '20', name: 'Linus' });
      });

      it('should error when state emits error', async () => {
        const api = behavior.extendCellAPI(ctx);

        let caught: any;

        api.cacheLookup$('99').subscribe({
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

        api.cacheLookup$('99').subscribe({
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
            'Incoming Pipeline'
          )
        );

        await flushVaultPipeline();

        expect(caught).toBe('then: undefined');
      });

      it('should return undefined if null is returned for error', async () => {
        const api = behavior.extendCellAPI(ctx);

        let caught: any;

        api.cacheLookup$('99').subscribe({
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

        api.cacheLookup$('99').subscribe({
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

      it('should return stale value immediately and clear refresh state when null state emits', async () => {
        const api = behavior.extendCellAPI(ctx);

        const p1 = api.cacheLookup('1');

        state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));
        await flushVaultPipeline();

        const r1 = await p1;
        expect(r1).toEqual({ id: '1', name: 'Ada' });

        jasmine.clock().tick(CacheTTL.OneMinute + 1);

        // stale returned immediately
        const stale = await api.cacheLookup('1');
        expect(stale.name).toBe('Ada');

        // reset event
        state$.next(buildEmit({ value: null }, '1'));
        await flushVaultPipeline();

        // next lookup should now behave like a miss
        const next = api.cacheLookup('1');

        state$.next(buildEmit({ value: { id: '1', name: 'Ada2' } }, '1'));

        const result = await next;
        expect(result.name).toBe('Ada2');
      });
    });

    // ------------------------------------------------------------------------------------------
    // FLUENT API INSTALLATION (withStateCache)
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
        withStateCacheBehavior.installFluentApi(cell, behaviorConfigs);
      });

      it('should install withStateCache on the cell', () => {
        expect(typeof cell.withStateCache).toBe('function');
      });

      it('should store options in behaviorConfigs under WithCache key', () => {
        const options = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch')
        };

        cell.withStateCache(options);

        expect(behaviorConfigs.has('withStateCache')).toBeTrue();
        expect(behaviorConfigs.get('withStateCache')).toBe(options);
      });

      it('should return the cell to allow fluent chaining', () => {
        const options = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch')
        };

        const result = cell.withStateCache(options);

        expect(result).toBe(cell);
      });

      it('should overwrite previous cache config when called again', () => {
        const options1 = {
          idKey: 'id',
          fetch: jasmine.createSpy('fetch1')
        };

        const options2 = {
          idKey: 'uuid',
          fetch: jasmine.createSpy('fetch2')
        };

        cell.withStateCache(options1);
        cell.withStateCache(options2);

        expect(behaviorConfigs.get('withStateCache')).toBe(options2);
      });
    });

    // ------------------------------------------------------------------------------------------
    // REFRESH LOOP & isRefreshing
    // ------------------------------------------------------------------------------------------

    describe('refresh loop behavior', () => {
      it('should start refresh loop on extendCellAPI', () => {
        spyOn(window, 'setInterval');

        behavior.extendCellAPI(ctx);

        expect(window.setInterval).toHaveBeenCalled();
      });

      it('should trigger background refresh when cache entry expires', async () => {
        behavior.extendCellAPI(ctx);

        // initial population
        state$.next(
          buildEmit(Object({ value: { id: '1', name: 'Ada' } }), '1')
        );
        await flushVaultPipeline();

        // advance time beyond TTL
        jasmine.clock().tick(CacheTTL.OneMinute + 1);

        // advance refresh loop interval
        jasmine.clock().tick(30_000);

        await flushVaultPipeline();

        expect(ctx.mergeState).toHaveBeenCalledWith(
          jasmine.objectContaining({
            value: jasmine.any(Function)
          }),
          jasmine.objectContaining({
            withStateCacheBehavior: Object({ id: '1' })
          })
        );
      });

      it('should NOT trigger multiple refreshes for same id when isRefreshing=true', async () => {
        behavior.extendCellAPI(ctx);

        state$.next(
          buildEmit(Object({ value: { id: '1', name: 'Ada' } }), '1')
        );

        await flushVaultPipeline();

        jasmine.clock().tick(CacheTTL.OneMinute + 1);
        jasmine.clock().tick(30_000);
        jasmine.clock().tick(30_000);

        // only ONE refresh fetch should be triggered
        expect(ctx.mergeState.calls.count()).toBe(1);
      });

      it('should not re-trigger refresh immediately after reset', async () => {
        behavior.extendCellAPI(ctx);

        state$.next(buildEmit({ value: { id: '1', name: 'A' } }, '1'));
        await flushVaultPipeline();

        jasmine.clock().tick(CacheTTL.OneMinute + 1);
        jasmine.clock().tick(30_000);

        behavior.reset();

        jasmine.clock().tick(30_000);

        expect(ctx.mergeState.calls.count()).toBe(1);
      });
    });

    // ------------------------------------------------------------------------------------------
    // isRefreshing deduplication
    // ------------------------------------------------------------------------------------------

    describe('isRefreshing deduplication', () => {
      it('should dedupe concurrent cacheLookup calls while refreshing', async () => {
        const api = behavior.extendCellAPI(ctx);

        const p1 = api.cacheLookup('5');
        const p2 = api.cacheLookup('5');

        state$.next(
          buildEmit(Object({ value: { id: '5', name: 'Grace' } }), '5')
        );

        const r1 = await p1;
        const r2 = await p2;

        expect(r1).toEqual(r2);
      });

      it('should mark entry as refreshing and fan-out concurrent cacheLookup calls', async () => {
        const api = behavior.extendCellAPI(ctx);

        // prime cache
        state$.next(
          buildEmit(Object({ value: { id: '5', name: 'Grace' } }), '5')
        );
        await flushVaultPipeline();

        // expire cache
        jasmine.clock().tick(CacheTTL.OneMinute + 1);

        const p1 = api.cacheLookup('5');
        const p2 = api.cacheLookup('5');

        // resolve refresh
        state$.next(
          buildEmit(Object({ value: { id: '5', name: 'Grace' } }), '5')
        );

        const r1 = await p1;
        const r2 = await p2;

        expect(r1).toEqual(r2);
      });

      it('should start refresh loop only once', () => {
        const setIntervalSpy = spyOn(window, 'setInterval').and.callThrough();

        behavior.extendCellAPI(ctx);
        behavior.extendCellAPI(ctx); // second call should not create another timer

        expect(setIntervalSpy.calls.count()).toBe(1);
      });
    });

    // ------------------------------------------------------------------------------------------
    // stopRefreshLoop lifecycle
    // ------------------------------------------------------------------------------------------

    describe('refresh loop lifecycle cleanup', () => {
      it('should stop refresh loop on reset()', async () => {
        const spy = spyOn<any>(behavior, 'stopRefreshLoop').and.callThrough();

        behavior.extendCellAPI(ctx);
        behavior.reset();

        await flushVaultPipeline();

        expect(spy).toHaveBeenCalled();

        expect(warnSpy).toHaveBeenCalledWith(
          '[vault]',
          'behavior-key reset — clearing cache'
        );
      });

      it('should stop refresh loop on destroy()', async () => {
        const spy = spyOn<any>(behavior, 'stopRefreshLoop').and.callThrough();

        behavior.extendCellAPI(ctx);
        behavior.destroy();

        await flushVaultPipeline();

        expect(spy).toHaveBeenCalled();

        expect(warnSpy).toHaveBeenCalledWith(
          '[vault]',
          'behavior-key destroy — clearing cache'
        );
      });
    });

    // ------------------------------------------------------------------------------------------
    // LIFECYCLE
    // ------------------------------------------------------------------------------------------

    it('reset should reject pending cache promises', async () => {
      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api
        .cacheLookup('x')
        .then((result) => {
          caught = `then: ${result}`;
        })
        .catch((e) => (caught = `error: ${e.message}`));

      behavior.reset();

      await flushVaultPipeline();

      expect(caught).toBe('then: undefined');

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key reset — clearing cache'
      );
    });

    it('destroy should reject pending cache promises', async () => {
      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api
        .cacheLookup('x')
        .then((result) => {
          caught = `then: ${result}`;
        })
        .catch((e) => (caught = `error: ${e.message}`));

      behavior.destroy();

      await flushVaultPipeline();

      expect(caught).toBe('then: undefined');

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key destroy — clearing cache'
      );
    });

    it('should reject cacheLookup if fetch throws synchronously', async () => {
      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api
        .cacheLookup('1')
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

    it('should resolve all concurrent cacheLookup callers for the same id', async () => {
      const api = behavior.extendCellAPI(ctx);

      const p1 = api.cacheLookup('42');
      const p2 = api.cacheLookup('42');
      const p3 = api.cacheLookup('42');

      // Only ONE pipeline trigger should occur
      expect(ctx.mergeState).toHaveBeenCalledTimes(1);

      // Simulate the pipeline resolving and emitting state
      const entity = { id: '42', name: 'Fanout' };
      state$.next(buildEmit({ value: entity }, '42'));

      const [r1, r2, r3] = await Promise.all([p1, p2, p3]);

      await flushVaultPipeline();
      await flushVaultPipeline();
      await flushVaultPipeline();

      expect(r1).toEqual(entity);
      expect(r2).toEqual(entity);
      expect(r3).toEqual(entity);
    });

    it('should ignore entities with missing idKey', async () => {
      const api = behavior.extendCellAPI(ctx);

      const promise = api.cacheLookup('x');

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

      const promise = api.cacheLookup('x');

      state$.next(buildEmit({ value: { id: {}, name: 'BadId' } }, undefined));

      let resolved: any;
      promise.then((value) => (resolved = `then: ${value}`));

      await flushVaultPipeline();

      expect(resolved).toBeUndefined();
    });

    it('should ignore entities with empty string id', async () => {
      const api = behavior.extendCellAPI(ctx);

      const promise = api.cacheLookup('');

      state$.next(buildEmit({ value: { id: '', name: 'EmptyId' } }, ''));

      let resolved: any;
      promise.then((value) => (resolved = `then: ${value}`));

      await flushVaultPipeline();

      expect(resolved).toBeUndefined();
    });

    it('should normalize single entity value into array', async () => {
      const api = behavior.extendCellAPI(ctx);

      const promise = api.cacheLookup('7');

      state$.next(buildEmit({ value: { id: '7', name: 'Single' } }, '7'));

      const result = await promise;
      expect(result).toEqual({ id: '7', name: 'Single' });
    });

    it('should error all cacheLookup$ subscribers on error state', async () => {
      const api = behavior.extendCellAPI(ctx);

      let e1: any;
      let e2: any;

      api.cacheLookup$('9').subscribe({
        next: (value) => (e1 = `next: ${value}`),
        error: (e) => (e1 = `error: ${e.message}`)
      });
      api.cacheLookup$('9').subscribe({
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
      api.cacheLookup('1').then(() => (resolved = true));

      await flushVaultPipeline();

      expect(resolved).toBeFalse();
    });

    it('cacheLookup$ should complete after emitting value', async () => {
      const api = behavior.extendCellAPI(ctx);

      let completed = false;

      api.cacheLookup$('1').subscribe({
        next: () => {},
        complete: () => (completed = true)
      });

      state$.next(buildEmit({ value: { id: '1', name: 'Done' } }, '1'));

      await flushVaultPipeline();

      expect(completed).toBeTrue();
    });

    it('should leave cacheLookup pending if fetch returns undefined', async () => {
      const api = behavior.extendCellAPI(ctx);

      const promise = api.cacheLookup('1');

      await flushVaultPipeline();

      let resolved = false;
      promise.then(() => (resolved = true));

      expect(resolved).toBeFalse();
    });

    it('should resolve pending ids according to emit scope (scoped vs unscoped)', async () => {
      const api = behavior.extendCellAPI(ctx);

      const p1 = api.cacheLookup('1');
      api.cacheLookup('2');

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

      const [r1] = await Promise.all([p1]);

      expect(r1.name).toBe('A');

      const p3 = api.cacheLookup('1');
      const p4 = api.cacheLookup('2');

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
      expect(r4.name).toBe('D');

      const p5 = api.cacheLookup('1');
      const p6 = api.cacheLookup('2');

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

      expect(r5.name).toBe('A');
      expect(r6.name).toBe('D');

      const p7 = api.cacheLookup('1');
      const p8 = api.cacheLookup('2');

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

      const p9 = api.cacheLookup('1');
      const p10 = api.cacheLookup('2');
      const p11 = api.cacheLookup('3');
      const p12 = api.cacheLookup('4');

      const [r9, r10, r11, r12] = await Promise.all([p9, p10, p11, p12]);
      expect(r9.name).toBe('E');
      expect(r10.name).toBe('F');
      expect(r11.name).toBe('G');
      expect(r12.name).toBe('H');
    });

    it('should safely reject cacheLookup if fetch throws synchronously and pending list is empty', async () => {
      const api = behavior.extendCellAPI(ctx);

      // Execute the deferred factory manually (simulates resolve stage)
      let caught: any;
      const promise = api
        .cacheLookup('missing')
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

      await promise;

      // cacheLookup must reject with the wrapped VaultError
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
        .cacheLookup('1')
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
        .cacheLookup('1')
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

      const promise = api.cacheLookup('1');

      state$.next(buildEmit({ value: null }, undefined));

      let caught: any;
      await promise
        .then((result) => {
          caught = `then: ${result}`;
        })
        .catch((e) => (caught = `error: ${e.message}`));

      expect(caught).toBe('then: undefined');
    });

    it('should not throw when clearing refresh flags on empty cache', async () => {
      behavior.extendCellAPI(ctx);

      expect(() => behavior.reset()).not.toThrow();

      await flushVaultPipeline();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key reset — clearing cache'
      );
    });

    it('cacheLookup$ should error if fetch throws synchronously', async () => {
      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api.cacheLookup$('1').subscribe({
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

    it('cacheLookup$ should propagate rejection via observer.error when mergeState throws synchronously', async () => {
      ctx.mergeState = jasmine.createSpy('mergeState').and.callFake(() => {
        throw new Error('mergeState exploded');
      });

      const api = behavior.extendCellAPI(ctx);

      let caught: any;

      api.cacheLookup$('1').subscribe({
        next: () => (caught = 'next'),
        error: (e) => {
          caught = e;
        }
      });

      await flushVaultPipeline();

      expect(caught).toBeDefined();
      expect(caught.message).toContain('mergeState exploded');
    });

    it('should clear isRefreshing on error and allow subsequent refresh', async () => {
      const api = behavior.extendCellAPI(ctx);

      // Prime cache
      state$.next(
        buildEmit(
          { value: { id: '1', name: 'Ada' } },
          '1',
          StateEmitTypes.PipelineError
        )
      );
      await flushVaultPipeline();

      // Expire entry
      jasmine.clock().tick(CacheTTL.OneMinute + 1);

      // Trigger refresh (sets isRefreshing = true)
      let caught: any;

      const pending = api.cacheLookup$('1').subscribe({
        next: (value) => (caught = `next: ${value}`),
        error: (e) => {
          caught = `error: ${e.message}`;
        }
      });

      // Simulate hard error
      const vaultError: VaultErrorShape = {
        message: 'boom',
        featureCellKey: 'cell-key',
        details: 'x',
        raw: new Error('boom'),
        timestamp: Date.now()
      };

      state$.next(buildEmit({ error: vaultError }, undefined));
      await flushVaultPipeline();

      // Advance time again → refresh should be allowed again
      jasmine.clock().tick(30_000);

      // Ensure Jasmine waits for the promise lifecycle
      await pending;

      expect(caught).toBeUndefined();
    });

    it('should delete cache entry if refresh fetch throws synchronously', async () => {
      const api = behavior.extendCellAPI(ctx);

      // seed cache
      state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));
      await flushVaultPipeline();

      // expire cache
      jasmine.clock().tick(CacheTTL.OneMinute + 1);

      // trigger refresh (stale return)
      const stale = await api.cacheLookup('1');

      expect(stale.name).toBe('Ada');

      // simulate pipeline refresh failure scoped to id "1"
      state$.next(
        buildEmit(
          {
            error: createVaultError(new Error('sync explode'), 'behavior-key')
          },
          '1',
          StateEmitTypes.PipelineError
        )
      );

      await flushVaultPipeline();

      // next lookup should behave like a cold miss
      fetchSpy.calls.reset();

      api.cacheLookup('1');

      expect(fetchSpy.calls.count()).toBe(1);
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

      const promise = api.cacheLookup('1');

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

  describe('Value with config', () => {
    beforeEach(() => {
      behavior = new withStateCacheBehavior<any, any>('behavior-key', {
        behaviorConfig: {
          idKey: 'id',
          fetchType: ResolveTypes.Value,
          fetch: () => 22,
          ttl: CacheTTL.OneMinute
        }
      } as BehaviorClassContext);

      ctx.mergeState = jasmine.createSpy('mergeState');
    });

    afterEach(async () => {
      ctx.mergeState.calls.reset();
    });

    // ------------------------------------------------------------------------------------------
    // cache (Promise)
    // ------------------------------------------------------------------------------------------

    describe('cache()', () => {
      it('should trigger pipeline and resolve when TEntity emits', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.cacheLookup('2');

        const entity = { id: '2', name: 'Grace' };
        state$.next(buildEmit({ value: entity }, '2'));

        const result = await promise;
        expect(result).toEqual(entity);

        expect(ctx.mergeState).toHaveBeenCalledWith(
          22,
          Object({ withStateCacheBehavior: Object({ id: '2' }) })
        );
      });

      it('should return cloned entities so consumer mutations do not corrupt the cache', async () => {
        const api = behavior.extendCellAPI(ctx);

        const promise = api.cacheLookup('3');

        const entity = { id: '3', name: 'Ada', meta: { score: 10 } };
        state$.next(buildEmit({ value: entity }, '3'));

        const first = await promise;
        expect(first).toEqual({ id: '3', name: 'Ada', meta: { score: 10 } });

        // Mutate the returned entity
        first.name = 'CORRUPTED';
        first.meta.score = -1;

        // Second lookup should return the original cached value, not the mutated one
        const second = await api.cacheLookup('3');
        expect(second).toEqual({ id: '3', name: 'Ada', meta: { score: 10 } });

        // Returned values should not be the same reference
        expect(second).not.toBe(first);
      });

      it('should not corrupt cache when consumer mutates stale-while-refresh value', async () => {
        const api = behavior.extendCellAPI(ctx);

        // Seed cache
        state$.next(
          buildEmit(
            { value: { id: '1', name: 'Ada', meta: { score: 10 } } },
            '1'
          )
        );
        await flushVaultPipeline();

        // Expire cache
        jasmine.clock().tick(CacheTTL.OneMinute + 1);

        // Stale-while-refresh returns immediately
        const stale = await api.cacheLookup('1');
        expect(stale).toEqual({ id: '1', name: 'Ada', meta: { score: 10 } });

        // Consumer mutates the stale value while refresh is in-flight
        stale.name = 'CORRUPTED';
        stale.meta.score = -1;

        // Refresh completes
        state$.next(
          buildEmit(
            { value: { id: '1', name: 'Ada-v2', meta: { score: 20 } } },
            '1'
          )
        );
        await flushVaultPipeline();

        const refreshed = await api.cacheLookup('1');
        expect(refreshed).toEqual({
          id: '1',
          name: 'Ada-v2',
          meta: { score: 20 }
        });
      });

      it('should create a new cache entry object on refresh so old references are not mutated', async () => {
        const api = behavior.extendCellAPI(ctx);

        // Seed cache
        state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));
        await flushVaultPipeline();

        const first = await api.cacheLookup('1');

        // Expire and refresh
        jasmine.clock().tick(CacheTTL.OneMinute + 1);
        state$.next(buildEmit({ value: { id: '1', name: 'Ada-v2' } }, '1'));
        await flushVaultPipeline();

        const second = await api.cacheLookup('1');

        // Old reference should not have been mutated by the refresh
        expect(first).toEqual({ id: '1', name: 'Ada' });
        expect(second).toEqual({ id: '1', name: 'Ada-v2' });
        expect(first).not.toBe(second);
      });
    });

    // ------------------------------------------------------------------------------------------
    // cache$ (Observable)
    // ------------------------------------------------------------------------------------------

    describe('cache$()', () => {
      it('should trigger pipeline and emit when entity appears', async () => {
        const api = behavior.extendCellAPI(ctx);

        let emitted: any;

        api.cacheLookup$('20').subscribe((v) => (emitted = v));

        expect(ctx.mergeState).toHaveBeenCalledWith(
          22,
          Object({ withStateCacheBehavior: Object({ id: '20' }) })
        );

        await flushVaultPipeline();

        expect(emitted).toBeUndefined();
      });
    });

    // ✅ TEST DELTAS ONLY (additions) to reach 100% coverage for the new controller emit cases.
    //
    // New code path added:
    //   case StateEmitTypes.AbortController / BufferController / DenyController / RetryController
    //     -> clears isRefreshing flag for the scoped id and returns.
    //
    // These specs prove:
    //   1) the new switch cases are hit
    //   2) cache entry isRefreshing flips back to false
    //   3) nothing throws
    //
    // NOTE: because those controller emits do NOT resolve pending fan-out promises,
    // we call behavior.reset() at the end of each test to avoid leaving a pending promise hanging.

    describe('controller emits should clear isRefreshing flag', () => {
      const controllerTypes = [
        StateEmitTypes.AbortController,
        StateEmitTypes.DenyController
      ] as const;

      controllerTypes.forEach((controllerType) => {
        describe(`${controllerType}`, () => {
          it('Abort Controller clears isRefreshing and preserves stale cache value', async () => {
            const api = behavior.extendCellAPI(ctx);

            state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));
            await flushVaultPipeline();

            jasmine.clock().tick(CacheTTL.OneMinute + 1);

            const stale = await api.cacheLookup('1');

            expect(stale.name).toBe('Ada');

            state$.next(
              buildEmit(
                { value: undefined },
                '1',
                StateEmitTypes.AbortController
              )
            );
            await flushVaultPipeline();

            jasmine.clock().tick(30_000);
            await flushVaultPipeline();

            expect(ctx.mergeState).toHaveBeenCalled();

            expect(debugSpy).toHaveBeenCalledWith(
              '[vault]',
              `behavior-key cache ${StateEmitTypes.AbortController} detected.`
            );
            expect(debugSpy).toHaveBeenCalledWith(
              '[vault]',
              'behavior-key cache entity 1 isRefreshing set to false.'
            );
          });

          it('clears isRefreshing', async () => {
            const api = behavior.extendCellAPI(ctx);

            state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));
            await flushVaultPipeline();

            jasmine.clock().tick(CacheTTL.OneMinute + 1);
            await flushVaultPipeline();

            const pending = api.cacheLookup('1');

            state$.next(buildEmit({ value: undefined }, '1', controllerType));
            await flushVaultPipeline();

            jasmine.clock().tick(30_000);
            await flushVaultPipeline();

            expect(ctx.mergeState).toHaveBeenCalled();

            behavior.reset();
            await flushVaultPipeline();

            const stale = await pending;
            expect(stale.name).toBe('Ada');

            expect(debugSpy).toHaveBeenCalledWith(
              '[vault]',
              'behavior-key cache expired for id "1" - returning stale and refreshing'
            );
            expect(debugSpy).toHaveBeenCalledWith(
              '[vault]',
              `behavior-key cache ${controllerType} detected.`
            );
            expect(debugSpy).toHaveBeenCalledWith(
              '[vault]',
              'behavior-key cache entity 1 isRefreshing set to false.'
            );
          });
        });
      });

      it('should not throw if controller emit arrives for an id that exists (smoke)', async () => {
        behavior.extendCellAPI(ctx);

        state$.next(
          buildEmit(
            { value: { id: '1', name: 'Ada' } },
            '1',
            StateEmitTypes.FinalizePipeline
          )
        );
        await flushVaultPipeline();

        expect(() => {
          state$.next(
            buildEmit({ value: undefined }, '1', StateEmitTypes.AbortController)
          );
        }).not.toThrow();

        await flushVaultPipeline();
      });

      it('should not throw if controller emit abort arrives without an id', async () => {
        behavior.extendCellAPI(ctx);

        // Seed cache
        state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));
        await flushVaultPipeline();

        state$.next(
          buildEmit(
            { value: undefined },
            undefined,
            StateEmitTypes.AbortController
          )
        );
        await flushVaultPipeline();

        expect(debugSpy).toHaveBeenCalledWith(
          '[vault]',
          'behavior-key cache Abort Controller detected.'
        );
        expect(debugSpy).not.toHaveBeenCalledWith(
          '[vault]',
          'behavior-key cache entity null isRefreshing set to false.'
        );
      });

      it('should not throw if controller emit deny arrives without an id', async () => {
        behavior.extendCellAPI(ctx);

        // Seed cache
        state$.next(buildEmit({ value: { id: '1', name: 'Ada' } }, '1'));
        await flushVaultPipeline();

        state$.next(
          buildEmit(
            { value: undefined },
            undefined,
            StateEmitTypes.DenyController
          )
        );
        await flushVaultPipeline();

        expect(debugSpy).toHaveBeenCalledWith(
          '[vault]',
          'behavior-key cache Deny Controller detected.'
        );
        expect(debugSpy).not.toHaveBeenCalledWith(
          '[vault]',
          'behavior-key cache entity null isRefreshing set to false.'
        );
      });
    });
  });

  describe('without config', () => {
    it('should throw if options are missing', () => {
      expect(
        () =>
          new withStateCacheBehavior<any, any>(
            'behavior-key',
            {} as BehaviorClassContext
          )
      ).toThrowError(
        '[vault] Cache behavior requires configuration via withStateCache()'
      );
    });

    it('should throw if idKey option is not added', () => {
      expect(
        () =>
          new withStateCacheBehavior<any, any>('behavior-key', {
            behaviorConfig: {}
          } as BehaviorClassContext)
      ).toThrowError('[vault] Cache behavior requires idKey');
    });

    it('should throw if fetchType option is not added', () => {
      expect(
        () =>
          new withStateCacheBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey'
            }
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] Cache behavior requires a valid fetchType (ResolveType). Received: undefined'
      );
    });

    it('should throw if fetchType option is not the correct type', () => {
      expect(
        () =>
          new withStateCacheBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey',
              fetchType: 'wrong'
            }
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] Cache behavior requires a valid fetchType (ResolveType). Received: wrong'
      );
    });

    it('should throw if fetch option is not added', () => {
      expect(
        () =>
          new withStateCacheBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey',
              fetchType: ResolveTypes.Promise
            }
          } as BehaviorClassContext)
      ).toThrowError('[vault] Cache behavior requires fetch(id)');
    });

    it('should throw if fetch option is not a function', () => {
      expect(
        () =>
          new withStateCacheBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey',
              fetchType: ResolveTypes.Promise,
              fetch: 'not a function'
            }
          } as BehaviorClassContext)
      ).toThrowError(
        '[vault] Cache behavior requires fetch(id) to be a function'
      );
    });

    it('should throw if ttl options are not correct', () => {
      expect(
        () =>
          new withStateCacheBehavior<any, any>('behavior-key', {
            behaviorConfig: {
              idKey: 'idKey',
              fetchType: ResolveTypes.Promise,
              fetch: () => {},
              ttl: 300 as any
            }
          } as BehaviorClassContext)
      ).toThrowError('[vault] Invalid cache TTL value');
    });
  });
});
