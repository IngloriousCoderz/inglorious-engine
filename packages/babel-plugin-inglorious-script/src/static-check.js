// Helper function to check if a node is a vector.
// It traces a variable back to its declaration to see if it was created with `v()`.
export function isVector(node, scope) {
  if (!node) {
    return false
  }

  // Case 1: The node is a direct call to v(), e.g., v(1, 2) + v(3, 4)
  if (
    node.type === "CallExpression" &&
    node.callee &&
    node.callee.name === "v"
  ) {
    return true
  }

  // Case 2: The node is an identifier (a variable).
  if (node.type === "Identifier") {
    const binding = scope.getBinding(node.name)
    if (!binding) {
      return false
    }

    const bindingNode = binding.path.node

    // Case 2a: The variable is an import. We can't know its type for sure,
    // but we can infer it from how it's used in an expression.
    if (bindingNode.type === "ImportSpecifier") {
      return true // Assume it could be a vector.
    }

    // Case 2b: The variable is a local declaration, e.g., `const myVec = v(1, 2)`.
    // We recursively check its initializer.
    if (bindingNode.init) {
      return isVector(bindingNode.init, scope)
    }
  }

  // Case 3: Member expressions (obj.prop, obj['prop'])
  // We assume that if we can't determine the type, it might be a vector
  if (node.type === "MemberExpression") {
    return true // Conservative assumption - treat as potential vector, let runtime handle it
  }

  // Case 4: The node is a binary expression. We check the rules for each operator
  // to see if the result would be a vector. This allows for chaining operations.
  if (node.type === "BinaryExpression") {
    const { operator, left, right } = node
    const leftIsVector = isVector(left, scope)
    const rightIsVector = isVector(right, scope)

    // vec + vec -> vec, vec - vec -> vec
    if (operator === "+" || operator === "-") {
      return leftIsVector && rightIsVector
    }

    // vec * scalar -> vec, scalar * vec -> vec
    if (operator === "*") {
      return (
        (leftIsVector && !rightIsVector) || (!leftIsVector && rightIsVector)
      )
    }

    // vec / scalar -> vec, vec % scalar -> vec, vec ** scalar -> vec
    if (["/", "%", "**"].includes(operator)) {
      return leftIsVector && !rightIsVector
    }
  }

  // Case 5: The node is a unary expression that results in a vector.
  // This allows chaining: -v1 + v2
  if (node.type === "UnaryExpression" && node.operator === "-") {
    return isVector(node.argument, scope)
  }

  return false
}
