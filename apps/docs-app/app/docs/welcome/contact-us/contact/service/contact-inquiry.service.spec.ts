import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../../environments/environment';
import { ContactInquiryShape } from '../shape/contact-inquiry.shape';
import { ContactInquiryService } from './contact-inquiry.service';

describe('Service: ContactInquiry', () => {
  let service: ContactInquiryService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.api}/api/v1/contact`;

  const mockContact: ContactInquiryShape = {
    source: 'sdux-vault',
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'Interested in licensing options.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        ContactInquiryService
      ]
    });

    service = TestBed.inject(ContactInquiryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should POST contact data to the contact inquiry endpoint', () => {
    service.submitContact(mockContact).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockContact);

    req.flush(null);
  });

  it('should send the correct request body with sdux-vault source', () => {
    const sduxContact: ContactInquiryShape = {
      source: 'sdux-vault',
      name: 'John Smith',
      email: 'john@corp.com',
      message: 'Need support for our vault setup.'
    };

    service.submitContact(sduxContact).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.body).toEqual(sduxContact);

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
