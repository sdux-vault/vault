import { ComponentFixture, TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { of, throwError } from 'rxjs';
import { ContactTemplateComponent } from './contact-template.component';
import { ContactInquiryService } from './service/contact-inquiry.service';

describe('Component: ContactTemplate', () => {
  let fixture: ComponentFixture<ContactTemplateComponent>;
  let component: ContactTemplateComponent;
  let contactService: jasmine.SpyObj<ContactInquiryService>;

  beforeEach(async () => {
    contactService = jasmine.createSpyObj('ContactInquiryService', [
      'submitContact'
    ]);
    contactService.submitContact.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [sduxTestingModule, ContactTemplateComponent],
      providers: [
        {
          provide: ContactInquiryService,
          useValue: contactService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * --------------------------------------------
   * Initial State
   * --------------------------------------------
   */

  it('should initialize submitted as false', () => {
    expect(component['submitted']).toBeFalse();
  });

  it('should initialize submitError as false', () => {
    expect(component['submitError']).toBeFalse();
  });

  /**
   * --------------------------------------------
   * Contact Form – Structure
   * --------------------------------------------
   */
  describe('contactForm', () => {
    it('should have all expected controls', () => {
      const controls = component['contactForm'].controls;

      expect(controls.name).toBeDefined();
      expect(controls.email).toBeDefined();
      expect(controls.message).toBeDefined();
    });

    it('should initialize all controls with empty strings', () => {
      const controls = component['contactForm'].controls;

      expect(controls.name.value).toBe('');
      expect(controls.email.value).toBe('');
      expect(controls.message.value).toBe('');
    });

    it('should be invalid when empty', () => {
      expect(component['contactForm'].invalid).toBeTrue();
    });

    /**
     * --------------------------------------------
     * Contact Form – name Validation
     * --------------------------------------------
     */
    describe('name', () => {
      it('should be required', () => {
        const control = component['contactForm'].controls.name;

        expect(control.hasError('required')).toBeTrue();
      });

      it('should reject a value below min length', () => {
        const control = component['contactForm'].controls.name;
        control.setValue('A');

        expect(control.hasError('minlength')).toBeTrue();
      });

      it('should accept a valid name', () => {
        const control = component['contactForm'].controls.name;
        control.setValue('Jane');

        expect(control.valid).toBeTrue();
      });

      it('should reject a value exceeding max length', () => {
        const control = component['contactForm'].controls.name;
        control.setValue('A'.repeat(201));

        expect(control.hasError('maxlength')).toBeTrue();
      });
    });

    /**
     * --------------------------------------------
     * Contact Form – email Validation
     * --------------------------------------------
     */
    describe('email', () => {
      it('should be required', () => {
        const control = component['contactForm'].controls.email;

        expect(control.hasError('required')).toBeTrue();
      });

      it('should reject an invalid email', () => {
        const control = component['contactForm'].controls.email;
        control.setValue('not-an-email');

        expect(control.hasError('email')).toBeTrue();
      });

      it('should accept a valid email', () => {
        const control = component['contactForm'].controls.email;
        control.setValue('jane@example.com');

        expect(control.valid).toBeTrue();
      });

      it('should reject an email exceeding max length', () => {
        const control = component['contactForm'].controls.email;
        control.setValue('a'.repeat(250) + '@b.com');

        expect(control.hasError('maxlength')).toBeTrue();
      });
    });

    /**
     * --------------------------------------------
     * Contact Form – message Validation
     * --------------------------------------------
     */
    describe('message', () => {
      it('should be required', () => {
        const control = component['contactForm'].controls.message;

        expect(control.hasError('required')).toBeTrue();
      });

      it('should reject a value below min length', () => {
        const control = component['contactForm'].controls.message;
        control.setValue('Short');

        expect(control.hasError('minlength')).toBeTrue();
      });

      it('should accept a valid message', () => {
        const control = component['contactForm'].controls.message;
        control.setValue('I have a question about your services.');

        expect(control.valid).toBeTrue();
      });

      it('should reject a value exceeding max length', () => {
        const control = component['contactForm'].controls.message;
        control.setValue('E'.repeat(10001));

        expect(control.hasError('maxlength')).toBeTrue();
      });
    });
  });

  /**
   * --------------------------------------------
   * onSubmit()
   * --------------------------------------------
   */
  describe('onSubmit', () => {
    function fillValidForm(): void {
      component['contactForm'].controls.name.setValue('Jane Doe');
      component['contactForm'].controls.email.setValue('jane@example.com');
      component['contactForm'].controls.message.setValue(
        'I have a question about your services.'
      );
    }

    it('should not submit when form is invalid', () => {
      component['onSubmit']();

      expect(component['submitted']).toBeFalse();
      expect(contactService.submitContact).not.toHaveBeenCalled();
    });

    it('should mark all controls as touched when form is invalid', () => {
      component['onSubmit']();

      expect(component['contactForm'].controls.name.touched).toBeTrue();
      expect(component['contactForm'].controls.email.touched).toBeTrue();
      expect(component['contactForm'].controls.message.touched).toBeTrue();
    });

    it('should submit when form is valid', () => {
      fillValidForm();

      component['onSubmit']();

      expect(contactService.submitContact).toHaveBeenCalledWith(
        jasmine.objectContaining({
          source: 'sdux-vault',
          name: 'Jane Doe',
          email: 'jane@example.com',
          message: 'I have a question about your services.'
        })
      );
      expect(component['submitted']).toBeTrue();
    });

    it('should reset the form after successful submission', () => {
      fillValidForm();

      component['onSubmit']();

      expect(component['contactForm'].controls.name.value).toBe('');
      expect(component['contactForm'].controls.email.value).toBe('');
      expect(component['contactForm'].controls.message.value).toBe('');
    });

    it('should clear submitError on valid submission', () => {
      component['submitError'] = true;
      fillValidForm();

      component['onSubmit']();

      expect(component['submitError']).toBeFalse();
    });

    it('should set submitError on server error', () => {
      contactService.submitContact.and.returnValue(
        throwError(() => new Error('Server error'))
      );
      fillValidForm();

      component['onSubmit']();

      expect(component['submitted']).toBeFalse();
      expect(component['submitError']).toBeTrue();
    });

    it('should not clear submitError on invalid submission', () => {
      component['submitError'] = true;

      component['onSubmit']();

      expect(component['submitError']).toBeTrue();
    });
  });
});
