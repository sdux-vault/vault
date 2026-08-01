import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DelayService } from './delay.service';

describe('Service: Filters and Reducers', () => {
  let service: DelayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), DelayService]
    });

    service = TestBed.inject(DelayService);
  });

  it('returns the chapter metadata for the filters-and-reducers tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 6,
      label: 'Filters/Reducers Chapter',
      fragment: 'chapter-6',
      steps: [
        { id: 1, label: 'Add Filter Stage' },
        { id: 2, label: 'Add Reducer Styles' },
        { id: 3, label: 'Complete Filter/Reducer Tutorial' }
      ]
    });
  });
});
