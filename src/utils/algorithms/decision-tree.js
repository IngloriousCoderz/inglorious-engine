export function decide(tree, state) {
  if (!tree.test) {
    return tree
  }

  const value = tree.test(state)

  if (value && tree.true) {
    return decide(tree.true(state), state)
  } else if (!value && tree.false) {
    return decide(tree.false(state), state)
  }
}
