/**
 * A pure reducer function used by the Vault pipeline.
 *
 * A `ReducerFunction` receives the current pipeline value and must return
 * a new pipeline value of the same type. Reducers should be pure and must
 * not mutate the input. They are executed during the reducer stage of the
 * pipeline and are responsible for producing deterministic, immutable
 * state transitions.
 *
 * @typeParam T - The state slice or model type being reduced.
 * @param current - The current state value before applying the reducer.
 * @returns The next state value after transformation.
 */
export type ReducerFunction<T> = (current: T) => T;
