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
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialCoreBehaviorLicenseService } from './partial-core-behavior-license.service';
import { p426Snapshot } from './snap-shots/p426-core-behavior-licensing.multiple.error.snapshot';

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

describe('p426: Core Behavior License - Multiple Error', () => {
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
    testService.clearGlobalErrors();
  });

  it('should replace the bank employees', async () => {
    let state = testService.getState();

    testService.vault.replaceState(Object({ value: getBankEmployeeData() }));
    await vaultSettled(key);

    expect(state.isLoading()).toBeFalse();
    expect(state.error()).toBeNull();

    expect(state.value()).toBeUndefined();
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p426Snapshot);
  });
});
