import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { FiltersAndReducersService } from './filters-and-reducers.service';

describe('Service: Filters and Reducers', () => {
  let service: FiltersAndReducersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), FiltersAndReducersService]
    });

    service = TestBed.inject(FiltersAndReducersService);
  });

  it('returns the chapter metadata for the filters-and-reducers tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 7,
      label: 'Filters and Reducers',
      route: 'chapter-7',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 6',
        tier: '★★',
        estimatedTime: '20–30 min'
      },
      steps: [
        Object({ id: 1, label: 'Add Ordered Filters' }),
        Object({ id: 2, label: 'Add Ordered Reducers' }),
        Object({ id: 3, label: 'Component Update' }),
        Object({ id: 4, label: 'Chapter Round-up' }),
        Object({ id: 5, label: 'Stackblitz & Downloadable Archive' })
      ]
    });
  });
});
