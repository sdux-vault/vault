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
      id: 5,
      label: 'Lifecycle Chapter',
      fragment: 'chapter-5',
      steps: [
        { id: 1, label: 'Persist Null and Reset State' },
        { id: 2, label: 'Finalize with destroy()' }
      ]
    });
  });
});
