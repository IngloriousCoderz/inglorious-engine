export function bfs(tree) {
  const result = []
  const queue = [tree]

  while (queue.length) {
    const node = queue.shift()
    result.push(node.value)
    if (node.children) {
      queue.push(...node.children)
    }
  }

  return result
}

export function dfs(tree) {
  const result = [tree.value]

  if (tree.children) {
    result.push(...tree.children.flatMap(dfs))
  }

  return result
}
