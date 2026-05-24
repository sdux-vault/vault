import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  VaultErrorShape,
  VaultPrivateErrorService,
  VaultPrivateErrorServiceContract
} from '@sdux-vault/shared';
import { VaultErrorService } from './vault-error.service';

describe('Service: VaultError', () => {
  let publicService: VaultErrorService;
  let privateService: VaultPrivateErrorServiceContract;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VaultErrorService,
        VaultPrivateErrorService,
        provideZonelessChangeDetection()
      ]
    });

    publicService = TestBed.inject(VaultErrorService);
    privateService = VaultPrivateErrorService();
    privateService.clear();
  });

  it('should mirror private error updates into the public read-only signal', () => {
    // Initially both should be null
    expect(publicService.error()).toBeNull();

    // Create a mock error
    const mockError: VaultErrorShape = {
      message: 'Pipeline Failure',
      featureCellKey: 'featureCellKey',
      timestamp: Date.now(),
      raw: new Error('raw')
    };

    // Update private service
    privateService.setError(mockError);
    TestBed.tick();

    // Public signal should mirror the private one
    expect(publicService.error()).toEqual(mockError);

    // Clearing private clears public
    privateService.clear();
    TestBed.tick();
    expect(publicService.error()).toBeNull();

    privateService.setError(mockError);
    TestBed.tick();

    // Public signal should mirror the private one
    expect(publicService.error()).toEqual(mockError);

    // Clearing private clears public
    publicService.clear();
    TestBed.tick();
    expect(publicService.error()).toBeNull();
  });
});
