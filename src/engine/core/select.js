/**
 * Creates a memoized selector function.
 * NB: this implementation does not support spreading the input selectors for clarity, please just put them in an array.
 * @param {Array<Function>} inputSelectors - An array of input selector functions.
 * @param {Function} resultFunc - A function that receives the results of the input selectors and returns a computed value.
 * @returns {Function} A memoized selector function that, when called, returns the selected state.
 */
export function createSelector(inputSelectors, resultFunc) {
  let lastInputs = []
  let lastResult = null

  return (state) => {
    const nextInputs = inputSelectors.map((selector) => selector(state))
    const inputsChanged =
      lastInputs.length !== nextInputs.length ||
      nextInputs.some((input, index) => input !== lastInputs[index])

    if (!inputsChanged) {
      return lastResult
    }

    lastInputs = nextInputs
    lastResult = resultFunc(...nextInputs)
    return lastResult
  }
}
