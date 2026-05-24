import { LoadingSpinnerService } from './loading-spinner.service';

describe('Service: Spinner', () => {
  let service: LoadingSpinnerService;

  beforeEach(() => {
    service = new LoadingSpinnerService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial state as false', () => {
    expect(service.isLoading()).toBeFalse();
  });

  it('should set loading to true when show() is called', () => {
    service.show();
    expect(service.isLoading()).toBeTrue();
  });

  it('should set loading to false when hide() is called', () => {
    service.show();
    service.hide();
    expect(service.isLoading()).toBeFalse();
  });

  it('should return a readonly signal reference', () => {
    const signalRef = service.isLoading;
    expect(typeof signalRef).toBe('function');
    expect(signalRef()).toBeFalse();
  });
});
