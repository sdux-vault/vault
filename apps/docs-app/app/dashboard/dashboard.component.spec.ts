import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';

import { sduxTestingModule, WINDOW } from '@sdux-vault/ui/web-components';

import { getLicenseData } from '../../testing/data/license/license.data';
import { ContactInquiryDialogService } from '../docs/top-tier/contact-us/contact/service/contact-inquiry-dialog.service';
import { DashboardComponent } from './dashboard.component';
import { LicenseService } from './service/license.service';
import { StripeService } from './service/stripe.service';

describe('Component: Dashboard', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  let licenseService: jasmine.SpyObj<LicenseService>;
  let stripeService: jasmine.SpyObj<StripeService>;
  let contactDialogService: jasmine.SpyObj<ContactInquiryDialogService>;
  let queryParamMap$: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  const mockWindow = {
    location: {
      href: '',
      assign: jasmine.createSpy('assign')
    }
  };

  beforeEach(async () => {
    licenseService = jasmine.createSpyObj<LicenseService>('LicenseService', [
      'getLicenses'
    ]);

    stripeService = jasmine.createSpyObj<StripeService>('StripeService', [
      'createCheckoutSession'
    ]);

    contactDialogService = jasmine.createSpyObj<ContactInquiryDialogService>(
      'ContactInquiryDialogService',
      ['open']
    );

    licenseService.getLicenses.and.returnValue(of(getLicenseData()));

    queryParamMap$ = new BehaviorSubject(convertToParamMap({}));

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, sduxTestingModule],
      providers: [
        { provide: LicenseService, useValue: licenseService },
        { provide: StripeService, useValue: stripeService },
        {
          provide: ContactInquiryDialogService,
          useValue: contactDialogService
        },
        { provide: WINDOW, useValue: mockWindow },
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap: queryParamMap$ }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should initialize with empty domain', () => {
    expect(component.domain()).toBe('');
  });

  it('should initialize licenses from service', () => {
    expect(licenseService.getLicenses).toHaveBeenCalled();
    expect(component.licenses().length).toBe(5);
  });

  it('should update domain value', () => {
    component.updateDomain('example.com');

    expect(component.domain()).toBe('example.com');
  });

  it('should not call StripeService if domain is empty', () => {
    component.updateDomain('   ');

    component.buyLicense();

    expect(stripeService.createCheckoutSession).not.toHaveBeenCalled();
  });

  it('should call StripeService on buyLicense', () => {
    const checkoutUrl = 'https://stripe.test/session';

    stripeService.createCheckoutSession.and.returnValue(of(checkoutUrl));

    component.updateDomain('example.com');

    component.buyLicense();

    expect(stripeService.createCheckoutSession).toHaveBeenCalledWith(
      'example.com'
    );

    expect(mockWindow.location.assign).toHaveBeenCalledOnceWith(checkoutUrl);
  });

  it('should show success banner when success query param is true', () => {
    queryParamMap$.next(convertToParamMap({ success: 'true' }));

    fixture.detectChanges();

    expect(component.showSuccess()).toBeTrue();
    expect(component.showCancel()).toBeFalse();
  });

  it('should show cancel banner when cancel query param is true', () => {
    queryParamMap$.next(convertToParamMap({ cancel: 'true' }));

    fixture.detectChanges();

    expect(component.showCancel()).toBeTrue();
    expect(component.showSuccess()).toBeFalse();
  });

  it('should not show banners when no query params are set', () => {
    expect(component.showSuccess()).toBeFalse();
    expect(component.showCancel()).toBeFalse();
  });

  it('should return error when domain exceeds 255 characters', () => {
    component.updateDomain('a'.repeat(256));

    expect(component.domainError()).toBe(
      'Domain must not exceed 255 characters.'
    );
  });

  it('should not call StripeService if domain exceeds 255 characters', () => {
    component.updateDomain('a'.repeat(256));

    component.buyLicense();

    expect(stripeService.createCheckoutSession).not.toHaveBeenCalled();
  });

  it('should open contact dialog', () => {
    component.openContactDialog();

    expect(contactDialogService.open).toHaveBeenCalled();
  });
});
