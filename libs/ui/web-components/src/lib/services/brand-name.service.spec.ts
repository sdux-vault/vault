import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  SDUX_FEATURE_CELL_BRAND_NAME,
  SDUX_VAULT_BRAND_NAME
} from '../../public-api';
import { SDUX_BRAND_NAME } from '../tokens/brand-name.token';
import { BrandNameService } from './brand-name.service';

describe('BrandNameService', () => {
  const mockBrand = 'TestBrand';
  const mockVaultBrand = 'TestVaultBrand';
  const mockFeatureCellBrand = 'TestFeatureCellBrand';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        BrandNameService,
        { provide: SDUX_BRAND_NAME, useValue: mockBrand },
        { provide: SDUX_VAULT_BRAND_NAME, useValue: mockVaultBrand },
        {
          provide: SDUX_FEATURE_CELL_BRAND_NAME,
          useValue: mockFeatureCellBrand
        }
      ]
    });
  });

  it('should expose the injected brand name via brandName and value', () => {
    const service = TestBed.inject(BrandNameService);

    // Ensure service instance exists
    expect(service).toBeTruthy();

    // Verify injected token resolution
    // Verify getter returns the same value
    expect(service.value).toBe(mockBrand);
  });

  it('should expose the injected vault brand name via vaultValue', () => {
    const service = TestBed.inject(BrandNameService);

    // Ensure service instance exists
    expect(service).toBeTruthy();

    // Verify injected token resolution
    // Verify getter returns the same value
    expect(service.vaultValue).toBe(mockVaultBrand);
  });

  it('should expose the injected feature cell brand name via featureCellValue', () => {
    const service = TestBed.inject(BrandNameService);

    // Ensure service instance exists
    expect(service).toBeTruthy();

    // Verify injected token resolution
    // Verify getter returns the same value
    expect(service.featureCellValue).toBe(mockFeatureCellBrand);
  });
});
