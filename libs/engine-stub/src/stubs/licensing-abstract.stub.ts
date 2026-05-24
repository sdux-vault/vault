import { LicensableClassContext } from '@sdux-vault/shared';

/** Stub abstract class that simulates the licensing lifecycle for tests. */
export abstract class LicensingAbstract<_T> {
  /** Whether this class requires a license. */
  static readonly needsLicense: boolean;
  /** Unique key identifying this licensable class. */
  static readonly key: string;

  /**
   * Creates a stub licensing instance.
   *
   * @param _ctx - The licensable class context.
   */
  constructor(_ctx: LicensableClassContext) {}

  /**
   * Stub handler invoked when the license validity changes.
   *
   * @param _valid - Whether the license is valid.
   */
  validateLicense(_valid: boolean): void {}
}
