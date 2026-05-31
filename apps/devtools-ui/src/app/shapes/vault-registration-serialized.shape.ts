import type {
  VaultRegistrationEntityShape,
  VaultRegistrationFluentApiShape
} from '@sdux-vault/shared';

/**
 * Serialized snapshot of a FeatureCell registration record.
 *
 * Unlike {@link VaultRegistrationShape}, behaviors and controllers are
 * represented as arrays rather than Maps, making this shape safe for
 * JSON serialization and message-passing across contexts (e.g. the
 * Chrome extension bridge).
 */
export interface VaultRegistrationSerializedShape {
  /** Unique key identifying the registered FeatureCell. */
  key: string;

  /** Whether all behaviors have completed registration. */
  behaviorsRegistered: boolean;

  /** Whether all controllers have completed registration. */
  controllersRegistered: boolean;

  /** Read-only snapshot of fluent API registration counts. */
  fluentApis: Readonly<VaultRegistrationFluentApiShape> | null;

  /** Serialized behavior entities. */
  behaviors: VaultRegistrationEntityShape[];

  /** Serialized controller entities. */
  controllers: VaultRegistrationEntityShape[];
}
