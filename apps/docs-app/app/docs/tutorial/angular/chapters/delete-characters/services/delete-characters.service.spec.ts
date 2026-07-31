import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DeleteCharactersService } from './delete-characters.service';

describe('Service: DeleteCharactersService', () => {
  let service: DeleteCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), DeleteCharactersService]
    });

    service = TestBed.inject(DeleteCharactersService);
  });

  it('returns the chapter metadata for the delete-characters tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 4,
      label: 'Delete Chapter',
      fragment: 'chapter-4',
      steps: [
        { id: 1, label: 'Add Delete Capabilities' },
        { id: 2, label: 'Complete Delete Tutorial' }
      ]
    });
  });
});
