import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { vaultSettled } from '@sdux-vault/engine';
import { VaultConfig } from '@sdux-vault/shared';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialCoreBehaviorLicenseService } from './partial-core-behavior-license.service';
import { p420Snapshot } from './snap-shots/p420-core-behavior-licensing.snapshot';

describe('p420: Core Behavior License - Success', () => {
  const key = 'partial-core-behavior-license';
  let testService: PartialCoreBehaviorLicenseService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: false,
          licenses: [getSDuXVaultLicense()]
        } as VaultConfig),
        PartialCoreBehaviorLicenseService,
        provideZonelessChangeDetection(),
        provideFeatureCell(PartialCoreBehaviorLicenseService, {
          key,
          initialState: null,
          insights: {} as any
        })
      ]
    });

    stopListening = createTestInsightListener(emitted);

    testService = TestBed.inject(PartialCoreBehaviorLicenseService);
    testService.initialize();
  });

  afterEach(() => {
    stopListening();
  });

  it('should replace the bank employees', async () => {
    let state = testService.getState();
    await vaultSettled(key);

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withDebounce applied in order
    verifyAllEmployees(state.value());

    testService.vault.replaceState(
      getBankEmployeeData(1, true) as BankEmployeeShape[]
    );
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    // Assert — both withDebounce applied in order
    expect(state.value()).toEqual([
      Object({
        id: 'be-002',
        firstName: 'Brian',
        lastName: 'Stone',
        role: 'Manager',
        status: 'Vacation',
        salary: 90000,
        hireDate: '2012-09-05',
        birthDate: '1981-04-17',
        phoneNumber: '555-490-3322',
        address: Object({
          street: '54 Ridgeview Ave',
          city: 'Springfield',
          state: 'IL',
          zip: '62711'
        })
      })
    ]);
  });

  it('should have the correct insight events', async () => {
    await vaultSettled(key);
    expectMonitorSnapshot(emitted, p420Snapshot);
  });
});
