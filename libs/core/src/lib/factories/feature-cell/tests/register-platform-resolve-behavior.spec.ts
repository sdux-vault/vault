import {
  BehaviorClassContext,
  BehaviorClassContract,
  BehaviorContext,
  BehaviorTypes,
  PipelineUpstreamValue,
  ResolveBehaviorContract,
  ResolveTypes
} from '@sdux-vault/shared';
import {
  getPlatformBehaviors,
  registerPlatformBehavior,
  resetPlatformBehaviorsForTests
} from '../../../utils/platform-registry.util';

class MockPlatformResolveBehavior implements ResolveBehaviorContract<unknown> {
  static readonly type = BehaviorTypes.Resolve;
  static readonly key = 'SDUX::Behavior::Resolve::MockPlatform';
  static readonly critical = false;
  static readonly resolveType = ResolveTypes.HttpResource;

  readonly type = MockPlatformResolveBehavior.type;
  readonly critical = MockPlatformResolveBehavior.critical;
  readonly key: string;
  resolveType = MockPlatformResolveBehavior.resolveType;

  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  async computeResolve(
    _ctx: BehaviorContext<unknown>
  ): Promise<PipelineUpstreamValue<unknown>> {
    return undefined;
  }

  destroy(): void {}
  reset(): void {}
}

describe('Factory: FeatureCell platform resolve integration', () => {
  afterEach(() => {
    resetPlatformBehaviorsForTests();
  });

  it('should include registered platform behaviors in getPlatformResolveBehaviors', () => {
    registerPlatformBehavior(
      BehaviorTypes.Resolve,
      MockPlatformResolveBehavior as unknown as BehaviorClassContract,
      ResolveTypes.HttpResource
    );

    const behaviors = [...getPlatformBehaviors()];
    expect(behaviors).toContain(
      MockPlatformResolveBehavior as unknown as BehaviorClassContract
    );
  });

  it('should return an empty iterator when no platform behaviors are registered', () => {
    const behaviors = [...getPlatformBehaviors()];
    expect(behaviors.length).toBe(0);
  });
});
