import {
  BehaviorClassContext,
  BehaviorTypes,
  StateEmitTypes
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { Subject } from 'rxjs';
import { withQueryBehavior } from './with-query.behavior';

describe('Behavior: withQueryBehavior', () => {
  let behavior: withQueryBehavior<any, any>;
  let state$: Subject<any>;
  let ctx: any;
  let warnSpy: jasmine.Spy;
  let debugSpy: jasmine.Spy;

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
    debugSpy = spyOn(console, 'debug');
  });

  beforeEach(() => {
    warnSpy.calls.reset();
    debugSpy.calls.reset();

    state$ = new Subject();

    ctx = {
      featureCellKey: 'cell-key',
      state$,
      reset$: new Subject<void>(),
      destroyed$: new Subject<void>()
    };

    behavior = new withQueryBehavior<any, any>('behavior-key', {
      behaviorConfig: {
        idKey: 'id'
      }
    } as BehaviorClassContext);
  });

  // ----------------------------------------------------------------
  // METADATA
  // ----------------------------------------------------------------

  it('should expose correct instance metadata', () => {
    expect(behavior.type).toBe(BehaviorTypes.Extension);
    expect(behavior.critical).toBeFalse();
    expect(behavior.key).toBe('behavior-key');
  });

  it('should expose correct static metadata', () => {
    expect(withQueryBehavior.type).toBe(BehaviorTypes.Extension);
    expect(withQueryBehavior.critical).toBeFalse();
    expect(withQueryBehavior.key).toBe('SDUX::Behavior::Core::Query');
    expect(withQueryBehavior.wantsConfig).toBeTrue();
    expect(withQueryBehavior.configKey).toBe('withQuery');
  });

  // ----------------------------------------------------------------
  // QUERY
  // ----------------------------------------------------------------

  describe('query()', () => {
    it('should return undefined when cache is empty', () => {
      const api = behavior.extendCellAPI(ctx);

      expect(api.query('1')).toBeUndefined();
    });

    it('should index entity from finalize pipeline', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('1')).toEqual({ id: '1', name: 'Ada' });
    });

    it('should return cloned entities so consumer mutations do not corrupt the cache', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada', meta: { score: 10 } } },
        type: StateEmitTypes.FinalizePipeline
      });

      const first = api.query('1');
      expect(first).toEqual({ id: '1', name: 'Ada', meta: { score: 10 } });

      first.name = 'CORRUPTED';
      first.meta.score = -1;

      const second = api.query('1');
      expect(second).toEqual({ id: '1', name: 'Ada', meta: { score: 10 } });
      expect(second).not.toBe(first);
    });

    it('should index multiple entities from array', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: {
          value: [
            { id: '1', name: 'Ada' },
            { id: '2', name: 'Grace' }
          ]
        },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('1').name).toBe('Ada');
      expect(api.query('2').name).toBe('Grace');
    });

    it('should overwrite existing entity when re-emitted', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada' } },
        type: StateEmitTypes.FinalizePipeline
      });

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada Lovelace' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('1').name).toBe('Ada Lovelace');
    });

    it('should ignore entities without idKey', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { name: 'NoId' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('missing')).toBeUndefined();
    });

    it('should ignore invalid id types', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: {}, name: 'BadId' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('x')).toBeUndefined();
    });

    it('should normalize single entity into array internally', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '7', name: 'Single' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('7').name).toBe('Single');
    });

    it('should ignore null values', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: null },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('1')).toBeUndefined();
    });

    it('should ignore entity with empty string id', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '', name: 'EmptyId' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('')).toBeUndefined();
    });

    it('should ignore unknown state emit types', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada' } },
        type: 'UnknownType'
      });

      expect(api.query('1')).toBeUndefined();
    });
  });

  // ----------------------------------------------------------------
  // NON-ARRAY SNAPSHOT VALUES
  // ----------------------------------------------------------------

  describe('non-array snapshot values', () => {
    it('should safely ignore number snapshot values', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: 123 },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('123')).toBeUndefined();
    });

    it('should safely ignore boolean snapshot values', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: true },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('true')).toBeUndefined();
    });

    it('should safely ignore string snapshot values', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: 'hello' },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('hello')).toBeUndefined();
    });

    it('should process object snapshot values when idKey exists', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '99', name: 'ObjectEntity' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('99')).toEqual({ id: '99', name: 'ObjectEntity' });
    });

    it('should ignore object snapshot values without idKey', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { name: 'NoIdObject' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('missing')).toBeUndefined();
    });
  });

  // ----------------------------------------------------------------
  // CACHE RESET BEHAVIOR
  // ----------------------------------------------------------------

  describe('cache lifecycle', () => {
    it('should clear cache on PipelineReset', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('1')).toBeDefined();

      state$.next({
        snapshot: { value: null },
        type: StateEmitTypes.PipelineReset
      });

      expect(api.query('1')).toBeUndefined();
    });

    it('should clear cache when IncomingPipeline value is null', () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('1')).toBeDefined();

      state$.next({
        snapshot: { value: null },
        type: StateEmitTypes.IncomingPipeline
      });

      expect(api.query('1')).toBeUndefined();
    });
  });

  // ----------------------------------------------------------------
  // LIFECYCLE
  // ----------------------------------------------------------------

  describe('lifecycle', () => {
    it('reset should clear cache', async () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('1')).toBeDefined();

      behavior.reset();

      await flushVaultPipeline();

      expect(api.query('1')).toBeUndefined();
      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key reset — clearing query cache'
      );
    });

    it('destroy should clear cache and unsubscribe', async () => {
      const api = behavior.extendCellAPI(ctx);

      state$.next({
        snapshot: { value: { id: '1', name: 'Ada' } },
        type: StateEmitTypes.FinalizePipeline
      });

      behavior.destroy();

      await flushVaultPipeline();

      state$.next({
        snapshot: { value: { id: '1', name: 'New Value' } },
        type: StateEmitTypes.FinalizePipeline
      });

      expect(api.query('1')).toBeUndefined();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior-key destroy — clearing query cache'
      );
    });
  });

  // ----------------------------------------------------------------
  // FLUENT API
  // ----------------------------------------------------------------

  describe('fluent api: installFluentApi()', () => {
    let cell: any;
    let behaviorConfigs: Map<any, unknown>;

    beforeEach(() => {
      behaviorConfigs = new Map();

      cell = {
        key: 'cell-key'
      };

      withQueryBehavior.installFluentApi(cell, behaviorConfigs);
    });

    it('should install withQuery on the cell', () => {
      expect(typeof cell.withQuery).toBe('function');
    });

    it('should store options in behaviorConfigs', () => {
      const options = { idKey: 'id' };

      cell.withQuery(options);

      expect(behaviorConfigs.has('withQuery')).toBeTrue();
      expect(behaviorConfigs.get('withQuery')).toBe(options);
    });

    it('should return the cell for fluent chaining', () => {
      const options = { idKey: 'id' };

      const result = cell.withQuery(options);

      expect(result).toBe(cell);
    });
  });

  // ----------------------------------------------------------------
  // CONFIG VALIDATION
  // ----------------------------------------------------------------

  describe('without config', () => {
    it('should throw if options are missing', () => {
      expect(
        () =>
          new withQueryBehavior<any, any>(
            'behavior-key',
            {} as BehaviorClassContext
          )
      ).toThrowError(
        '[vault] Query behavior requires configuration via withQuery()'
      );
    });

    it('should throw if idKey is missing', () => {
      expect(
        () =>
          new withQueryBehavior<any, any>('behavior-key', {
            behaviorConfig: {}
          } as BehaviorClassContext)
      ).toThrowError('[vault] Query behavior requires idKey');
    });
  });
});
