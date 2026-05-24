import { Injectable } from '@angular/core';
import { FeatureCell, injectVault } from '@sdux-vault/angular';
import { LicensingAbstract } from '@sdux-vault/engine';
import {
  BehaviorClassContext,
  BehaviorContext,
  BehaviorContract,
  BehaviorType,
  BehaviorTypes,
  ControllerContract,
  ControllerType,
  ControllerTypes,
  ControllerVote,
  ControllerVotes,
  defineBehaviorKey,
  defineControllerKey,
  PipelineUpstreamValue,
  VaultBehavior,
  VaultController
} from '@sdux-vault/shared';
import { Observable, of } from 'rxjs';
import { PrimaryPartialAbstractClass } from '../../structure/services/primary-partial.abstract';
import { BankEmployeeShape } from '../../structure/shapes/bank-employee.shape';

@FeatureCell<BankEmployeeShape[]>('partial-licensing')
@Injectable({
  providedIn: 'root'
})
export class PartialLicensingService extends PrimaryPartialAbstractClass<
  BankEmployeeShape[]
> {
  constructor() {
    super(injectVault<BankEmployeeShape[]>(PartialLicensingService));
  }

  initialize(): void {
    this.vault.initialize();
  }
}

let instance: LicensingTestInstance | null = null;

export function LicensingTest(): LicensingTestInstance {
  if (!instance) {
    instance = new LicensingTestInstance();
  }

  return instance;
}

class LicensingTestInstance {
  #isValid = true;

  get isValid(): boolean {
    return this.#isValid;
  }

  set isValid(valid: boolean) {
    this.#isValid = valid;
  }
}

@VaultBehavior({
  type: BehaviorTypes.Merge,
  key: defineBehaviorKey('Test', 'Behavior'),
  critical: false,
  needsLicense: true,
  licenseId: 'sdux-vault'
})
export class withTestLicensingMerge<T>
  extends LicensingAbstract<T>
  implements BehaviorContract<T>
{
  /** Static behavior type used by the orchestrator. */
  static readonly type: BehaviorType;

  /** Indicates this behavior is required for merge processing. */
  static readonly critical = true;

  /** Instance-level merge behavior type identifier. */
  readonly type = withTestLicensingMerge.type;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Flags this behavior instance as critical within the pipeline. */
  readonly critical = withTestLicensingMerge.critical;

  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    super(behaviorCtx);
    this.key = key;

    this.validateLicense(LicensingTest().isValid);
  }

  computeMerge(
    currentValue: PipelineUpstreamValue<T> | undefined,
    nextValue: PipelineUpstreamValue<T> | undefined
  ): PipelineUpstreamValue<T> {
    const curr = currentValue;
    const next = nextValue;

    if (Array.isArray(curr) && Array.isArray(next)) {
      return [...next] as PipelineUpstreamValue<T>;
    }

    return next as PipelineUpstreamValue<T>;
  }

  destroy(_ctx?: BehaviorContext<T> | undefined): void {}
  reset(_ctx?: BehaviorContext<T> | undefined): void {}
}

@VaultController({
  type: ControllerTypes.Policy,
  key: defineControllerKey('Test', 'Controller'),
  critical: false,
  needsLicense: true,
  licenseId: 'sdux-vault'
})
export class withTestLicensingController<T>
  extends LicensingAbstract<T>
  implements ControllerContract<T>
{
  /** Static behavior type used by the orchestrator. */
  static readonly type: ControllerType;

  /** Indicates this behavior is required for merge processing. */
  static readonly critical = true;

  /** Instance-level merge behavior type identifier. */
  readonly type = withTestLicensingController.type;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Flags this behavior instance as critical within the pipeline. */
  readonly critical = withTestLicensingController.critical;

  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    super(behaviorCtx);
    this.key = key;

    this.validateLicense(LicensingTest().isValid);
  }

  handleMessage(): Observable<ControllerVote> {
    return of(ControllerVotes.Abstain);
  }

  destroy(_ctx?: BehaviorContext<T> | undefined): void {}
  reset(_ctx?: BehaviorContext<T> | undefined): void {}
}

@VaultBehavior({
  type: BehaviorTypes.Operator,
  key: defineBehaviorKey('Custom', 'Noop'),
  critical: false,
  needsLicense: true,
  licenseId: 'second-license'
})
export class withCustomNoopBehavior extends LicensingAbstract<any> {
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

@VaultController({
  type: ControllerTypes.Policy,
  key: defineControllerKey('Custom', 'Noop'),
  critical: false,
  needsLicense: true,
  licenseId: 'second-license'
})
export class withCustomNoopController<T>
  extends LicensingAbstract<T>
  implements ControllerContract<T>
{
  /** Static behavior type used by the orchestrator. */
  static readonly type: ControllerType;

  /** Indicates this behavior is required for merge processing. */
  static readonly critical = true;

  /** Instance-level merge behavior type identifier. */
  readonly type = withCustomNoopController.type;

  /** Unique identifier for this behavior instance. */
  readonly key: string;

  /** Flags this behavior instance as critical within the pipeline. */
  readonly critical = withCustomNoopController.critical;

  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    super(behaviorCtx);
    this.key = key;

    this.validateLicense(false);
  }

  handleMessage(): Observable<ControllerVote> {
    return of(ControllerVotes.Abstain);
  }

  destroy(_ctx?: BehaviorContext<T> | undefined): void {}
  reset(_ctx?: BehaviorContext<T> | undefined): void {}
}

@VaultBehavior({
  type: BehaviorTypes.Operator,
  key: defineBehaviorKey('Custom', 'Noop'),
  critical: false,
  needsLicense: true,
  licenseId: 'second-license'
})
export class withTimeoutBehavior extends LicensingAbstract<any> {
  type = BehaviorTypes.Operator;
  key: string;
  critical = false;

  constructor(key: string, behaviorCtx: BehaviorClassContext) {
    super(behaviorCtx);
    this.key = key;
    setTimeout(() => {
      throw new Error('License validation timed out');
    }, 5000);
  }

  async applyOperator(value: unknown): Promise<unknown> {
    return value;
  }
}
