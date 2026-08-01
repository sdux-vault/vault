import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AsyncInputService } from './async-input.service';

describe('Service: Async Input', () => {
  let service: AsyncInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), AsyncInputService]
    });

    service = TestBed.inject(AsyncInputService);
  });

  it('returns the chapter metadata for the async input tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 8,
      label: 'Async Input Chapter',
      fragment: 'chapter-8',
      steps: [
        { id: 1, label: 'Hydrate Initial State' },
        { id: 2, label: 'Resolve a Promise' },
        { id: 3, label: 'Resolve an Observable' },
        { id: 4, label: 'Resolve an HTTP Resource' },
        { id: 5, label: 'Complete Async Input Tutorial' }
      ]
    });
  });
});
