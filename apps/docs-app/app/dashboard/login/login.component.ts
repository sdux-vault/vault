import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';

import {
  BrandNameComponent,
  VaultBrandNameComponent
} from '@sdux-vault/ui/web-components';

import { LoadingSpinnerService } from 'apps/docs-app/app/spinner/service/loading-spinner.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'sdux-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrandNameComponent,
    VaultBrandNameComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  #fb = inject(FormBuilder);
  #router = inject(Router);
  #loginService = inject(LoginService);
  #spinner = inject(LoadingSpinnerService);

  readonly submitted = signal(false);

  readonly loginError = signal<string | null>(null);

  readonly form = this.#fb.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(255)]
    ],
    password: ['', [Validators.required, Validators.maxLength(128)]]
  });

  readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status
  });

  readonly canLogin = computed(() => this.formStatus() === 'VALID');

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  login(): void {
    this.submitted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.loginError.set(null); // 🔥 clear previous error
    this.#spinner.show();

    this.#loginService
      .login(this.form.getRawValue())
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.#spinner.hide();
          this.#router.navigate(['/dashboard']);
        },
        error: () => {
          this.#spinner.hide();
          this.loginError.set('Invalid email or password.');
        }
      });
  }

  hasError(control: keyof LoginComponent['form']['controls']): boolean {
    const field = this.form.controls[control];
    return field.invalid && (field.touched || this.submitted());
  }
}
