import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { DisplayCharacterService } from './display-character.service';

describe('Service: DisplayCharacterService', () => {
  let service: DisplayCharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), DisplayCharacterService]
    });

    service = TestBed.inject(DisplayCharacterService);
  });

  it('returns the chapter metadata for the display-character chapter', () => {
    expect(service.chapters()).toEqual({
      id: 1,
      label: 'Foundation Chapter',
      fragment: 'top',
      steps: [
        { id: 1, label: 'Project Set-up' },
        { id: 2, label: `Install Mock BN` },
        { id: 3, label: 'Define Feature State' },
        { id: 4, label: 'Build the Service' },
        { id: 5, label: `Initialize the Mock VBN` },
        { id: 6, label: `Register the Mock FC` },
        { id: 7, label: `Connect the service to Mock BN` },
        { id: 8, label: 'Display Character State' },
        { id: 9, label: 'Start the Application' },
        { id: 10, label: 'Complete Initial Tutorial' }
      ]
    });
  });
});
