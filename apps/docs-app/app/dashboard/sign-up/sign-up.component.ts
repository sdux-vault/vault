import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import {
  BrandNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';
import { SignupService } from 'apps/docs-app/app/dashboard/sign-up/service/signup.service';
import { LoadingSpinnerService } from 'apps/docs-app/app/spinner/service/loading-spinner.service';
import { take } from 'rxjs';

/**
 * SignupComponent
 *
 * Presents the first step of the SDUX onboarding flow.
 * Collects organization and admin contact information, plus
 * the initial domain that will be used for the license flow.
 */
@Component({
  selector: 'sdux-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrandNameComponent,
    VaultBrandNameComponent,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  #fb = inject(FormBuilder);
  #signupService = inject(SignupService);
  #router = inject(Router);
  #loadingSpinner = inject(LoadingSpinnerService);

  /** Whether submit has been attempted */
  readonly submitted = signal(false);

  /** Main signup form */
  readonly form = this.#fb.nonNullable.group({
    organizationName: ['', [Validators.required, Validators.maxLength(255)]],
    fullName: ['', [Validators.required, Validators.maxLength(255)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(255)]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(128),
        SignupComponent.passwordComplexity
      ]
    ],
    domain: ['', [Validators.required, Validators.maxLength(255)]]
  });

  /** Whether the form is currently valid */
  readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status
  });

  readonly canContinue = computed(() => this.formStatus() === 'VALID');

  /** Convenience getters */
  get organizationName() {
    return this.form.controls.organizationName;
  }

  get fullName() {
    return this.form.controls.fullName;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get domain() {
    return this.form.controls.domain;
  }

  /**
   * Proceeds to the next step of signup.
   * Hook this up to your signup facade/service later.
   */
  next(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.#loadingSpinner.show();

    this.#signupService
      .signUp(this.form.getRawValue())
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.#loadingSpinner.hide();
          this.#router.navigate(['/dashboard']);
        },
        error: () => this.#loadingSpinner.hide()
      });
  }

  /**
   * Validates that a password contains at least one uppercase letter,
   * one lowercase letter, one digit, and one special character.
   */
  static passwordComplexity(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const errors: ValidationErrors = {};
    if (!/[A-Z]/.test(value)) {
      errors['missingUppercase'] = true;
    }
    if (!/[a-z]/.test(value)) {
      errors['missingLowercase'] = true;
    }
    if (!/[0-9]/.test(value)) {
      errors['missingNumber'] = true;
    }
    if (!/[^A-Za-z0-9]/.test(value)) {
      errors['missingSpecial'] = true;
    }
    return Object.keys(errors).length ? errors : null;
  }

  /**
   * Whether a field should show an error state.
   */
  hasError(control: keyof SignupComponent['form']['controls']): boolean {
    const field = this.form.controls[control];
    return field.invalid && (field.touched || this.submitted());
  }
}
