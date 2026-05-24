import { Injector, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideVaultTesting } from '../../testing/provide-vault-testing';
import { FeatureCell } from '../decorators/feature-cell.decorator';
import { provideFeatureCell } from '../providers/feature-cell/provide-feature-cell.provider';
import { injectVault } from './feature-vault.injector';

describe('Injector: Vault', () => {
  let injector: Injector;

  @FeatureCell<any>('testFeature')
  class TestFeatureCellService {
    public readonly vault = injectVault<any>(TestFeatureCellService);
    constructor() {}
  }

  beforeEach(() => {
    spyOn(console, 'warn');
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideVaultTesting(),

        provideFeatureCell(TestFeatureCellService, {
          key: 'testFeature',
          initialState: [],
          insights: {} as any
        }),
        TestFeatureCellService
      ]
    });

    injector = TestBed.inject(Injector);
  });

  it('should inject the correct vault instance for a decorated service', () => {
    const service = injector.get(TestFeatureCellService);
    TestBed.tick();

    // Should be a valid vault
    expect(service.vault).toBeTruthy();
    expect((service.vault.state as any).value()).toBeUndefined();
  });

  it('should throw an error when called without a @FeatureCell-decorated class', () => {
    expect(() => injectVault()).toThrowError(
      /injectVault\(\) must be called inside a @FeatureCell\(\)-decorated service/
    );
  });

  it('should throw an error if called without a @FeatureCell-decorated class', () => {
    class UndecoratedService {}

    expect(() => injectVault(UndecoratedService)).toThrowError(
      /must be called inside a @FeatureCell\(\)-decorated service/
    );
  });
});
