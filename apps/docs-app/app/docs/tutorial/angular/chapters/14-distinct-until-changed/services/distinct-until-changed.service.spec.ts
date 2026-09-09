import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DistinctUntilChangedService } from './distinct-until-changed.service';

describe('Service: Distinct Until Changed', () => {
  it('returns the distinct until changed chapter metadata', () => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), DistinctUntilChangedService]
    });
    expect(TestBed.inject(DistinctUntilChangedService).chapters()).toEqual({
      id: 14,
      label: 'Distinct Until Changed',
      route: 'chapter-14',
      metadata: {
        track: 'Lab',
        prerequisite: 'Chapter 7',
        tier: '★★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Distinct Until Changed' },
        { id: 2, label: 'Component and HTML' },
        { id: 3, label: 'Chapter Round-up' },
        { id: 4, label: 'Stackblitz & Downloadable Archive' }
      ]
    });
  });
});
