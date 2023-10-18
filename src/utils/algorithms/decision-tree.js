export function decide(tree, state) {
  if (!tree.test) {
    return tree
  }

  const value = tree.test(state)

  return tree[value] && decide(tree[value](state), state)
}
