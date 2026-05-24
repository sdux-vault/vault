import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../environments/environment';
import { EnterpriseContactShape } from '../shape/enterprise-contact.shape';
import { EnterpriseContactService } from './enterprise-contact.service';

describe('Service: EnterpriseContact', () => {
  let service: EnterpriseContactService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.api}/api/v1/enterprise/contact`;

  const mockContact: EnterpriseContactShape = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    company: 'Acme Corp',
    jobTitle: 'VP of Engineering',
    teamSize: '51-200',
    message: 'Interested in enterprise licensing.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        EnterpriseContactService
      ]
    });

    service = TestBed.inject(EnterpriseContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should POST contact data to the enterprise contact endpoint', () => {
    service.submitContact(mockContact).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockContact);

    req.flush(null);
  });

  it('should send the correct request body', () => {
    const minimalContact: EnterpriseContactShape = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@corp.com',
      company: 'Corp Inc',
      jobTitle: '',
      teamSize: '',
      message: 'Need enterprise support.'
    };

    service.submitContact(minimalContact).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.body).toEqual(minimalContact);

    req.flush(null);
  });

  it('should propagate server errors', () => {
    let errorResponse: unknown;

    service.submitContact(mockContact).subscribe({
      error: (err) => {
        errorResponse = err;
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(
      { message: 'Internal Server Error' },
      { status: 500, statusText: 'Internal Server Error' }
    );

    expect(errorResponse).toBeDefined();
  });
});
