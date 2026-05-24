import { VaultPrivateErrorServiceContract } from '../../interfaces/vault/vault-private-error-service.interface';
import { VaultErrorShape } from '../../shapes/vault-error.shape';
import { VaultPrivateErrorService } from './vault-private-error.service';

describe('Service: VaultPrivateError', () => {
  let privateErrorService: VaultPrivateErrorServiceContract;

  beforeEach(() => {
    privateErrorService = VaultPrivateErrorService();
  });

  afterEach(() => {
    privateErrorService.clear();
  });

  it('should create a singleton instance', () => {
    const service2 = VaultPrivateErrorService();

    expect(privateErrorService).toBe(service2);
  });

  it('should expose getError() as an observable', () => {
    const error$ = privateErrorService.getError();
    expect(error$).toBeTruthy();
    expect(typeof error$.subscribe).toBe('function');
  });

  it('should emit null initially', () => {
    let result: any = 'no error';
    privateErrorService.getError().subscribe((value) => {
      result = value;
    });
    expect(result).toBeNull();
  });

  it('should emit the value passed to setError()', () => {
    const err: VaultErrorShape = {
      message: 'Something went wrong',
      code: 'X01'
    } as any;

    const values: (VaultErrorShape | null)[] = [];

    privateErrorService.getError().subscribe((v) => {
      values.push(v);
    });

    privateErrorService.setError(err);

    expect(values).toEqual([null, err]);
  });

  it('should clear the error when clear() is called', () => {
    const err: VaultErrorShape = { message: 'boom', code: 'E123' } as any;

    const result: (VaultErrorShape | null)[] = [];
    privateErrorService.getError().subscribe((v) => {
      result.push(v);

      if (result.length === 3) {
      }
    });

    privateErrorService.setError(err);
    privateErrorService.clear();

    expect(result).toEqual([null, err, null]);
  });

  it('should allow multiple subscribers to receive the same emissions', () => {
    const err: VaultErrorShape = { message: 'multi', code: 'M01' } as any;

    let aLast: any = undefined;
    let bLast: any = undefined;

    privateErrorService.getError().subscribe((v) => (aLast = v));
    privateErrorService.getError().subscribe((v) => (bLast = v));

    privateErrorService.setError(err);

    expect(aLast).toEqual(err);
    expect(bLast).toEqual(err);
  });

  it('should not reset the singleton when calling service again', () => {
    privateErrorService.setError({ message: 'persist', code: 'P01' } as any);

    const sameInstance = VaultPrivateErrorService();

    let last: VaultErrorShape | null = null;
    sameInstance.getError().subscribe((v) => (last = v));

    expect(last).toEqual(Object({ message: 'persist', code: 'P01' }));
  });
});
