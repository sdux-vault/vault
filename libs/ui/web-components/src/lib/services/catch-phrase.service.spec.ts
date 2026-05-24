import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '../testing-module/sdux.testing.module';
import { CatchPhraseService } from './catch-phrase.service';

describe('Service: CatchPhrase', () => {
  const mockPhrase = 'Mock CP';
  let service: CatchPhraseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [CatchPhraseService]
    });

    service = TestBed.inject(CatchPhraseService);
  });

  it('should expose the injected catch phrase via phrase and value', () => {
    // Service exists
    expect(service).toBeTruthy();

    // The raw injected property
    expect(service.phrase).toBe(mockPhrase);

    // The getter value
    expect(service.value).toBe(mockPhrase);

    // Both must be identical
    expect(service.value).toEqual(service.phrase);
  });
});
