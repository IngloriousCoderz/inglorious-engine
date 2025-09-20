const { addNamed } = require("@babel/helper-module-imports")

// The main plugin function.
module.exports = function (babel) {
  const { types: t } = babel

  return {
    name: "inglorious-script",
    visitor: {
      BinaryExpression(path) {
        const { operator, left, right } = path.node
        const scope = path.scope

        const isLeftVector = isVector(left, scope)
        const isRightVector = isVector(right, scope)

        // --- Vector Addition / Subtraction: v1 + v2 or v1 - v2 ---
        if (
          (operator === "+" || operator === "-") &&
          isLeftVector &&
          isRightVector
        ) {
          const functionName = operator === "+" ? "sum" : "subtract"
          const importSource = "@inglorious/utils/math/vectors.js"

          // Import the 'sum' or 'subtract' function.
          const funcIdentifier = addNamed(path, functionName, importSource)

          // Replace the expression with a function call.
          path.replaceWith(t.callExpression(funcIdentifier, [left, right]))
        }

        // --- Vector Scaling: v1 * s  or  s * v1 ---
        if (operator === "*") {
          let vector, scalar

          if (isLeftVector && !isRightVector) {
            vector = left
            scalar = right
          } else if (!isLeftVector && isRightVector) {
            vector = right
            scalar = left
          } else {
            // Not a vector-scalar multiplication, so we do nothing.
            return
          }

          // Import the 'scale' function.
          const scaleIdentifier = addNamed(
            path,
            "scale",
            "@inglorious/utils/math/vector.js",
          )

          // Replace the `*` expression with a call to `scale(vector, scalar)`.
          path.replaceWith(t.callExpression(scaleIdentifier, [vector, scalar]))
        }
      },
    },
  }
}

// Helper function to check if a node is a vector.
// It traces a variable back to its declaration to see if it was created with `v()`.
function isVector(node, scope) {
  if (!node) {
    return false
  }

  // Case 1: The node is a direct call to v(), e.g., v(1, 2) + v(3, 4)
  if (node.type === "CallExpression" && node.callee.name === "v") {
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

  // Case 3: The node is a binary expression that results in a vector.
  // This allows chaining: v1 + v2 + v3
  if (
    node.type === "BinaryExpression" &&
    (node.operator === "+" || node.operator === "-")
  ) {
    return isVector(node.left, scope) && isVector(node.right, scope)
  }

  // Case 4: The node is a multiplication that results in a vector.
  // This allows chaining: v1 * s + v2
  // Fixed: More precise logic - multiplication results in vector only if exactly one operand is a vector
  if (node.type === "BinaryExpression" && node.operator === "*") {
    const leftIsVector = isVector(node.left, scope)
    const rightIsVector = isVector(node.right, scope)
    // Vector multiplication only results in a vector if one operand is vector, one is scalar
    return (leftIsVector && !rightIsVector) || (!leftIsVector && rightIsVector)
  }

  return false
}
