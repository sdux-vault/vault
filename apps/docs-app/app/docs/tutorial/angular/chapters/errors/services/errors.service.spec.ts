import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { ErrorsService } from './errors.service';

describe('Service: Errors', () => {
  let service: ErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), ErrorsService]
    });

    service = TestBed.inject(ErrorsService);
  });

  it('returns the chapter metadata for the errors tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 7,
      label: 'Errors Chapter',
      fragment: 'chapter-7',
      steps: [
        { id: 1, label: 'Simulate Pipeline Errors' },
        { id: 2, label: 'Display Global Error State' },
        { id: 3, label: 'Complete Errors Tutorial' }
      ]
    });
  });
});
