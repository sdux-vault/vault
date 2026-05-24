import { httpResource, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import {
  DestroyRef,
  Injector,
  provideZonelessChangeDetection,
  runInInjectionContext,
  signal
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorContext, setVaultLogLevel } from '@sdux-vault/shared';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { withHttpResourceBehavior } from './with-http-resource.behavior';

interface TestModel {
  id: number;
  name: string;
}

describe('Behavior: HttpResource', () => {
  let mockBackend: HttpTestingController;
  let behavior: any;
  let injector: Injector;
  let destroyRef: DestroyRef;
  let ctx: any;
  let warnSpy: any;

  beforeAll(() => {
    warnSpy = spyOn(console, 'warn');
  });

  beforeEach(() => {
    warnSpy.calls.reset();

    setVaultLogLevel('warn');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection()
      ]
    });

    mockBackend = TestBed.inject(HttpTestingController);
    injector = TestBed.inject(Injector);
    destroyRef = TestBed.inject(DestroyRef);

    ctx = {
      featureCellKey: 'cell-key',
      isLoading: signal(false),
      error: signal(null),
      value: signal(undefined),
      incoming: null
    };

    runInInjectionContext(injector, () => {
      behavior = new withHttpResourceBehavior('behavior key', {
        injector
      } as any);
    });
  });

  afterEach(() => {
    mockBackend.verify();
  });

  it('should have default properties', () => {
    expect(behavior.critical).toBeTrue();
    expect(behavior.type).toBe('resolve');
    expect(behavior.key).toBe('behavior key');
  });

  it('should construct via factory and expose correct metadata', () => {
    expect(withHttpResourceBehavior.type).toBe('resolve');
    expect(withHttpResourceBehavior.key).toBe(
      'SDUX::Behavior::Resolve::HttpResource'
    );
    expect(withHttpResourceBehavior.critical).toBeTrue();
    expect(withHttpResourceBehavior.resolveType).toBe('http-resource');

    expect((withHttpResourceBehavior as any).needsLicense).toBeFalse();
    expect((withHttpResourceBehavior as any).wantsConfig).toBeFalse();
    expect((withHttpResourceBehavior as any).configKey).toBeUndefined();
    expect(
      (typeof withHttpResourceBehavior as any).installFluentApi
    ).toBeUndefined();
  });

  it('should resolve a successful HttpResourceRef value', async () => {
    const id = signal(0);
    ctx.incoming = httpResource<TestModel[]>(() => `/api/users/${id()}`, {
      injector
    });

    let promise: any;
    await runInInjectionContext(injector, async () => {
      promise = behavior.computeResolve(ctx);
    });
    TestBed.tick();

    // Simulate backend response
    mockBackend.expectOne(`/api/users/0`).flush([{ id: 1, name: 'Ada' }]);

    let result = await promise;

    expect(result).toEqual([{ id: 1, name: 'Ada' }]);
    expect(ctx.isLoading?.()).toBeFalse();
    expect(ctx.error?.()).toBeNull();
    expect(ctx.value?.()).toBeUndefined();

    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  it('should reject with a ResourceError when HttpResourceRef fails', async () => {
    ctx.incoming = httpResource<TestModel[]>(() => `/api/fail`, { injector });

    let promise: any;
    await runInInjectionContext(injector, async () => {
      promise = behavior.computeResolve(ctx);
    });
    TestBed.tick();

    // Simulate backend error
    mockBackend
      .expectOne('/api/fail')
      .flush('boom', { status: 500, statusText: 'Server Error' });

    flushVaultPipeline();

    await promise
      .then(() => {
        expect('this is an error').toBe('fix me');
      })
      .catch((error: any) => {
        expect(error).toEqual(
          Object({
            message:
              'Resource is currently in an error state (see Error.cause for details): Http failure response for /api/fail: 500 Server Error',
            details: jasmine.any(String),
            featureCellKey: 'cell-key',
            raw: jasmine.any(Error),
            timestamp: jasmine.any(Number)
          })
        );
      });

    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  it('should skip when ctx.incoming is not an HttpResourceRef', async () => {
    const ctx = { incoming: { fake: true } } as unknown as BehaviorContext<
      TestModel[]
    >;
    let result: any;
    await runInInjectionContext(injector, async () => {
      result = await behavior.computeResolve(ctx);
    });
    TestBed.tick();
    expect(result).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  it('should handle multiple concurrent HttpResourceRefs independently', async () => {
    const ctx1 = {
      incoming: httpResource<TestModel[]>(() => `/api/u1`, { injector }),
      isLoading: signal(false),
      error: signal(null)
    } as unknown as BehaviorContext<TestModel[]>;

    const ctx2 = {
      incoming: httpResource<TestModel[]>(() => `/api/u2`, { injector }),
      isLoading: signal(false),
      error: signal(null)
    } as unknown as BehaviorContext<TestModel[]>;

    let p1: any;
    let p2: any;
    await runInInjectionContext(injector, async () => {
      p1 = behavior.computeResolve(ctx1);
      p2 = behavior.computeResolve(ctx2);
    });
    TestBed.tick();

    mockBackend.expectOne('/api/u1').flush([{ id: 1, name: 'Ada' }]);
    mockBackend.expectOne('/api/u2').flush([{ id: 2, name: 'Grace' }]);

    const [r1, r2] = await Promise.all([p1, p2]);

    expect(r1).toEqual([{ id: 1, name: 'Ada' }]);
    expect(r2).toEqual([{ id: 2, name: 'Grace' }]);

    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  describe('destroy', () => {
    it('should cleanup effect when DestroyRef is triggered', async () => {
      ctx.incoming = httpResource<TestModel[]>(() => `/api/users`, {
        injector
      });

      let promise: any;
      await runInInjectionContext(injector, async () => {
        promise = behavior.computeResolve(ctx);
      });
      TestBed.tick();

      // Flush value
      mockBackend.expectOne('/api/users').flush([{ id: 99, name: 'Deleted' }]);

      const result = await promise;
      expect(result).toEqual([{ id: 99, name: 'Deleted' }]);

      // Trigger destroy cleanup manually (no error expected)
      destroyRef.onDestroy(() => {});
      expect(warnSpy).toHaveBeenCalledTimes(0);
    });

    it('should not throw when destroyed is called first cleanup effect when DestroyRef is triggered', async () => {
      ctx.incoming = httpResource<TestModel[]>(() => `/api/users`, {
        injector
      });

      let promise: any;
      await runInInjectionContext(injector, async () => {
        promise = behavior.computeResolve(ctx);
      });
      TestBed.tick();

      // Flush value
      mockBackend.expectOne('/api/users').flush([{ id: 99, name: 'Deleted' }]);

      const result = await promise;
      expect(result).toEqual([{ id: 99, name: 'Deleted' }]);

      await runInInjectionContext(injector, async () => {
        behavior.destroy();
      });

      await flushVaultPipeline();

      // Trigger destroy cleanup manually (no error expected)
      destroyRef.onDestroy(() => {});

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - destroy called'
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it('should not throw when destroyed is called first cleanup effect when DestroyRef is triggered', async () => {
      ctx.incoming = httpResource<TestModel[]>(() => `/api/users`, {
        injector
      });

      let promise: any;
      await runInInjectionContext(injector, async () => {
        promise = behavior.computeResolve(ctx);
      });
      TestBed.tick();

      // Flush value
      mockBackend.expectOne('/api/users').flush([{ id: 99, name: 'Deleted' }]);

      const result = await promise;
      expect(result).toEqual([{ id: 99, name: 'Deleted' }]);

      // Trigger destroy cleanup manually (no error expected)
      destroyRef.onDestroy(() => {});

      behavior.destroy();
      await flushVaultPipeline();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - destroy called'
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it('should valid destroy is noop', async () => {
      behavior.destroy();
      await flushVaultPipeline();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - destroy called'
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('reset', () => {
    it('should not throw when reset is called first cleanup effect when DestroyRef is triggered', async () => {
      ctx.incoming = httpResource<TestModel[]>(() => `/api/users`, {
        injector
      });

      let promise: any;
      await runInInjectionContext(injector, async () => {
        promise = behavior.computeResolve(ctx);
      });
      TestBed.tick();

      // Flush value
      mockBackend.expectOne('/api/users').flush([{ id: 99, name: 'Deleted' }]);

      const result = await promise;
      expect(result).toEqual([{ id: 99, name: 'Deleted' }]);

      behavior.reset();
      await flushVaultPipeline();

      // Trigger destroy cleanup manually (no error expected)
      destroyRef.onDestroy(() => {});
      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - reset called'
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it('should not throw when reset is called after cleanup effect when DestroyRef is triggered', async () => {
      ctx.incoming = httpResource<TestModel[]>(() => `/api/users`, {
        injector
      });

      let promise: any;
      await runInInjectionContext(injector, async () => {
        promise = behavior.computeResolve(ctx);
      });
      TestBed.tick();

      // Flush value
      mockBackend.expectOne('/api/users').flush([{ id: 99, name: 'Deleted' }]);

      const result = await promise;
      expect(result).toEqual([{ id: 99, name: 'Deleted' }]);

      // Trigger destroy cleanup manually (no error expected)
      destroyRef.onDestroy(() => {});

      behavior.reset();
      await flushVaultPipeline();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - reset called'
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it('should valid reset is called', async () => {
      behavior.reset();
      await flushVaultPipeline();

      expect(warnSpy).toHaveBeenCalledWith(
        '[vault]',
        'behavior key - reset called'
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });
});
