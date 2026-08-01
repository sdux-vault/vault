import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { EncryptAndPersistService } from './encrypt-and-persist.service';

describe('Service: Encrypt and Persist', () => {
  let service: EncryptAndPersistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [provideZonelessChangeDetection(), EncryptAndPersistService]
    });

    service = TestBed.inject(EncryptAndPersistService);
  });

  it('returns the chapter metadata for the filters-and-reducers tutorial', () => {
    expect(service.chapters()).toEqual({
      id: 10,
      label: 'Encrypt and Persist Chapter',
      fragment: 'chapter-10',
      steps: [
        { id: 1, label: 'Encrypt Feature State' },
        { id: 2, label: 'Persist Feature State' },
        { id: 3, label: 'Observe Pipeline Errors' },
        { id: 4, label: 'Complete Encrypt and Persist Tutorial' }
      ]
    });
  });
});
