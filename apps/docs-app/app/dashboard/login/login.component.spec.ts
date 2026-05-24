import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { LoadingSpinnerService } from 'apps/docs-app/app/spinner/service/loading-spinner.service';
import { LoginService } from '../service/login.service';
import { LoginComponent } from './login.component';

describe('Component: Login', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  let loginService: jasmine.SpyObj<LoginService>;
  let spinner: jasmine.SpyObj<LoadingSpinnerService>;
  let router: Router;

  beforeEach(async () => {
    loginService = jasmine.createSpyObj<LoginService>('LoginService', [
      'login'
    ]);
    spinner = jasmine.createSpyObj<LoadingSpinnerService>(
      'LoadingSpinnerService',
      ['show', 'hide']
    );

    await TestBed.configureTestingModule({
      imports: [LoginComponent, sduxTestingModule],
      providers: [
        { provide: LoginService, useValue: loginService },
        { provide: LoadingSpinnerService, useValue: spinner }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({
      email: '',
      password: ''
    });
  });

  it('should expose form getters', () => {
    expect(component.email).toBe(component.form.controls.email);
    expect(component.password).toBe(component.form.controls.password);
  });

  it('should return false for canLogin when form invalid', () => {
    expect(component.canLogin()).toBeFalse();
  });

  it('should return true for canLogin when form valid', () => {
    component.form.setValue({
      email: 'user@test.com',
      password: 'password'
    });

    fixture.detectChanges();

    expect(component.canLogin()).toBeTrue();
  });

  it('should not call login if form invalid', () => {
    component.login();

    expect(loginService.login).not.toHaveBeenCalled();
  });

  it('should call login service and navigate on success', () => {
    loginService.login.and.returnValue(of(void 0));

    component.form.setValue({
      email: 'user@test.com',
      password: 'password'
    });

    component.login();

    expect(spinner.show).toHaveBeenCalled();
    expect(loginService.login).toHaveBeenCalledWith(
      component.form.getRawValue()
    );
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.loginError()).toBeNull();
  });

  it('should hide spinner if login fails', () => {
    loginService.login.and.returnValue(
      throwError(() => new Error('login failed'))
    );

    component.form.setValue({
      email: 'user@test.com',
      password: 'password'
    });

    component.login();

    expect(spinner.show).toHaveBeenCalled();
    expect(spinner.hide).toHaveBeenCalled();
    expect(component.loginError()).toBe('Invalid email or password.');
  });

  it('should mark fields as touched when login() called', () => {
    component.login();

    Object.values(component.form.controls).forEach((control) => {
      expect(control.touched).toBeTrue();
    });
  });

  describe('hasError()', () => {
    it('should return false when field valid', () => {
      component.email.setValue('user@test.com');

      expect(component.hasError('email')).toBeFalse();
    });

    it('should return true when field invalid and touched', () => {
      component.email.markAsTouched();

      expect(component.hasError('email')).toBeTrue();
    });

    it('should return true when invalid and submitted', () => {
      component.submitted.set(true);

      expect(component.hasError('email')).toBeTrue();
    });
  });
});
