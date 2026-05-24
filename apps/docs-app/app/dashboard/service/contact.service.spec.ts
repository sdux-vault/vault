import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { environment } from '../../../environments/environment';
import { getContactData } from '../../../testing/data/contact/contact.data';
import { ContactService } from './contact.service';

describe('Service: Contact (httpResource)', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.api}/api/v1/organization/contact/admin`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [ContactService]
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET admin contact and populate value()', async () => {
    const mockContact = getContactData(0);

    expect(service.adminContact.isLoading()).toBeTrue();
    await TestBed.tick();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockContact);

    expect(service.adminContact.isLoading()).toBeTrue();

    await TestBed.tick();
    expect(service.adminContact.isLoading()).toBeFalse();
    expect(service.adminContact.error()).toBeUndefined();
    expect(service.adminContact.value()).toEqual(mockContact);
  });

  it('should handle 404 (not found)', async () => {
    // trigger request
    service.adminContact.value();
    await TestBed.tick();

    const req = httpMock.expectOne(apiUrl);

    req.flush(
      { message: 'Admin contact not found' },
      { status: 404, statusText: 'Not Found' }
    );
    await TestBed.tick();

    expect(service.adminContact.isLoading()).toBeFalse();
    expect(service.adminContact.error()?.message).toBe(
      'Http failure response for http://localhost:3101/api/v1/organization/contact/admin: 404 Not Found'
    );
  });
});
