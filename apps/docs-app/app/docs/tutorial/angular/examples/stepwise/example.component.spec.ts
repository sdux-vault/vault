import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  withArrayAppendMergeBehavior,
  withStepwiseController,
  withStepwiseFilterBehavior,
  withStepwiseReducerBehavior,
  withStepwiseResolveBehavior
} from '@sdux-vault/addons';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { ExampleComponent } from './example.component';
import { exampleHydrate } from './example.hydrate';
import { ExampleService } from './example.service';
import type { StarWarsCharacter } from './star-wars-character.shape';

describe('ExampleComponent', () => {
  const key = 'star-wars-character';
  const initialCharacters: StarWarsCharacter[] = [
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
  let service: ExampleService;

  const settlePipeline = async (): Promise<void> => {
    let settled = false;
    const settledPromise = vaultSettled(key).then(() => {
      settled = true;
    });

    while (!settled) {
      await Promise.race([
        settledPromise,
        new Promise<void>((resolve) => setTimeout(resolve))
      ]);

      if (service.isStepwiseResolvePending()) {
        component['acceptStepwiseResolve']();
        continue;
      }

      if (service.isStepwiseFilterPending()) {
        component['acceptStepwiseFilter']();
        continue;
      }

      if (service.isStepwiseReducerPending()) {
        component['acceptStepwiseReducer']();
      }
    }

    await settledPromise;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideVaultTesting(),
        provideZonelessChangeDetection(),
        provideFeatureCell(
          ExampleService,
          { key, initialState: initialCharacters },
          [
            withArrayAppendMergeBehavior,
            withStepwiseResolveBehavior,
            withStepwiseFilterBehavior,
            withStepwiseReducerBehavior
          ],
          [withStepwiseController]
        )
      ]
    }).compileComponents();

    spyOn(exampleHydrate, 'getPromise').and.returnValue(
      Promise.resolve(initialCharacters)
    );
    spyOn(window, 'confirm').and.returnValue(true);

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ExampleService);
    fixture.detectChanges();
    await settlePipeline();
    fixture.detectChanges();
  });

  afterEach(() => TestBed.resetTestingModule());

  it('should select a known character and patch the editor', () => {
    component['selectCharacter']('2');

    expect(component['selectedCharacter']()?.id).toBe(2);
    expect(component['characterForm'].getRawValue()).toEqual({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
  });

  it('should ignore an unknown character selection', () => {
    component['selectCharacter']('999');

    expect(component['selectedCharacter']()?.id).toBe(2);
  });

  it('should enter create mode and restore it when canceled', () => {
    component['startCreate']();
    expect(component['editorMode']()).toBe('create');

    component['cancelEdit']();

    expect(component['editorMode']()).toBe('edit');
    expect(component['selectedCharacterId']()).toBe(2);
  });

  it('should show invalid feedback for an invalid form', () => {
    component['startCreate']();

    component['saveCharacter']();

    expect(component['feedback']()).toEqual(
      component.editor.feedback['invalidForm']
    );
  });

  it('should delegate the three Stepwise decisions', () => {
    const resolveSpy = spyOn(service, 'acceptStepwiseResolve');
    const cancelResolveSpy = spyOn(service, 'cancelStepwiseResolve');
    const filterSpy = spyOn(service, 'cancelStepwiseFilter');
    const reducerSpy = spyOn(service, 'acceptStepwiseReducer');
    const cancelReducerSpy = spyOn(service, 'cancelStepwiseReducer');

    component['acceptStepwiseResolve']();
    component['cancelStepwiseResolve']();
    component['cancelStepwiseFilter']();
    component['acceptStepwiseReducer']();
    component['cancelStepwiseReducer']();

    expect(resolveSpy).toHaveBeenCalledTimes(1);
    expect(cancelResolveSpy).toHaveBeenCalledTimes(1);
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(reducerSpy).toHaveBeenCalledTimes(1);
    expect(cancelReducerSpy).toHaveBeenCalledTimes(1);
  });

  it('should delegate Reset State to the service', () => {
    const resetSpy = spyOn(service, 'resetState');

    component['resetState']();

    expect(resetSpy).toHaveBeenCalledOnceWith();
    expect(component['characterForm'].pristine).toBeTrue();
  });

  it('should restore edits for an existing selection or fall back to create mode', () => {
    expect(component['editorTitle']()).toBe('Update character');
    expect(component['submitLabel']()).toBe('Save changes');
    component['selectCharacter']('2');
    component['characterForm'].setValue({
      name: 'Changed',
      lastName: 'Name',
      faction: 'Changed Faction',
      isForceSensitive: true
    });
    component['cancelEdit']();

    expect(component['feedback']()).toEqual(
      component.editor.feedback['unsavedChangesDiscarded']
    );

    component['selectedCharacterId'].set(null);
    component['cancelEdit']();
    expect(component['editorMode']()).toBe('create');
    expect(component['editorTitle']()).toBe('Add a character');
    expect(component['submitLabel']()).toBe('Add character');
  });

  it('should create and update characters from valid form values', () => {
    const createdCharacter: StarWarsCharacter = {
      id: 20,
      name: 'Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    };
    spyOn(service, 'createCharacter').and.returnValue(createdCharacter);

    component['startCreate']();
    component['characterForm'].setValue({
      name: '  Han  ',
      lastName: '  Solo  ',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    component['saveCharacter']();

    expect(component['selectedCharacterId']()).toBe(20);
    expect(component['feedback']()?.message).toContain('Han Solo');

    const updatedCharacter = { ...createdCharacter, name: 'General Han' };
    spyOn(service, 'updateCharacter').and.returnValue(updatedCharacter);
    component['characterForm'].setValue({
      name: 'General Han',
      lastName: 'Solo',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });
    component['saveCharacter']();

    expect(component['feedback']()?.message).toContain('General Han Solo');
  });

  it('should require a selection before saving an edit', () => {
    component['editorMode'].set('edit');
    component['selectedCharacterId'].set(null);
    component['characterForm'].setValue({
      name: 'Leia',
      lastName: 'Organa',
      faction: 'Rebel Alliance',
      isForceSensitive: false
    });

    component['saveCharacter']();

    expect(component['feedback']()).toEqual(
      component.editor.feedback['selectBeforeSave']
    );
  });

  it('should manage delete confirmation and reset the editor after confirmation', () => {
    const removeSpy = spyOn(service, 'removeCharacter');
    component['selectCharacter']('2');
    component['requestDelete']();

    expect(component['deleteCandidate']()?.id).toBe(2);
    component['cancelDelete']();
    expect(component['deleteCandidate']()).toBeNull();

    component['requestDelete']();
    component['confirmDelete']();

    expect(removeSpy).toHaveBeenCalledWith(2);
    expect(component['editorMode']()).toBe('create');
    expect(component['deleteCandidate']()).toBeNull();
  });

  it('should ignore delete requests and confirmations without a candidate', () => {
    component['selectedCharacterId'].set(null);
    component['requestDelete']();
    component['confirmDelete']();

    expect(component['deleteCandidate']()).toBeNull();
  });

  it('should handle hydration callbacks when they are available or absent', () => {
    const resolve = jasmine.createSpy('resolve');
    spyOn(exampleHydrate, 'getResolve').and.returnValue(resolve);
    component['resolveHydration']();
    expect(resolve).toHaveBeenCalledTimes(1);
    expect(component['hydrationSettled']()).toBeTrue();

    const reject = jasmine.createSpy('reject');
    spyOn(exampleHydrate, 'getReject').and.returnValue(reject);
    component['rejectHydration']();
    expect(reject).toHaveBeenCalledTimes(1);

    (exampleHydrate.getResolve as jasmine.Spy).and.returnValue(null);
    (exampleHydrate.getReject as jasmine.Spy).and.returnValue(null);
    component['resolveHydration']();
    component['rejectHydration']();
  });

  it('should reset prompt guards and avoid duplicate prompts', () => {
    const confirmSpy = window.confirm as jasmine.Spy;
    confirmSpy.calls.reset();
    confirmSpy.and.returnValue(true);

    component['processStepwiseResolvePending'](true);
    component['processStepwiseResolvePending'](true);
    component['processStepwiseResolvePending'](false);
    component['processStepwiseFilterPending'](true);
    component['processStepwiseFilterPending'](true);
    component['processStepwiseFilterPending'](false);
    component['processStepwiseReducerPending'](true);
    component['processStepwiseReducerPending'](true);
    component['processStepwiseReducerPending'](false);

    expect(confirmSpy).toHaveBeenCalledTimes(3);
  });

  it('should follow the native prompt decision for each Stepwise stage', () => {
    const resolveSpy = spyOn(component as never, 'acceptStepwiseResolve');
    const filterSpy = spyOn(component as never, 'cancelStepwiseFilter');
    const reducerSpy = spyOn(component as never, 'acceptStepwiseReducer');
    (window.confirm as jasmine.Spy).and.returnValues(true, false, true);

    component['handleStepwiseResolvePrompt']();
    component['handleStepwiseFilterPrompt']();
    component['handleStepwiseReducerPrompt']();

    expect(resolveSpy).toHaveBeenCalledTimes(1);
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(reducerSpy).toHaveBeenCalledTimes(1);
  });

  it('should block each Stepwise stage when the prompt is canceled', () => {
    const resolveSpy = spyOn(component as never, 'cancelStepwiseResolve');
    const filterSpy = spyOn(component as never, 'cancelStepwiseFilter');
    const reducerSpy = spyOn(component as never, 'cancelStepwiseReducer');
    (window.confirm as jasmine.Spy).and.returnValue(false);

    component['handleStepwiseResolvePrompt']();
    component['handleStepwiseFilterPrompt']();
    component['handleStepwiseReducerPrompt']();

    expect(resolveSpy).toHaveBeenCalledTimes(1);
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(reducerSpy).toHaveBeenCalledTimes(1);
  });
});
