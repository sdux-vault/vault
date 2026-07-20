import {
  BehaviorContext,
  BehaviorTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { of, Subject, throwError } from 'rxjs';
import { withCoreFromObservableBehavior } from './with-core-from-observable.behavior';

interface TestModel {
  id: number;
  name: string;
}

import { Observable } from 'rxjs';

function fetchJson<T>(url: string): Observable<T> {
  return new Observable<T>((observer) => {
    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text();
          throw {
            status: res.status,
            statusText: res.statusText,
            body
          };
        }
        return res.json();
      })
      .then((data) => {
        observer.next(data);
        observer.complete();
      })
      .catch((err) => observer.error(err));
  });
}

describe('Behavior: withCoreFromObservableBehavior (fetch)', () => {
  let behavior: any;
  let ctx: BehaviorContext<any>;
  let warnSpy: any;

  beforeEach(() => {
    warnSpy = spyOn(console, 'warn');

    ctx = {
      featureCellKey: 'cell-key',
      destroyed$: new Subject<void>(),
      reset$: new Subject<void>()
    } as any;

    setVaultLogLevel('warn');

    behavior = new withCoreFromObservableBehavior('behavior key', {} as any);
  });

  afterEach(() => {
    (globalThis.fetch as any)?.calls?.reset?.();
    setVaultLogLevel('off');
  });

  it('should have default properties', () => {
    expect(behavior.critical).toBeFalse();
    expect(behavior.type).toBe(BehaviorTypes.FromObservable);
    expect(behavior.key).toBe('behavior key');
  });

  it('should have correct static metadata', () => {
    expect(withCoreFromObservableBehavior.critical).toBeFalse();
    expect(withCoreFromObservableBehavior.type).toBe(
      BehaviorTypes.FromObservable
    );
    expect(withCoreFromObservableBehavior.key).toBe(
      'SDUX::Behavior::Core::FromObservable'
    );
  });

  it('should expose fromObservable', () => {
    const api = behavior.extendCellAPI(ctx);
    expect(typeof api.fromObservable).toBe('function');
  });

  it('should emit signals for a successful observable', async () => {
    const api = behavior.extendCellAPI(ctx);
    const source$ = of([{ id: 1, name: 'Ada' }]);

    const result: any[] = [];

    api.fromObservable(source$).subscribe((v: any) => result.push(v));

    await flushVaultPipeline();

    expect(result).toEqual([
      Object({
        loading: false,
        value: [Object({ id: 1, name: 'Ada' })],
        error: null
      })
    ]);
  });

  it('should handle observable errors gracefully', async () => {
    ctx.destroyed$ = undefined;
    ctx.reset$ = undefined;
    const api = behavior.extendCellAPI(ctx);
    const source$ = throwError(() => new Error('Boom!'));

    let errValue: any;

    api.fromObservable(source$).subscribe({
      error: (err: any) => (errValue = err)
    });

    await flushVaultPipeline();

    expect(errValue).toEqual({
      message: 'Boom!',
      featureCellKey: 'cell-key',
      details: jasmine.any(String),
      raw: jasmine.any(Error),
      timestamp: jasmine.any(Number)
    });
  });

  it('should emit state from a fetch observable', async () => {
    spyOn(globalThis, 'fetch').and.resolveTo(
      new Response(JSON.stringify([{ id: 99, name: 'Alan' }]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    const api = behavior.extendCellAPI(ctx);
    const source$ = fetchJson<TestModel[]>('/api/data');

    const result: any[] = [];

    await new Promise<void>((resolve) => {
      api.fromObservable(source$).subscribe((v: any) => {
        result.push(v);
        resolve();
      });
    });

    await flushVaultPipeline();

    expect(result).toEqual([
      Object({
        loading: false,
        value: [Object({ id: 99, name: 'Alan' })],
        error: null
      })
    ]);
  });

  it('should capture fetch errors reactively', async () => {
    spyOn(globalThis, 'fetch').and.resolveTo(
      new Response('Internal Error', {
        status: 500,
        statusText: 'Server Error'
      })
    );

    const api = behavior.extendCellAPI(ctx);
    const source$ = fetchJson('/api/error');

    let errValue: any;

    await new Promise<void>((resolve) => {
      api.fromObservable(source$).subscribe({
        error: (err: any) => {
          errValue = err;
          resolve();
        }
      });
    });

    expect(errValue).toEqual({
      message: 'Unexpected error',
      featureCellKey: 'cell-key',
      details: jasmine.any(Object),
      raw: jasmine.any(Object),
      timestamp: jasmine.any(Number)
    });
  });

  it('destroy is noop', async () => {
    behavior.destroy();
    await flushVaultPipeline();
    expect(warnSpy).toHaveBeenCalled();
  });

  it('reset is noop', async () => {
    behavior.reset();
    await flushVaultPipeline();
    expect(warnSpy).toHaveBeenCalled();
  });
});
