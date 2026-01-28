/**
 * Input selector function that takes state and returns a value
 */
export type InputSelector<TState = any, TResult = any> = (
  state: TState,
) => TResult

/**
 * Output selector function (memoized)
 */
export type OutputSelector<TState = any, TResult = any> = (
  state: TState,
) => TResult

/**
 * Creates a memoized derived computation from input selectors.
 */
export function compute<TState, TInputs extends readonly unknown[], TResult>(
  resultFunc: (...args: TInputs) => TResult,
  inputSelectors: {
    [K in keyof TInputs]: InputSelector<TState, TInputs[K]>
  },
): OutputSelector<TState, TResult>

/**
 * Redux-compatible alias for `compute`.
 * Prefer `compute` in new code.
 */
export function createSelector<
  TState,
  TInputs extends readonly unknown[],
  TResult,
>(
  inputSelectors: {
    [K in keyof TInputs]: InputSelector<TState, TInputs[K]>
  },
  resultFunc: (...args: TInputs) => TResult,
): OutputSelector<TState, TResult>
