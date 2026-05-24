import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { environment } from '../../../environments/environment';
import { getLicenseData } from '../../../testing/data/license/license.data';
import { LicenseShape } from '../shape/license.shape';
import { AuthenticationService } from './authentication.service';
import { LicenseService } from './license.service';

describe('Service: License', () => {
  let service: LicenseService;
  let httpMock: HttpTestingController;
  let authService: jasmine.SpyObj<AuthenticationService>;

  const apiUrl = `${environment.api}/api/v1/organization/licenses`;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', [
      'getOrganizationUuid'
    ]);

    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [
        LicenseService,
        { provide: AuthenticationService, useValue: authService }
      ]
    });

    service = TestBed.inject(LicenseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET licenses for the organization', () => {
    const licenseNoFingerprint = getLicenseData(1);
    delete licenseNoFingerprint.fingerprint;
    const mockLicenses = [getLicenseData(0), licenseNoFingerprint];

    let response: LicenseShape[] | undefined;

    service.getLicenses().subscribe((data) => {
      response = data;
    });

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('GET');

    req.flush(mockLicenses);

    expect(response).toEqual([
      Object({
        id: 1,
        uuid: '1',
        organizationUuid: 'org-1',
        domain: 'example.com',
        licenseKey:
          'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSBMYWJzIExMQyIsImRvbWFpbiI6ImV4YW1wbGUuY29tIiwibGljZW5zZVR5cGUiOiJlbnRlcnByaXNlIiwiaXNzdWVkQXQiOjE3MzAwMDAwMDAwMDAsImV4cGlyZXMiOjE3NjE1MzYwMDAwMDB9.bW9jay1zaWduYXR1cmUtc2R1eC1zaGEyNTYtcnNhLXNpbQ==',
        fingerprint:
          'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0',
        status: 'active',
        licenseType: 'standard',
        fingerprintDisplay: 'A1B2C3...BCDEF0',
        created: jasmine.any(Date),
        expires: null
      }),
      Object({
        id: 2,
        uuid: '2',
        organizationUuid: 'org-1',
        domain: 'this-is-a-very-long-domain-name-to-see-what-happens-test.com',
        licenseKey:
          'eyJvcmdhbml6YXRpb24iOiJTaWduYWwgRGF0YSBMYWJzIExMQyIsImRvbWFpbiI6InRoaXMtaXMtYS12ZXJ5LWxvbmctZG9tYWluLW5hbWUtdG8tc2VlLXdoYXQtaGFwcGVucy10ZXN0LmNvbSIsImxpY2Vuc2VUeXBlIjoiZW50ZXJwcmlzZSIsImlzc3VlZEF0IjoxNzMwMDAwMDAwMDAwLCJleHBpcmVzIjoxNzYxNTM2MDAwMDAwfQ==.bW9jay1zaWduYXR1cmUtbG9uZw==',
        status: 'active',
        fingerprintDisplay: '',
        licenseType: 'enterprise',
        created: jasmine.any(Date),
        expires: jasmine.any(Date)
      })
    ]);
  });

  it('should propagate HTTP errors', () => {
    let errorResponse: unknown;

    service.getLicenses().subscribe({
      error: (err) => {
        errorResponse = err;
      }
    });

    const req = httpMock.expectOne(apiUrl);

    req.flush(
      { message: 'Server error' },
      { status: 500, statusText: 'Server Error' }
    );

    expect(errorResponse).toBeTruthy();
  });
});
