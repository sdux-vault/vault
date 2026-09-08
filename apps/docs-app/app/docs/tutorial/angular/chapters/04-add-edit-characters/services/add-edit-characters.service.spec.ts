import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { AddEditCharactersService } from './add-edit-characters.service';

describe('Service: AddEditCharactersService', () => {
  let service: AddEditCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), AddEditCharactersService]
    });

    service = TestBed.inject(AddEditCharactersService);
  });

  it('returns the chapter metadata for the add-edit-characters tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 4,
      label: 'Add/Edit Characters',
      route: 'chapter-4',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 3',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Array Append Merge Behavior' },
        { id: 2, label: 'Add/Edit Service' },
        { id: 3, label: 'Add/Edit Component' },
        Object({ id: 4, label: 'Chapter Round-up' }),
        Object({ id: 5, label: 'Stackblitz & Downloadable Archive' })
      ]
    });
  });
});
