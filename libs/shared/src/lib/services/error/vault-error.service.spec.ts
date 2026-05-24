import { firstValueFrom } from 'rxjs';
import { VaultErrorShape } from '../../shapes/vault-error.shape';

import { VaultErrorService } from './vault-error.service';
import { VaultPrivateErrorService } from './vault-private-error.service';

describe('Service: VaultErrorService', () => {
  let errorService: any;
  let privateErrorService: any;

  beforeEach(() => {
    errorService = VaultErrorService();
    privateErrorService = VaultPrivateErrorService();
  });

  afterEach(() => {
    errorService.clear();
    privateErrorService.clear();
  });

  it('should return the same singleton instance on multiple calls', () => {
    const svc2 = VaultErrorService();
    expect(errorService).toBe(svc2);
  });

  it('should start with a null error state', async () => {
    const value = await firstValueFrom(errorService.error$);

    expect(value).toBeNull();
    expect(errorService.hasError).toBeFalse();
  });

  it('should mirror errors emitted by the private service', async () => {
    const errorService = VaultErrorService();

    const received: (VaultErrorShape | null)[] = [];

    const sub = errorService.error$.subscribe((v) => received.push(v));

    const err: VaultErrorShape = Object({ code: 'E_TEST', message: 'testing' });

    expect(errorService.hasError).toBeFalse();

    privateErrorService.setError(err);

    expect(errorService.hasError).toBeTrue();

    expect(received).toEqual([
      null, // initial BehaviorSubject value
      err // mirrored update
    ]);

    expect(errorService.hasError).toBeTrue();
    sub.unsubscribe();

    expect(errorService.hasError).toBeTrue();
  });

  it('should clear the error when clear() is called', async () => {
    const received: (VaultErrorShape | null)[] = [];
    const sub = errorService.error$.subscribe((v: any) => received.push(v));
    expect(errorService.hasError).toBeFalse();

    const err: VaultErrorShape = Object({ code: 'X', message: 'boom' });

    privateErrorService.setError(err);
    expect(errorService.hasError).toBeTrue();
    errorService.clear(); // should propagate to private service → null
    expect(errorService.hasError).toBeFalse();

    expect(received).toEqual([
      null, // initial
      err, // from private
      null // after clear()
    ]);

    sub.unsubscribe();
  });

  it('should handle multiple consecutive error emissions', () => {
    const received: (VaultErrorShape | null)[] = [];
    const sub = errorService.error$.subscribe((v: any) => received.push(v));
    expect(errorService.hasError).toBeFalse();

    privateErrorService.setError(Object({ code: 'E1', message: 'first' }));
    expect(errorService.hasError).toBeTrue();
    privateErrorService.setError(Object({ code: 'E2', message: 'second' }));
    expect(errorService.hasError).toBeTrue();
    privateErrorService.setError(null);
    expect(errorService.hasError).toBeFalse();
    privateErrorService.setError(Object({ code: 'E3', message: 'third' }));
    expect(errorService.hasError).toBeTrue();

    expect(received).toEqual([
      null,
      Object({ code: 'E1', message: 'first' }),
      Object({ code: 'E2', message: 'second' }),
      null,
      Object({ code: 'E3', message: 'third' })
    ]);

    sub.unsubscribe();
  });

  it('should not error if clear() is called when already null', () => {
    const received: (VaultErrorShape | null)[] = [];
    const sub = errorService.error$.subscribe((v: any) => received.push(v));
    expect(errorService.hasError).toBeFalse();

    errorService.clear(); // noop but should not emit anything except initial
    expect(errorService.hasError).toBeFalse();

    expect(received).toEqual([null, null]);
    expect(errorService.hasError).toBeFalse();

    sub.unsubscribe();
  });
});
