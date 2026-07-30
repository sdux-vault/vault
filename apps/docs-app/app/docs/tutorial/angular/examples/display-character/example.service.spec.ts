import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { StarWarsCharacterState } from '../../../examples/star-wars-character.state';
import { ExampleService } from './example.service';

describe('ExampleService', () => {
  const key = 'star-wars-character';
  let service: ExampleService;
  const initialCharacters: readonly StarWarsCharacterState[] = [
    {
      id: 10,
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    },
    {
      id: 20,
      name: 'Luke',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isForceSensitive: true
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideFeatureCell(
          ExampleService,
          { key, initialState: initialCharacters },
          [],
          []
        )
      ]
    });

    service = TestBed.inject(ExampleService);
  });

  it('should initialize with the configured FeatureCell State', async () => {
    await vaultSettled(key);
    expect(service.state.value()).toEqual(initialCharacters);
    expect(service.state.isLoading()).toBeFalse();
    expect(service.state.error()).toBeNull();
    expect(service.state.hasValue()).toBeTrue();
  });
});
