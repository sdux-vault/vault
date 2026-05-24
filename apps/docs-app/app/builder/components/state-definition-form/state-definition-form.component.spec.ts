import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideVaultTesting } from '@sdux-vault/angular';
import { clearSessionStorage } from '@sdux-vault/testing-utils';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { PipelineBuilderService } from 'apps/docs-app/app/builder/services/pipeline-builder.service';
import { StatePrimitiveTypes } from 'apps/docs-app/app/builder/types/state-primitive.type';
import { TestScheduler } from 'rxjs/testing';
import { PIPELINE_BUILDER_FORM_INITIAL_VALUE_CONSTANT } from './constant/pipeline_builder_form_initial_value.constant';
import { StateDefinitionFormComponent } from './state-definition-form.component';

/**
 * --------------------------------------------
 * Mock PipelineBuilderService
 * --------------------------------------------
 */
class MockPipelineBuilderService {
  getStateFramework = jasmine.createSpy().and.returnValue(null);
  getShapeName = jasmine.createSpy().and.returnValue(null);
  getStatePrimitive = jasmine.createSpy().and.returnValue(null);
  getInitialValue = jasmine.createSpy().and.returnValue(null);
  commitStateInput = jasmine.createSpy();
}

describe('Component: StateDefinitionFormComponent', () => {
  let fixture: ComponentFixture<StateDefinitionFormComponent>;
  let component: StateDefinitionFormComponent;
  let builder: MockPipelineBuilderService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  afterEach(() => {
    clearSessionStorage('vault::sessionstorage::pipeline-builder');
  });

  async function createComponent() {
    TestBed.configureTestingModule({
      imports: [StateDefinitionFormComponent, sduxTestingModule],
      providers: [
        provideVaultTesting(),
        {
          provide: PipelineBuilderService,
          useClass: MockPipelineBuilderService
        }
      ]
    });

    fixture = TestBed.createComponent(StateDefinitionFormComponent);
    component = fixture.componentInstance;
    builder = TestBed.inject(
      PipelineBuilderService
    ) as unknown as MockPipelineBuilderService;

    fixture.detectChanges();
  }

  // ────────────────────────────────────────────
  // Initialization
  // ────────────────────────────────────────────

  it('should call service getters during form build', () => {
    scheduler.run(() => {
      createComponent();
      expect(builder.getStateFramework).toHaveBeenCalled();
      expect(builder.getShapeName).toHaveBeenCalled();
      expect(builder.getStatePrimitive).toHaveBeenCalled();
      expect(builder.getInitialValue).toHaveBeenCalled();
    });
  });

  it('should initialize form as invalid', () => {
    scheduler.run(() => {
      createComponent();
      expect(component.stateDefinitionForm.valid).toBeFalse();
    });
  });

  // ────────────────────────────────────────────
  // Validators
  // ────────────────────────────────────────────

  it('should require shapeName to be at least 3 characters', () => {
    scheduler.run(() => {
      createComponent();

      component.stateDefinitionForm.patchValue({ shapeName: 'ab' });
      expect(
        component.stateDefinitionForm.controls.shapeName.valid
      ).toBeFalse();

      component.stateDefinitionForm.patchValue({ shapeName: 'abc' });
      expect(component.stateDefinitionForm.controls.shapeName.valid).toBeTrue();
    });
  });

  // ────────────────────────────────────────────
  // Debounce behavior
  // ────────────────────────────────────────────

  it('should debounce before committing', () => {
    scheduler.run(({ flush }) => {
      createComponent();

      component.stateDefinitionForm.markAsDirty();

      component.stateDefinitionForm.patchValue({
        framework: 'Angular',
        shapeName: 'UserState',
        primitive: StatePrimitiveTypes.Object,
        initialValue: 'null'
      });

      expect(builder.commitStateInput).toHaveBeenCalledTimes(0);

      flush(); // advance virtual time

      expect(builder.commitStateInput).toHaveBeenCalledTimes(1);
    });
  });

  it('should NOT emit when pristine', () => {
    scheduler.run(({ flush }) => {
      createComponent();

      component.stateDefinitionForm.patchValue({
        framework: 'Angular'
      });

      flush();

      expect(builder.commitStateInput).not.toHaveBeenCalled();
    });
  });

  // ────────────────────────────────────────────
  // distinctUntilChanged
  // ────────────────────────────────────────────

  it('should not emit identical values twice', () => {
    scheduler.run(({ flush }) => {
      createComponent();

      component.stateDefinitionForm.markAsDirty();

      const value = {
        framework: 'Angular',
        shapeName: 'AppState',
        primitive: StatePrimitiveTypes.Object,
        initialValue: 'null'
      } as any;

      component.stateDefinitionForm.patchValue(value);
      flush();

      expect(builder.commitStateInput).toHaveBeenCalledTimes(1);

      component.stateDefinitionForm.patchValue(value);
      flush();

      expect(builder.commitStateInput).toHaveBeenCalledTimes(1);
    });
  });

  it('should emit when any property changes', () => {
    scheduler.run(({ flush }) => {
      createComponent();

      component.stateDefinitionForm.markAsDirty();

      component.stateDefinitionForm.patchValue({
        framework: 'Angular',
        shapeName: 'AppState',
        primitive: StatePrimitiveTypes.Object,
        initialValue: 'null'
      });

      flush();
      expect(builder.commitStateInput).toHaveBeenCalledTimes(1);

      component.stateDefinitionForm.patchValue({
        primitive: StatePrimitiveTypes.Array
      });

      flush();
      expect(builder.commitStateInput).toHaveBeenCalledTimes(2);
    });
  });

  // ────────────────────────────────────────────
  // Destroy safety
  // ────────────────────────────────────────────

  it('should stop emitting after destroy', () => {
    scheduler.run(({ flush }) => {
      createComponent();

      component.stateDefinitionForm.markAsDirty();
      component.stateDefinitionForm.patchValue({
        framework: 'Angular',
        shapeName: 'State',
        primitive: StatePrimitiveTypes.Object,
        initialValue: 'null'
      });

      flush();
      expect(builder.commitStateInput).toHaveBeenCalledTimes(1);

      fixture.destroy();

      component.stateDefinitionForm.patchValue({
        framework: 'Vue'
      });

      flush();
      expect(builder.commitStateInput).toHaveBeenCalledTimes(1);
    });
  });

  // ────────────────────────────────────────────
  // Signal / Computed behavior
  // ────────────────────────────────────────────

  it('should return empty array when primitive is null', () => {
    scheduler.run(() => {
      createComponent();
      expect(component.filteredInitialValues()).toEqual([]);
    });
  });

  it('should return empty array when primitive is unknown', () => {
    scheduler.run(() => {
      createComponent();

      // Intentionally bypass typing to simulate runtime corruption
      const invalidPrimitive = 'not-a-real-primitive' as any;

      component.stateDefinitionForm.patchValue({
        primitive: invalidPrimitive
      });

      fixture.detectChanges();

      expect(component.filteredInitialValues()).toEqual([]);
    });
  });

  it('should return correct mapped values for each primitive', () => {
    scheduler.run(() => {
      createComponent();

      Object.values(StatePrimitiveTypes).forEach((primitive) => {
        component.stateDefinitionForm.patchValue({ primitive });

        fixture.detectChanges();

        const expected =
          PIPELINE_BUILDER_FORM_INITIAL_VALUE_CONSTANT[primitive];

        expect(component.filteredInitialValues()).toEqual(expected);
      });
    });
  });

  it('should update filteredInitialValues reactively when primitive changes', () => {
    scheduler.run(() => {
      createComponent();

      component.stateDefinitionForm.patchValue({
        primitive: StatePrimitiveTypes.Array
      });

      fixture.detectChanges();

      expect(component.filteredInitialValues()).toEqual(
        PIPELINE_BUILDER_FORM_INITIAL_VALUE_CONSTANT[StatePrimitiveTypes.Array]
      );

      component.stateDefinitionForm.patchValue({
        primitive: StatePrimitiveTypes.Boolean
      });

      fixture.detectChanges();

      expect(component.filteredInitialValues()).toEqual(
        PIPELINE_BUILDER_FORM_INITIAL_VALUE_CONSTANT[
          StatePrimitiveTypes.Boolean
        ]
      );
    });
  });

  // ────────────────────────────────────────────
  // displayCustomValue computed behavior
  // ────────────────────────────────────────────

  // describe('displayCustomValue', () => {
  //   it('should return false when primitive is null', () => {
  //     scheduler.run(() => {
  //       createComponent();
  //       expect(component.displayCustomValue()).toBeFalse();
  //     });
  //   });

  //   it('should return true when primitive includes Custom option', () => {
  //     scheduler.run(() => {
  //       createComponent();

  //       component.stateDefinitionForm.patchValue({
  //         primitive: StatePrimitiveTypes.Array
  //       });

  //       fixture.detectChanges();

  //       expect(component.displayCustomValue()).toBeTrue();
  //     });
  //   });

  //   it('should return false when primitive does NOT include Custom option', () => {
  //     scheduler.run(() => {
  //       createComponent();

  //       component.stateDefinitionForm.patchValue({
  //         primitive: StatePrimitiveTypes.Boolean
  //       });

  //       fixture.detectChanges();

  //       expect(component.displayCustomValue()).toBeFalse();
  //     });
  //   });

  //   it('should update reactively when primitive changes', () => {
  //     scheduler.run(() => {
  //       createComponent();

  //       component.stateDefinitionForm.patchValue({
  //         primitive: StatePrimitiveTypes.Boolean
  //       });

  //       fixture.detectChanges();
  //       expect(component.displayCustomValue()).toBeFalse();

  //       component.stateDefinitionForm.patchValue({
  //         primitive: StatePrimitiveTypes.Object
  //       });

  //       fixture.detectChanges();
  //       expect(component.displayCustomValue()).toBeTrue();
  //     });
  //   });
  // });
});
