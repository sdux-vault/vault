import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { getLicenseData } from '../../../testing/data/license/license.data';
import { ContactService } from '../service/contact.service';
import { LicenseShape } from '../shape/license.shape';
import { LicenseCardComponent } from './license-card.component';

describe('Component: LicenseCard', () => {
  let fixture: any;
  let component: LicenseCardComponent;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const validLicense = getLicenseData(0);

  const invalidLicense: LicenseShape = {
    ...getLicenseData(0),
    licenseKey: 'invalid-key'
  };

  beforeAll(() => {
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach(async () => {
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [LicenseCardComponent, sduxTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatSnackBar, useValue: snackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LicenseCardComponent);
    component = fixture.componentInstance;

    spyOn(navigator.clipboard, 'writeText').and.resolveTo();
  });

  // ───────────────────────────────────────────────
  // Decode / Signals
  // ───────────────────────────────────────────────

  it('should decode payload correctly', () => {
    fixture.componentRef.setInput('license', validLicense);
    fixture.detectChanges();

    const payload = component.licensePayload();

    expect(payload.domain).toBe('example.com');
    expect(component.hasError()).toBeFalse();
  });

  it('should handle invalid payload', () => {
    fixture.componentRef.setInput('license', invalidLicense);
    fixture.detectChanges();

    expect(component.hasError()).toBeTrue();
    expect(component.licensePayload().organization).toContain('Unknown');
  });

  it('should compute active status', () => {
    fixture.componentRef.setInput('license', validLicense);
    fixture.detectChanges();

    expect(component.isActive()).toBeTrue();
  });

  it('should compute invalid state', () => {
    fixture.componentRef.setInput('license', invalidLicense);
    fixture.detectChanges();

    expect(component.isInvalid()).toBeTrue();
  });

  it('should handle a toggle event', () => {
    expect(component.isExpanded()).toBeFalse();
    component.toggle();
    expect(component.isExpanded()).toBeTrue();
    component.toggle();
    expect(component.isExpanded()).toBeFalse();
  });

  describe('dates', () => {
    it('should format valid date', () => {
      const result = component.formatLicenseDate('2026-01-01T17:00:00');
      expect(result).toBe('1/1/2026');
    });

    it('should return dash for empty date', () => {
      expect(component.formatLicenseDate(undefined)).toBe('-');
    });
  });

  it('should have a contact', async () => {
    const contactService = TestBed.inject(ContactService);
    spyOn(contactService.adminContact, 'value').and.callThrough();

    fixture.componentRef.setInput('license', validLicense);
    fixture.detectChanges();

    component.contact();
    expect(contactService.adminContact.value).toHaveBeenCalledWith();
  });

  // ───────────────────────────────────────────────
  // Copy License (toast)
  // ───────────────────────────────────────────────

  it('should copy license and show snackbar', async () => {
    fixture.componentRef.setInput('license', validLicense);
    fixture.detectChanges();

    component.copyLicense();

    await Promise.resolve();

    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    expect(snackBar.open).toHaveBeenCalledWith('License Key copied!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  });

  // ───────────────────────────────────────────────
  // Copy Fingerprint (icon state)
  // ───────────────────────────────────────────────

  it('should copy fingerprint and toggle success state', async () => {
    fixture.componentRef.setInput('license', validLicense);
    fixture.detectChanges();

    component.copyFingerprint();

    expect(component.copySuccess()).toBeTrue();

    await Promise.resolve();

    jasmine.clock().tick(2000);

    expect(component.copySuccess()).toBeFalse();
  });

  // ───────────────────────────────────────────────
  // Clipboard error
  // ───────────────────────────────────────────────

  it('should show snackbar when copy fails', async () => {
    (navigator.clipboard.writeText as jasmine.Spy).and.returnValue(
      Promise.reject(new Error('copy failed'))
    );

    fixture.componentRef.setInput('license', validLicense);
    fixture.detectChanges();

    component.copyLicense();

    await Promise.resolve();
    await Promise.resolve();

    expect(snackBar.open).toHaveBeenCalledWith('Copy failed!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  });

  // ───────────────────────────────────────────────
  // Download
  // ───────────────────────────────────────────────

  it('should trigger download and show snackbar', () => {
    fixture.componentRef.setInput('license', validLicense);
    fixture.detectChanges();

    const clickSpy = jasmine.createSpy('click');

    spyOn(document, 'createElement').and.returnValue({
      click: clickSpy
    } as any);

    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:url');
    spyOn(window.URL, 'revokeObjectURL');

    component.downloadLicense();

    expect(clickSpy).toHaveBeenCalled();

    expect(snackBar.open).toHaveBeenCalledWith('License file downloaded!', '', {
      duration: 2000,
      verticalPosition: 'top'
    });
  });

  describe('files', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('license', validLicense);
      fixture.detectChanges();
    });

    it('should display the angular embedded example', () => {
      expect(
        component.getAngularEmbeddedExample().replace(/\n|\s+/g, ' ')
      ).toBe(
        `// app.config.ts export const appConfig: ApplicationConfig = {  providers: [  provideVault({ licenses: [  {  licenseId: 'sdux-vault',  payload: 'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSBMYWJzIExMQyIsImRvbWFpbiI6ImV4YW1wbGUuY29tIiwibGljZW5zZVR5cGUiOiJlbnRlcnByaXNlIiwiaXNzdWVkQXQiOjE3MzAwMDAwMDAwMDAsImV4cGlyZXMiOjE3NjE1MzYwMDAwMDB9.bW9jay1zaWduYXR1cmUtc2R1eC1zaGEyNTYtcnNhLXNpbQ=='  }  ]  })  ] };`
      );
    });

    it('should display the file example', () => {
      expect(component.getFileExample().replace(/\n|\s+/g, ' ')).toBe(
        `// sdux-vault.license.ts  import { VaultLicensingShape } from '@sdux-vault/shared';  export const sduxVaultLicense: VaultLicensingShape = {  licenseId: 'sdux-vault',  payload: 'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSBMYWJzIExMQyIsImRvbWFpbiI6ImV4YW1wbGUuY29tIiwibGljZW5zZVR5cGUiOiJlbnRlcnByaXNlIiwiaXNzdWVkQXQiOjE3MzAwMDAwMDAwMDAsImV4cGlyZXMiOjE3NjE1MzYwMDAwMDB9.bW9jay1zaWduYXR1cmUtc2R1eC1zaGEyNTYtcnNhLXNpbQ==' };`
      );
    });

    it('should display the embedded example', () => {
      expect(component.getEmbeddedExample().replace(/\n|\s+/g, ' ')).toBe(
        `Vault({ licenses: [  {  licenseId: 'sdux-vault',  payload: 'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSBMYWJzIExMQyIsImRvbWFpbiI6ImV4YW1wbGUuY29tIiwibGljZW5zZVR5cGUiOiJlbnRlcnByaXNlIiwiaXNzdWVkQXQiOjE3MzAwMDAwMDAwMDAsImV4cGlyZXMiOjE3NjE1MzYwMDAwMDB9.bW9jay1zaWduYXR1cmUtc2R1eC1zaGEyNTYtcnNhLXNpbQ=='  }  ] });`
      );
    });
  });
});
