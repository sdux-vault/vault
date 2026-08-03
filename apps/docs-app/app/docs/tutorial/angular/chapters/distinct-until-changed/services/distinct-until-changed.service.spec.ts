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
      id: 13,
      label: 'Distinct Until Changed Chapter',
      fragment: 'chapter-13',
      steps: [
        { id: 1, label: 'Configure Distinct Until Changed' },
        { id: 2, label: 'Submit Same and Changed State' },
        { id: 3, label: 'Complete Distinct Until Changed Tutorial' }
      ]
    });
  });
});
