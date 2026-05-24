import { VAULT_CLEAR_STATE } from '../../constants/vault/vault-clear-state.constant';
import { VAULT_CONTINUE } from '../../constants/vault/vault-continue.constant';
import { VAULT_NOOP } from '../../constants/vault/vault-noop.constant';
import { StateInputShape } from '../../shapes/state/state-input.shape';
import { FinalState } from '../../types/state/final-state.type';

/**
 * Indicates whether a final pipeline value represents a NOOP condition.
 *
 * @param current - The computed pipeline result.
 * @returns `true` if the value is the `VAULT_NOOP` sentinel.
 */
export const isVaultNoop = <T>(current: FinalState<T>): boolean => {
  return current === VAULT_NOOP;
};

/**
 * Indicates whether a final pipeline value represents the clear-state sentinel.
 *
 * @param current - The computed pipeline result.
 * @returns `true` if the value is the `VAULT_CLEAR_STATE` sentinel.
 */
export const isVaultClearState = <T>(current: FinalState<T>): boolean => {
  return current === VAULT_CLEAR_STATE;
};

/**
 * Indicates whether a final pipeline value represents the continue sentinel.
 *
 * @param current - The computed pipeline result.
 * @returns `true` if the value is the `VAULT_CONTINUE` sentinel.
 */
export const isVaultContinue = <T>(current: FinalState<T>): boolean => {
  return current === VAULT_CONTINUE;
};

/**
 * Checks whether a value is exactly `null`.
 *
 * @param current - The value to check.
 * @returns `true` if the value is `null`.
 */
export const isNull = (current: unknown): current is null => current === null;

/**
 * Checks whether a value is exactly `undefined`.
 *
 * @param current - The value to check.
 * @returns `true` if the value is `undefined`.
 */
export const isUndefined = (current: unknown): current is undefined =>
  current === undefined;

/**
 * Determines whether a value is defined (not `undefined`).
 * Note: This intentionally does *not* exclude `null`.
 *
 * @param current - The value to check.
 * @returns `true` if the value is not `undefined`.
 */
export const isDefined = (current: unknown): boolean => !isUndefined(current);

/**
 * Determines whether a value is nullish — meaning either `null` or `undefined`.
 *
 * @param current - The value to inspect.
 * @returns `true` for `null` or `undefined`, otherwise `false`.
 */
export const isNullish = (current: unknown): current is null | undefined =>
  current == null;

/**
 * Determines whether a value is a function.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a function.
 */
export const isFunction = (
  value: unknown
): // eslint-disable-next-line
value is (...args: any[]) => unknown => typeof value === 'function';

/**
 * Determines whether a value is a non-null object.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an object and not null.
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Determines whether a value is a plain object with no custom prototype.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a plain object.
 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false;

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/**
 * Determines whether a value conforms to the StateInputShape contract.
 *
 * @param value - The value to inspect.
 * @returns `true` if the value is a plain object with recognized state keys or is empty.
 */
export const isStateInputShape = <T>(
  value: unknown
): value is StateInputShape<T> => {
  if (!isPlainObject(value)) return false;

  const v = value as Record<string, unknown>;

  const hasKnownKey =
    Object.prototype.hasOwnProperty.call(v, 'loading') ||
    Object.prototype.hasOwnProperty.call(v, 'value') ||
    Object.prototype.hasOwnProperty.call(v, 'error');

  const isEmptyObject = Object.keys(v).length === 0;

  return hasKnownKey || isEmptyObject;
};
