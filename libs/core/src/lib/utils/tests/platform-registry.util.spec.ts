import {
  BehaviorClassContext,
  BehaviorClassContract,
  BehaviorContext,
  BehaviorTypes,
  LogLevelTypes,
  PipelineUpstreamValue,
  ResolveBehaviorContract,
  ResolveTypes,
  setVaultLogLevel
} from '@sdux-vault/shared';
import {
  registerPlatformBehavior,
  resetPlatformBehaviorsForTests
} from '../platform-registry.util';

class MockPlatformBehavior implements ResolveBehaviorContract<unknown> {
  static readonly type = BehaviorTypes.Resolve;
  static readonly key = 'SDUX::Behavior::Resolve::MockPlatform';
  static readonly critical = false;
  static readonly resolveType = ResolveTypes.HttpResource;

  readonly type = MockPlatformBehavior.type;
  readonly critical = MockPlatformBehavior.critical;
  readonly key: string;
  resolveType = MockPlatformBehavior.resolveType;

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

class MockFilterBehavior {
  static readonly type = BehaviorTypes.Filter;
  static readonly key = 'SDUX::Behavior::Filter::MockFilter';
  static readonly critical = false;

  readonly type = MockFilterBehavior.type;
  readonly critical = MockFilterBehavior.critical;
  readonly key: string;

  constructor(
    key: string,
    readonly behaviorCtx: BehaviorClassContext
  ) {
    this.key = key;
  }

  destroy(): void {}
  reset(): void {}
}

describe('Util: registerPlatformBehavior', () => {
  afterEach(() => {
    resetPlatformBehaviorsForTests();
  });

  it('should register a platform resolve behavior without throwing', () => {
    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        MockPlatformBehavior as unknown as BehaviorClassContract,
        ResolveTypes.HttpResource
      )
    ).not.toThrow();
  });

  it('should throw when the behavior type is not currently supported', () => {
    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Filter,
        MockFilterBehavior as unknown as BehaviorClassContract
      )
    ).toThrowError(
      `registerPlatformBehavior: type "${BehaviorTypes.Filter}" is not currently supported.`
    );
  });

  it('should throw when the behavior type does not match', () => {
    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        MockFilterBehavior as unknown as BehaviorClassContract,
        ResolveTypes.HttpResource
      )
    ).toThrowError(
      `registerPlatformBehavior: behaviorClass.type must be "${BehaviorTypes.Resolve}", received "${BehaviorTypes.Filter}".`
    );
  });

  it('should throw when resolveType is not currently supported', () => {
    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        MockPlatformBehavior as unknown as BehaviorClassContract,
        'custom-type' as any
      )
    ).toThrowError(
      'registerPlatformBehavior: resolveType "custom-type" is not currently supported.'
    );
  });

  it('should throw when the resolveType is reserved (Value)', () => {
    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        MockPlatformBehavior as unknown as BehaviorClassContract,
        ResolveTypes.Value
      )
    ).toThrowError(
      `registerPlatformBehavior: resolveType "${ResolveTypes.Value}" is reserved by the core pipeline.`
    );
  });

  it('should throw when the resolveType is reserved (Promise)', () => {
    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        MockPlatformBehavior as unknown as BehaviorClassContract,
        ResolveTypes.Promise
      )
    ).toThrowError(
      `registerPlatformBehavior: resolveType "${ResolveTypes.Promise}" is reserved by the core pipeline.`
    );
  });

  it('should throw when the resolveType is reserved (Observable)', () => {
    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        MockPlatformBehavior as unknown as BehaviorClassContract,
        ResolveTypes.Observable
      )
    ).toThrowError(
      `registerPlatformBehavior: resolveType "${ResolveTypes.Observable}" is reserved by the core pipeline.`
    );
  });

  it('should throw when the resolveType does not match the class metadata', () => {
    class MismatchedResolveBehavior {
      static readonly type = BehaviorTypes.Resolve;
      static readonly key = 'SDUX::Behavior::Resolve::Mismatched';
      static readonly critical = false;
      static readonly resolveType = 'some-other-type';
      readonly type = MismatchedResolveBehavior.type;
      readonly critical = MismatchedResolveBehavior.critical;
      readonly key: string;
      constructor(
        key: string,
        readonly behaviorCtx: BehaviorClassContext
      ) {
        this.key = key;
      }
      destroy(): void {}
      reset(): void {}
    }

    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        MismatchedResolveBehavior as unknown as BehaviorClassContract,
        ResolveTypes.HttpResource
      )
    ).toThrowError(
      `registerPlatformBehavior: resolveType "${ResolveTypes.HttpResource}" does not match behaviorClass metadata "some-other-type".`
    );
  });

  it('should warn and skip when the same resolveType is registered twice', () => {
    setVaultLogLevel(LogLevelTypes.Warn);
    spyOn(console, 'warn');

    registerPlatformBehavior(
      BehaviorTypes.Resolve,
      MockPlatformBehavior as unknown as BehaviorClassContract,
      ResolveTypes.HttpResource
    );

    registerPlatformBehavior(
      BehaviorTypes.Resolve,
      MockPlatformBehavior as unknown as BehaviorClassContract,
      ResolveTypes.HttpResource
    );

    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalled();
    setVaultLogLevel(LogLevelTypes.Off);
  });

  it('should allow registration when the class has no resolveType metadata', () => {
    class NoMetadataResolveBehavior {
      static readonly type = BehaviorTypes.Resolve;
      static readonly key = 'SDUX::Behavior::Resolve::NoMeta';
      static readonly critical = false;
      readonly type = NoMetadataResolveBehavior.type;
      readonly critical = NoMetadataResolveBehavior.critical;
      readonly key: string;
      constructor(
        key: string,
        readonly behaviorCtx: BehaviorClassContext
      ) {
        this.key = key;
      }
      destroy(): void {}
      reset(): void {}
    }

    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        NoMetadataResolveBehavior as unknown as BehaviorClassContract,
        ResolveTypes.HttpResource
      )
    ).not.toThrow();
  });

  it('should use behaviorClass.key as registryKey when resolveType is omitted', () => {
    expect(() =>
      registerPlatformBehavior(
        BehaviorTypes.Resolve,
        MockPlatformBehavior as unknown as BehaviorClassContract
      )
    ).not.toThrow();
  });
});
