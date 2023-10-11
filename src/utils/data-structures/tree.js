// @see https://medium.com/@adityakashyap_36551/javascript-tree-traversal-unveiling-data-structure-depths-5be256d54145

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
