import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { sduxTestingModule } from '@sdux-vault/ui/web-components';
import { environment } from '../../../environments/environment';
import { StripeService } from './stripe.service';

describe('Service: Stripe', () => {
  let service: StripeService;
  let httpMock: HttpTestingController;

  const domain = 'example.com';

  const apiUrl = `${environment.api}/api/v1/organization/stripe/checkout`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [sduxTestingModule],
      providers: [StripeService]
    });

    service = TestBed.inject(StripeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should POST checkout session request to backend', () => {
    const mockUrl = 'https://checkout.stripe.com/session/test';

    let response: string | undefined;

    service.createCheckoutSession(domain).subscribe((data) => {
      response = data;
    });

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ domain });

    req.flush(mockUrl);

    expect(response).toBe(mockUrl);
  });

  it('should propagate HTTP errors', () => {
    let errorResponse: unknown;

    service.createCheckoutSession(domain).subscribe({
      error: (err) => {
        errorResponse = err;
      }
    });

    const req = httpMock.expectOne(apiUrl);

    req.flush(
      { message: 'Stripe checkout failed' },
      { status: 500, statusText: 'Server Error' }
    );

    expect(errorResponse).toBeTruthy();
  });
});
