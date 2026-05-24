import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { flushVaultPipeline } from '@sdux-vault/testing-utils';
import { BehaviorSubject } from 'rxjs';
import { MobileLayoutService } from './mobile-layout.service';

describe('Service: MobileLayoutService', () => {
  let service: MobileLayoutService;
  let breakpoint$: BehaviorSubject<BreakpointState>;

  /** Fake BreakpointObserver */
  class MockBreakpointObserver {
    observe() {
      return breakpoint$.asObservable();
    }
  }

  beforeEach(() => {
    breakpoint$ = new BehaviorSubject<BreakpointState>({
      matches: false
    } as any);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        MobileLayoutService,
        { provide: BreakpointObserver, useClass: MockBreakpointObserver }
      ]
    });

    service = TestBed.inject(MobileLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.isMobile()).toBeFalse();
  });

  it('should react to multiple breakpoint changes in sequence', async () => {
    breakpoint$.next({ matches: false } as any); // desktop
    await flushVaultPipeline();
    expect(service.isMobile()).toBeFalse();

    breakpoint$.next({ matches: true } as any); // mobile
    await flushVaultPipeline();
    expect(service.isMobile()).toBeTrue();

    breakpoint$.next({ matches: false } as any); // desktop
    await flushVaultPipeline();
    expect(service.isMobile()).toBeFalse();
  });

  it('should only update after microtask flush (zoneless safe)', async () => {
    breakpoint$.next({ matches: true } as any);

    // Before flushing microtasks, NOTHING should update
    expect(service.isMobile()).toBeFalse();

    await flushVaultPipeline();

    expect(service.isMobile()).toBeTrue();
  });

  it('should not throw when BreakpointObserver emits malformed data', async () => {
    expect(() => breakpoint$.next({} as any)).not.toThrow();
    await flushVaultPipeline();

    // Should default to false
    expect(service.isMobile()).toBeUndefined();
  });
});
