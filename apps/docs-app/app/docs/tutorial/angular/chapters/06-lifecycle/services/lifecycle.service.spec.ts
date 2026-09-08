import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { LifecycleService } from './lifecycle.service';

describe('Service: LifeCycle', () => {
  let service: LifecycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), LifecycleService]
    });

    service = TestBed.inject(LifecycleService);
  });

  it('returns the chapter metadata for the lifecycle tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 6,
      label: 'Lifecycle',
      route: 'chapter-6',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 5',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Persist Null and Reset State' },
        { id: 2, label: 'Finalize with destroy()' },
        Object({ id: 3, label: 'Chapter Round-up' }),
        Object({ id: 4, label: 'Stackblitz & Downloadable Archive' })
      ]
    });
  });
});
