import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { SignupService } from 'apps/docs-app/app/dashboard/sign-up/service/signup.service';
import { LoadingSpinnerService } from 'apps/docs-app/app/spinner/service/loading-spinner.service';
import { SignupComponent } from './sign-up.component';

describe('Component: Signup', () => {
  let fixture: ComponentFixture<SignupComponent>;
  let component: SignupComponent;

  let signupService: jasmine.SpyObj<SignupService>;
  let spinner: jasmine.SpyObj<LoadingSpinnerService>;
  let router: Router;

  beforeEach(async () => {
    signupService = jasmine.createSpyObj<SignupService>('SignupService', [
      'signUp'
    ]);
    spinner = jasmine.createSpyObj<LoadingSpinnerService>(
      'LoadingSpinnerService',
      ['show', 'hide']
    );
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SignupComponent, sduxTestingModule],
      providers: [
        { provide: SignupService, useValue: signupService },
        { provide: LoadingSpinnerService, useValue: spinner }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should initialize the form with empty values', () => {
    expect(component.form.value).toEqual({
      organizationName: '',
      fullName: '',
      email: '',
      password: '',
      domain: ''
    });
  });

  it('should expose form getters', () => {
    expect(component.organizationName).toBe(
      component.form.controls.organizationName
    );
    expect(component.fullName).toBe(component.form.controls.fullName);
    expect(component.email).toBe(component.form.controls.email);
    expect(component.password).toBe(component.form.controls.password);
    expect(component.domain).toBe(component.form.controls.domain);
  });

  it('should return false for canContinue when form invalid', () => {
    expect(component.canContinue()).toBeFalse();
  });

  it('should return true for canContinue when form valid', () => {
    component.form.setValue({
      organizationName: 'OpenAI',
      fullName: 'Sam Altman',
      email: 'sam@openai.com',
      password: 'SuperSecure1!',
      domain: 'openai.com'
    });

    fixture.detectChanges();

    expect(component.canContinue()).toBeTrue();
  });

  it('should reject password without complexity requirements', () => {
    component.form.setValue({
      organizationName: 'OpenAI',
      fullName: 'Sam Altman',
      email: 'sam@openai.com',
      password: 'simplepassword',
      domain: 'openai.com'
    });

    fixture.detectChanges();

    expect(component.canContinue()).toBeFalse();
    expect(component.password.hasError('missingUppercase')).toBeTrue();
  });

  it('should reject password shorter than 12 characters', () => {
    component.form.setValue({
      organizationName: 'OpenAI',
      fullName: 'Sam Altman',
      email: 'sam@openai.com',
      password: 'Short1!aB',
      domain: 'openai.com'
    });

    fixture.detectChanges();

    expect(component.canContinue()).toBeFalse();
    expect(component.password.hasError('minlength')).toBeTrue();
  });

  it('should reject password without lowercase letter', () => {
    component.form.setValue({
      organizationName: 'OpenAI',
      fullName: 'Sam Altman',
      email: 'sam@openai.com',
      password: 'ALLUPPERCASE1!',
      domain: 'openai.com'
    });

    fixture.detectChanges();

    expect(component.canContinue()).toBeFalse();
    expect(component.password.hasError('missingLowercase')).toBeTrue();
  });

  it('should not call signup if form invalid', () => {
    component.next();

    expect(signupService.signUp).not.toHaveBeenCalled();
  });

  it('should call signup service and navigate on success', () => {
    signupService.signUp.and.returnValue(of(void 0));

    component.form.setValue({
      organizationName: 'OpenAI',
      fullName: 'Sam Altman',
      email: 'sam@openai.com',
      password: 'SuperSecure1!',
      domain: 'openai.com'
    });

    component.next();

    expect(spinner.show).toHaveBeenCalled();
    expect(signupService.signUp).toHaveBeenCalledWith(
      component.form.getRawValue()
    );
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should hide spinner if signup fails', () => {
    signupService.signUp.and.returnValue(
      throwError(() => new Error('signup failed'))
    );

    component.form.setValue({
      organizationName: 'OpenAI',
      fullName: 'Sam Altman',
      email: 'sam@openai.com',
      password: 'SuperSecure1!',
      domain: 'openai.com'
    });

    component.next();

    expect(spinner.show).toHaveBeenCalled();
    expect(spinner.hide).toHaveBeenCalled();
  });

  it('should mark fields as touched when next() called', () => {
    component.next();

    Object.values(component.form.controls).forEach((control) => {
      expect(control.touched).toBeTrue();
    });
  });

  describe('hasError()', () => {
    it('should return false when field valid', () => {
      component.organizationName.setValue('OpenAI');

      expect(component.hasError('organizationName')).toBeFalse();
    });

    it('should return true when field invalid and touched', () => {
      component.organizationName.markAsTouched();

      expect(component.hasError('organizationName')).toBeTrue();
    });

    it('should return true when invalid and submitted', () => {
      component.submitted.set(true);

      expect(component.hasError('organizationName')).toBeTrue();
    });
  });
});
