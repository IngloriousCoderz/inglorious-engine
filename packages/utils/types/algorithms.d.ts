/**
 * Represents the input conditions to be evaluated by a decision tree node.
 * The `unknown` type is used to allow for flexible condition structures.
 */
export type Conditions = unknown

/**
 * Represents the result of a decision tree's `test` function, which is used
 * as a key to determine the next branch.
 */
export type Outcome = string

/**
 * Represents a node in a decision tree. It consists of:
 * - A `test` function that evaluates conditions and returns an outcome.
 * - A map of outcomes to subsequent actions, which can be either a final outcome
 *   or another `DecisionTree` node.
 */
export type DecisionTree = {
  /**
   * A function that takes a set of conditions and returns an outcome string.
   * @param conditions - The conditions to evaluate.
   * @returns The outcome of the test.
   */
  test: (conditions: Conditions) => Outcome
} & Record<Outcome, () => Outcome | DecisionTree>
