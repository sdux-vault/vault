import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Signal
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';

import { MatTooltip } from '@angular/material/tooltip';
import { PipelineBuilderService } from 'apps/docs-app/app/builder/services/pipeline-builder.service';
import { StateInputShape } from '../../shapes/state-definition.shape';
import { StateFrameworkType } from '../../types/state-framework.type';
import { StatePrimitiveType } from '../../types/state-primitive.type';
import { PIPELINE_BUILDER_FORM_FRAMEWORK_CONSTANT } from './constant/pipeline-builder-form-framework.constant';
import { PIPELINE_BUILDER_FORM_PRIMITIVE_CONSTANT } from './constant/pipeline-builder-form-primitive.constant';
import { PIPELINE_BUILDER_FORM_INITIAL_VALUE_CONSTANT } from './constant/pipeline_builder_form_initial_value.constant';

@Component({
  selector: 'sdux-state-definition-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTooltip
  ],
  templateUrl: './state-definition-form.component.html',
  styleUrls: ['./state-definition-form.component.scss']
})
export class StateDefinitionFormComponent {
  //implements OnInit {
  stateDefinitionForm!: FormGroup<{
    framework: FormControl<StateFrameworkType | null>;
    shapeName: FormControl<string | null>;
    primitive: FormControl<StatePrimitiveType | null>;
    initialValue: FormControl<string | null>;
    // customValue: FormControl<string | null>;
  }>;
  readonly #builder = inject(PipelineBuilderService);
  readonly #destroyRef = inject(DestroyRef);

  readonly frameworks = PIPELINE_BUILDER_FORM_FRAMEWORK_CONSTANT;
  readonly primitives = PIPELINE_BUILDER_FORM_PRIMITIVE_CONSTANT;

  #primitiveSignal!: Signal<StatePrimitiveType | null>;
  /***
   *
   * If you enable this then you need to change this in the pipeline-builder.service
   *
   * readonly getInitialValue = computed(() => {
   *   onst initialValue = this.#stateInput()?.initialValue;
   *   eturn isStateInitialValueType(initialValue) ? initialValue : null;
   * });
   *
   */
  // #initialValueSignal!: Signal<string | null>;

  // readonly displayCustomValue = computed(() => {
  //   return this.#initialValueSignal() === StateInitialValueTypes.Custom;
  // });

  readonly filteredInitialValues = computed(() => {
    const primitive = this.#primitiveSignal() as StatePrimitiveType | null;

    if (!primitive) return [];

    return PIPELINE_BUILDER_FORM_INITIAL_VALUE_CONSTANT[primitive] ?? [];
  });

  constructor(private formBuilder: FormBuilder) {
    this.#buildForm();

    effect(() => {
      const framework = this.#builder.getStateFramework();
      const shapeName = this.#builder.getShapeName();
      const primitive = this.#builder.getStatePrimitive();
      const initialValue = this.#builder.getInitialValue();

      this.stateDefinitionForm.patchValue(
        {
          framework,
          shapeName,
          primitive,
          initialValue
        },
        { emitEvent: false }
      );
    });

    // this.stateDefinitionForm.controls.initialValue.valueChanges
    //   .pipe(takeUntilDestroyed(this.#destroyRef))
    //   .subscribe((value) => {
    //     const isCustom = value === 'custom';

    //     const control = this.stateDefinitionForm.controls.customValue;

    //     if (isCustom) {
    //       control.enable({ emitEvent: false });
    //     } else {
    //       control.disable({ emitEvent: false });
    //       control.setValue(null, { emitEvent: false });
    //     }
    //   });

    // // Debounced updates to the service
    this.stateDefinitionForm.valueChanges
      .pipe(
        debounceTime(250),
        // avoid emitting when form object changes but values are same
        map((value) => {
          // let finalInitialValue: string | null = value.initialValue ?? null;

          // if (value.initialValue === StateInitialValueTypes.Custom) {
          //   finalInitialValue = value.customValue ?? null;
          // }

          return {
            framework: value.framework ?? null,
            shapeName: (value.shapeName ?? '') as string,
            primitive: value.primitive ?? null,
            // initialValue: finalInitialValue
            initialValue: value.initialValue
          } satisfies Partial<StateInputShape>;
        }),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        // optional: only update once the user has interacted at least once
        filter(() => this.stateDefinitionForm.dirty),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((partial) => {
        this.#builder.commitStateInput(partial);
      });
  }

  // ngOnInit(): void {
  //   const incoming = this.#builder.getInitialValue();

  //   if (incoming && !Object.values(StateInitialValueTypes).includes(incoming as any)) {
  //     // Not a known type → treat as custom
  //     this.stateDefinitionForm.patchValue(
  //       {
  //         initialValue: StateInitialValueTypes.Custom,
  //         customValue: incoming
  //       },
  //       { emitEvent: true }
  //     );
  //   }
  // }

  #buildForm(): void {
    this.stateDefinitionForm = this.formBuilder.group({
      framework: this.formBuilder.control<StateFrameworkType | null>(
        this.#builder.getStateFramework(),
        Validators.required
      ),
      shapeName: this.formBuilder.control<string | null>(
        this.#builder.getShapeName(),
        [Validators.required, Validators.minLength(3)]
      ),
      primitive: this.formBuilder.control<StatePrimitiveType | null>(
        this.#builder.getStatePrimitive(),
        Validators.required
      ),
      initialValue: this.formBuilder.control<string | null>(
        this.#builder.getInitialValue(),
        Validators.required
      )
      // customValue: this.formBuilder.control<string | null>(null)
    });

    this.#primitiveSignal = toSignal(
      this.stateDefinitionForm.controls.primitive.valueChanges,
      {
        initialValue: this.stateDefinitionForm.controls.primitive.value
      }
    );

    // this.#initialValueSignal = toSignal(this.stateDefinitionForm.controls.initialValue.valueChanges, {
    //   initialValue: this.stateDefinitionForm.controls.initialValue.value
    // });
  }
}
