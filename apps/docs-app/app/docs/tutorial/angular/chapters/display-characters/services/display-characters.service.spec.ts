import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DisplayCharactersService } from './display-characters.service';

describe('Service: DisplayCharactersService', () => {
  let service: DisplayCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), DisplayCharactersService]
    });

    service = TestBed.inject(DisplayCharactersService);
  });

  it('returns the chapter metadata for the display-characters tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 2,
      label: 'Multi-select Chapter',
      fragment: 'chapter-2',
      steps: [
        { id: 1, label: 'Add a Dropdown' },
        { id: 2, label: 'Complete Dropdown Tutorial' }
      ]
    });
  });
});
