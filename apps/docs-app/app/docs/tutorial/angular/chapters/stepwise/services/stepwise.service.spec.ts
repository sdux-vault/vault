import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { StepwiseService } from './stepwise.service';

describe('Service: Stepwise Pipeline', () => {
  let service: StepwiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), StepwiseService]
    });

    service = TestBed.inject(StepwiseService);
  });

  it('returns the chapter metadata for the stepwise tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 14,
      label: 'Stepwise',
      route: 'chapter-14',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 6',
        tier: '★★★★',
        estimatedTime: '30-45 min'
      },
      steps: [
        { id: 1, label: 'Configure Stepwise Pipeline' },
        { id: 2, label: 'Configure Stepwise Resolve' },
        { id: 3, label: 'Configure Stepwise Filter' },
        { id: 4, label: 'Configure Stepwise Reducer' },
        { id: 5, label: 'Complete Stepwise Tutorial' }
      ]
    });
  });
});
