import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { of, throwError } from 'rxjs';
import { SDuXEnterpriseOverviewComponent } from './sdux-enterprise.component';
import { EnterpriseContactService } from './service/enterprise-contact.service';

describe('Component: SDuXEnterpriseOverview', () => {
  let fixture: ComponentFixture<SDuXEnterpriseOverviewComponent>;
  let component: SDuXEnterpriseOverviewComponent;
  let contactService: jasmine.SpyObj<EnterpriseContactService>;

  beforeEach(async () => {
    contactService = jasmine.createSpyObj('EnterpriseContactService', [
      'submitContact'
    ]);
    contactService.submitContact.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [sduxTestingModule, SDuXEnterpriseOverviewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(),
            fragment: of()
          }
        },
        {
          provide: EnterpriseContactService,
          useValue: contactService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SDuXEnterpriseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * --------------------------------------------
   * Initial State
   * --------------------------------------------
   */

  it('should initialize submitted as false', () => {
    expect(component.submitted()).toBeFalse();
  });

  it('should initialize submitError as null', () => {
    expect(component.submitError()).toBeNull();
  });

  /**
   * --------------------------------------------
   * Contact Form – Structure
   * --------------------------------------------
   */
  describe('contactForm', () => {
    it('should have all expected controls', () => {
      const controls = component.contactForm.controls;

      expect(controls.firstName).toBeDefined();
      expect(controls.lastName).toBeDefined();
      expect(controls.email).toBeDefined();
      expect(controls.company).toBeDefined();
      expect(controls.jobTitle).toBeDefined();
      expect(controls.teamSize).toBeDefined();
      expect(controls.message).toBeDefined();
    });

    it('should initialize all controls with empty strings', () => {
      const controls = component.contactForm.controls;

      expect(controls.firstName.value).toBe('');
      expect(controls.lastName.value).toBe('');
      expect(controls.email.value).toBe('');
      expect(controls.company.value).toBe('');
      expect(controls.jobTitle.value).toBe('');
      expect(controls.teamSize.value).toBe('');
      expect(controls.message.value).toBe('');
    });

    it('should be invalid when empty', () => {
      expect(component.contactForm.invalid).toBeTrue();
    });

    /**
     * --------------------------------------------
     * Contact Form – firstName Validation
     * --------------------------------------------
     */
    describe('firstName', () => {
      it('should be required', () => {
        const control = component.contactForm.controls.firstName;

        expect(control.hasError('required')).toBeTrue();
      });

      it('should accept a valid name', () => {
        const control = component.contactForm.controls.firstName;
        control.setValue('Jane');

        expect(control.valid).toBeTrue();
      });

      it('should reject a value exceeding max length', () => {
        const control = component.contactForm.controls.firstName;
        control.setValue('A'.repeat(101));

        expect(control.hasError('maxlength')).toBeTrue();
      });
    });

    /**
     * --------------------------------------------
     * Contact Form – lastName Validation
     * --------------------------------------------
     */
    describe('lastName', () => {
      it('should be required', () => {
        const control = component.contactForm.controls.lastName;

        expect(control.hasError('required')).toBeTrue();
      });

      it('should accept a valid name', () => {
        const control = component.contactForm.controls.lastName;
        control.setValue('Doe');

        expect(control.valid).toBeTrue();
      });

      it('should reject a value exceeding max length', () => {
        const control = component.contactForm.controls.lastName;
        control.setValue('B'.repeat(101));

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
        const control = component.contactForm.controls.email;

        expect(control.hasError('required')).toBeTrue();
      });

      it('should reject an invalid email', () => {
        const control = component.contactForm.controls.email;
        control.setValue('not-an-email');

        expect(control.hasError('email')).toBeTrue();
      });

      it('should accept a valid email', () => {
        const control = component.contactForm.controls.email;
        control.setValue('jane@example.com');

        expect(control.valid).toBeTrue();
      });

      it('should reject an email exceeding max length', () => {
        const control = component.contactForm.controls.email;
        control.setValue('a'.repeat(250) + '@b.com');

        expect(control.hasError('maxlength')).toBeTrue();
      });
    });

    /**
     * --------------------------------------------
     * Contact Form – company Validation
     * --------------------------------------------
     */
    describe('company', () => {
      it('should be required', () => {
        const control = component.contactForm.controls.company;

        expect(control.hasError('required')).toBeTrue();
      });

      it('should accept a valid company name', () => {
        const control = component.contactForm.controls.company;
        control.setValue('Acme Corp');

        expect(control.valid).toBeTrue();
      });

      it('should reject a value exceeding max length', () => {
        const control = component.contactForm.controls.company;
        control.setValue('C'.repeat(201));

        expect(control.hasError('maxlength')).toBeTrue();
      });
    });

    /**
     * --------------------------------------------
     * Contact Form – jobTitle Validation
     * --------------------------------------------
     */
    describe('jobTitle', () => {
      it('should not be required', () => {
        const control = component.contactForm.controls.jobTitle;

        expect(control.hasError('required')).toBeFalse();
        expect(control.valid).toBeTrue();
      });

      it('should accept a valid job title', () => {
        const control = component.contactForm.controls.jobTitle;
        control.setValue('VP of Engineering');

        expect(control.valid).toBeTrue();
      });

      it('should reject a value exceeding max length', () => {
        const control = component.contactForm.controls.jobTitle;
        control.setValue('D'.repeat(151));

        expect(control.hasError('maxlength')).toBeTrue();
      });
    });

    /**
     * --------------------------------------------
     * Contact Form – teamSize Validation
     * --------------------------------------------
     */
    describe('teamSize', () => {
      it('should not be required', () => {
        const control = component.contactForm.controls.teamSize;

        expect(control.hasError('required')).toBeFalse();
        expect(control.valid).toBeTrue();
      });

      it('should accept a team size value', () => {
        const control = component.contactForm.controls.teamSize;
        control.setValue('51-200');

        expect(control.valid).toBeTrue();
      });
    });

    /**
     * --------------------------------------------
     * Contact Form – message Validation
     * --------------------------------------------
     */
    describe('message', () => {
      it('should be required', () => {
        const control = component.contactForm.controls.message;

        expect(control.hasError('required')).toBeTrue();
      });

      it('should accept a valid message', () => {
        const control = component.contactForm.controls.message;
        control.setValue('We need enterprise support for our deployment.');

        expect(control.valid).toBeTrue();
      });

      it('should reject a value exceeding max length', () => {
        const control = component.contactForm.controls.message;
        control.setValue('E'.repeat(2001));

        expect(control.hasError('maxlength')).toBeTrue();
      });
    });
  });

  /**
   * --------------------------------------------
   * Form Status Signal
   * --------------------------------------------
   */
  describe('formStatus', () => {
    it('should reflect INVALID when form is empty', () => {
      expect(component.formStatus()).toBe('INVALID');
    });

    it('should reflect VALID when all required fields are filled', () => {
      component.contactForm.controls.firstName.setValue('Jane');
      component.contactForm.controls.lastName.setValue('Doe');
      component.contactForm.controls.email.setValue('jane@example.com');
      component.contactForm.controls.company.setValue('Acme Corp');
      component.contactForm.controls.message.setValue('Enterprise inquiry');

      expect(component.formStatus()).toBe('VALID');
    });
  });

  /**
   * --------------------------------------------
   * submitContact()
   * --------------------------------------------
   */
  describe('submitContact', () => {
    it('should not submit when form is invalid', () => {
      component.submitContact();

      expect(component.submitted()).toBeFalse();
    });

    it('should mark all controls as touched when form is invalid', () => {
      component.submitContact();

      expect(component.contactForm.controls.firstName.touched).toBeTrue();
      expect(component.contactForm.controls.lastName.touched).toBeTrue();
      expect(component.contactForm.controls.email.touched).toBeTrue();
      expect(component.contactForm.controls.company.touched).toBeTrue();
      expect(component.contactForm.controls.message.touched).toBeTrue();
    });

    it('should submit when form is valid', () => {
      component.contactForm.controls.firstName.setValue('Jane');
      component.contactForm.controls.lastName.setValue('Doe');
      component.contactForm.controls.email.setValue('jane@example.com');
      component.contactForm.controls.company.setValue('Acme Corp');
      component.contactForm.controls.message.setValue('Enterprise inquiry');

      component.submitContact();

      expect(contactService.submitContact).toHaveBeenCalledWith(
        jasmine.objectContaining({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          company: 'Acme Corp',
          message: 'Enterprise inquiry'
        })
      );
      expect(component.submitted()).toBeTrue();
    });

    it('should clear submitError on valid submission', () => {
      component.submitError.set('previous error');
      component.contactForm.controls.firstName.setValue('Jane');
      component.contactForm.controls.lastName.setValue('Doe');
      component.contactForm.controls.email.setValue('jane@example.com');
      component.contactForm.controls.company.setValue('Acme Corp');
      component.contactForm.controls.message.setValue('Enterprise inquiry');

      component.submitContact();

      expect(component.submitError()).toBeNull();
    });

    it('should set submitError on server error', () => {
      contactService.submitContact.and.returnValue(
        throwError(() => new Error('Server error'))
      );
      component.contactForm.controls.firstName.setValue('Jane');
      component.contactForm.controls.lastName.setValue('Doe');
      component.contactForm.controls.email.setValue('jane@example.com');
      component.contactForm.controls.company.setValue('Acme Corp');
      component.contactForm.controls.message.setValue('Enterprise inquiry');

      component.submitContact();

      expect(component.submitted()).toBeFalse();
      expect(component.submitError()).toBe(
        'Unable to submit your inquiry. Please try again.'
      );
    });

    it('should not clear submitError on invalid submission', () => {
      component.submitError.set('previous error');

      component.submitContact();

      expect(component.submitError()).toBe('previous error');
    });
  });
});
