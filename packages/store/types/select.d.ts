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
 * Creates a memoized selector function.
 * @param inputSelectors - An array of input selector functions.
 * @param resultFunc - A function that receives the results of the input selectors and returns a computed value.
 * @returns A memoized selector function that, when called, returns the selected state.
 */
export function createSelector<TState = any, TResult = any>(
  inputSelectors: InputSelector<TState, any>[],
  resultFunc: (...args: any[]) => TResult,
): OutputSelector<TState, TResult>
