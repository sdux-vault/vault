import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { LicensingAbstract, vaultSettled } from '@sdux-vault/engine';
import {
  BehaviorClassContext,
  BehaviorTypes,
  defineBehaviorKey,
  VaultBehavior,
  VaultConfig
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { getBankEmployeeData } from '../../structure/data/bank-employee.data';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { verifyAllEmployees } from '../../structure/utils/verify-all-employees.util';
import { PartialCoreBehaviorLicenseService } from './partial-core-behavior-license.service';
import { p423Snapshot } from './snap-shots/p423-core-behavior-licensing.bypass-licensing.snapshot';

@VaultBehavior({
  type: BehaviorTypes.Operator,
  key: defineBehaviorKey('Custom', 'Noop'),
  critical: false,
  needsLicense: true,
  licenseId: 'second-license'
})
class WithCustomNoopBehavior extends LicensingAbstract<any> {
  type = BehaviorTypes.Operator;
  key: string;
  critical = false;

  constructor(key: string, behaviorCtx: BehaviorClassContext) {
    super(behaviorCtx);
    this.key = key;
    this.validateLicense(false);
  }

  async applyOperator(value: unknown): Promise<unknown> {
    return value;
  }
}

describe('p423: Core Behavior License - Bypass Licensing', () => {
  const key = 'partial-core-behavior-license';
  let testService: PartialCoreBehaviorLicenseService;
  let stopListening: () => void;

  const emitted: any[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideVaultTesting({
          devMode: true,
          bypassLicensing: true,
          licenses: [
            getSDuXVaultLicense(),
            Object({
              licenseId: 'second-license',
              payload: 'some-license-token'
            })
          ]
        } as VaultConfig),
        PartialCoreBehaviorLicenseService,
        provideZonelessChangeDetection(),
        provideFeatureCell(
          PartialCoreBehaviorLicenseService,
          {
            key,
            initialState: null,
            insights: {} as any
          },
          [WithCustomNoopBehavior as any]
        )
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
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p423Snapshot);
  });
});
