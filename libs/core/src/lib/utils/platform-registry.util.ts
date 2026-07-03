import {
  BehaviorClassContract,
  BehaviorType,
  BehaviorTypes,
  isDefined,
  ResolveType,
  ResolveTypes,
  vaultWarn
} from '@sdux-vault/shared';

/** Platform behaviors registered via registerPlatformBehavior. */
const platformBehaviors: Map<string, BehaviorClassContract> = new Map();

/** Resolve types reserved by the core pipeline that cannot be overridden. */
const CORE_RESERVED_RESOLVE_TYPES: ReadonlySet<ResolveType> = new Set([
  ResolveTypes.Value,
  ResolveTypes.Promise,
  ResolveTypes.Observable
]);

/** Behavior types currently accepted by the platform registry. */
const ALLOWED_BEHAVIOR_TYPES: ReadonlySet<BehaviorType> = new Set([
  BehaviorTypes.Resolve
]);

/** Resolve types currently accepted by the platform registry. */
const ALLOWED_RESOLVE_TYPES: ReadonlySet<ResolveType> = new Set([
  ResolveTypes.HttpResource
]);

/**
 * Registers a platform-specific behavior so it is included in every
 * Feature Cell's default behavior set.
 *
 * Currently restricted to Resolve behaviors with HttpResource resolve
 * type. Additional types may be allowed in future releases.
 *
 * @param type - The pipeline stage this behavior participates in.
 * @param behaviorClass - The behavior class contract decorated with VaultBehavior.
 * @param resolveType - Resolve type this behavior handles (resolve behaviors only).
 */
export function registerPlatformBehavior<T>(
  type: BehaviorType,
  behaviorClass: BehaviorClassContract<T>,
  resolveType?: ResolveType
): void {
  if (!ALLOWED_BEHAVIOR_TYPES.has(type)) {
    throw new Error(
      `registerPlatformBehavior: type "${type}" is not currently supported.`
    );
  }

  if (behaviorClass.type !== type) {
    throw new Error(
      `registerPlatformBehavior: behaviorClass.type must be "${type}", received "${behaviorClass.type}".`
    );
  }

  if (resolveType !== undefined) {
    /* istanbul ignore if -- defensive guard; ALLOWED_BEHAVIOR_TYPES currently only contains Resolve */
    if (type !== BehaviorTypes.Resolve) {
      throw new Error(
        `registerPlatformBehavior: resolveType can only be provided when type is "${BehaviorTypes.Resolve}", received "${type}".`
      );
    }

    if (CORE_RESERVED_RESOLVE_TYPES.has(resolveType)) {
      throw new Error(
        `registerPlatformBehavior: resolveType "${resolveType}" is reserved by the core pipeline.`
      );
    }

    if (!ALLOWED_RESOLVE_TYPES.has(resolveType)) {
      throw new Error(
        `registerPlatformBehavior: resolveType "${resolveType}" is not currently supported.`
      );
    }

    const classResolveType = (
      behaviorClass as BehaviorClassContract<T> & { resolveType?: ResolveType }
    ).resolveType;
    if (isDefined(classResolveType) && classResolveType !== resolveType) {
      throw new Error(
        `registerPlatformBehavior: resolveType "${resolveType}" does not match behaviorClass metadata "${String(classResolveType)}".`
      );
    }
  }

  const registryKey = resolveType ?? behaviorClass.key;

  if (platformBehaviors.has(registryKey)) {
    vaultWarn(
      `registerPlatformBehavior: "${registryKey}" is already registered. Skipping duplicate.`
    );
    return;
  }

  platformBehaviors.set(registryKey, behaviorClass);
}

/**
 * Returns the registered platform behaviors.
 *
 * @returns An iterable of platform behavior class contracts.
 */
export function getPlatformBehaviors(): IterableIterator<BehaviorClassContract> {
  return platformBehaviors.values();
}

/**
 * Clears the platform behavior registry for test isolation.
 */
export function resetPlatformBehaviorsForTests(): void {
  platformBehaviors.clear();
}
