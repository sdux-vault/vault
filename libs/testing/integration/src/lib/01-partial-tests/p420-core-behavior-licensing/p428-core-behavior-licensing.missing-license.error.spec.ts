import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFeatureCell, provideVaultTesting } from '@sdux-vault/angular';
import { LicensingAbstract } from '@sdux-vault/engine';
import {
  BehaviorClassContext,
  BehaviorTypes,
  defineBehaviorKey,
  VaultBehavior,
  VaultConfig
} from '@sdux-vault/shared';
import { flushVaultPipeline } from '../../../../../utils/src/public-api';
import { getSDuXVaultLicense } from '../../structure/data/sdux-vault.license';
import { createTestInsightListener } from '../../structure/utils/create-test-insight-listener.util';
import { expectMonitorSnapshot } from '../../structure/utils/expect-monitor-snapshot.util';
import { PartialCoreBehaviorLicenseService } from './partial-core-behavior-license.service';
import { p428Snapshot } from './snap-shots/p428-core-behavior-licensing.missing-license.error.snapshot';

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
    this.validateLicense(true);
  }

  async applyOperator(value: unknown): Promise<unknown> {
    return value;
  }
}

describe('p428: Core Behavior License - Missing License Error', () => {
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
          licenseTimeoutMs: 100,
          licenses: [getSDuXVaultLicense()]
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
  });

  afterEach(() => {
    stopListening();
  });

  it('should throw an error when initializing without a license', async () => {
    expect(() => testService.initialize()).toThrowError(
      '[vault] License "second-license" required by behavior "SDUX::Behavior::Custom::Noop" is not registered in Vault config.'
    );
  });

  it('should have the correct insight events', async () => {
    await flushVaultPipeline();
    expectMonitorSnapshot(emitted, p428Snapshot);
  });
});
