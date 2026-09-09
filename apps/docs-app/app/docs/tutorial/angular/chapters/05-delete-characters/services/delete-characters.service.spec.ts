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
      id: 5,
      label: 'Delete Characters',
      route: 'chapter-5',
      metadata: {
        track: 'Core',
        prerequisite: 'Chapter 4',
        tier: '★',
        estimatedTime: '20–30 min'
      },
      steps: [
        { id: 1, label: 'Configure Array By Id Merge Behavior' },
        { id: 2, label: 'Delete Service' },
        Object({ id: 3, label: 'Delete Component' }),
        Object({ id: 4, label: 'Chapter Round-up' }),
        Object({ id: 5, label: 'Stackblitz & Downloadable Archive' })
      ]
    });
  });
});
