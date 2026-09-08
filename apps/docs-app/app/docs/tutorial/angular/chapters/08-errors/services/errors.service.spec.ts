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
      id: 8,
      label: 'Errors',
      route: 'chapter-8',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 7',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Simulate Pipeline Errors' },
        { id: 2, label: 'Display Global Error State' },
        { id: 3, label: 'Chapter Round-up' },
        { id: 4, label: 'Stackblitz & Downloadable Archive' }
      ]
    });
  });
});
