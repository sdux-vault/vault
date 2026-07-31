import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { ExampleComponent } from './example.component';
import { ExampleService } from './example.service';
import { StarWarsCharacter } from './star-wars-character.shape';

describe('ExampleComponent', () => {
  const key = 'star-wars-character';
  const initialCharacters: readonly StarWarsCharacter[] = [
    {
      id: 1,
      name: 'Luke',
      lastName: 'Skywalker',
      faction: 'Jedi Order',
      isForceSensitive: true
    }
  ];

  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(ExampleService, {
          key,
          initialState: initialCharacters
        })
      ]
    }).compileComponents;

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize its read state', async () => {
    await vaultSettled(key);

    expect(component['character']()).toEqual(
      Object({
        id: 1,
        name: 'Luke',
        lastName: 'Skywalker',
        faction: 'Jedi Order',
        isForceSensitive: true
      })
    );
  });
});
