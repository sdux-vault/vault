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
    },
    {
      id: 2,
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
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
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should expose the latest character collection from the service', async () => {
    expect(component.characters()).toEqual([]);
    await vaultSettled(key);
    expect(component.characters()).toEqual(initialCharacters);
  });

  it('should expose no selected character before a valid selection is made', async () => {
    await vaultSettled(key);
    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should select a known character id and resolve the selected character', async () => {
    await vaultSettled(key);
    component['selectCharacter']('2');

    expect(component['selectedCharacterId']()).toBe(2);
    expect(component['selectedCharacter']()).toEqual(initialCharacters[1]);
  });

  it('should ignore an unknown character id', async () => {
    await vaultSettled(key);
    component['selectCharacter']('999');

    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should keep the empty state when a selected id is not found', async () => {
    await vaultSettled(key);
    component['selectCharacter']('3');

    expect(component['selectedCharacterId']()).toBeNull();
    expect(component['selectedCharacter']()).toBeNull();
  });

  it('should render the empty state until a character is selected', async () => {
    await vaultSettled(key);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const detailsPanel = host.querySelector(
      '.character-details'
    ) as HTMLElement;

    expect(detailsPanel.textContent).toContain('No character selected');
    expect(detailsPanel.textContent).not.toContain('Leia');
  });

  it('should render the selected character details after selection', async () => {
    await vaultSettled(key);
    component['selectCharacter']('2');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;

    expect(host.textContent).toContain('Leia');
    expect(host.textContent).toContain('Rebel Alliance');
    expect(host.textContent).not.toContain('No character selected');
  });
});
