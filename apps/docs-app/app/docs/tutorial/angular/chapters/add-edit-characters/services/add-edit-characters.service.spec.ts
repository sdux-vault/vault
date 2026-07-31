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
      id: 3,
      label: 'Add/Edit Chapter',
      fragment: 'chapter-3',
      steps: [
        { id: 1, label: 'Configure Merge Behavior' },
        { id: 2, label: 'Add/Edit Capabilities' },
        { id: 3, label: 'Complete Add/Edit Tutorial' }
      ]
    });
  });
});
