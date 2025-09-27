import { addNamed } from "@babel/helper-module-imports"

const VECTOR_MODULE = "@inglorious/utils/math/vector.js"
const V_MODULE = "@inglorious/utils/v.js"

const helperConfig = {
  __vectorSum: { operator: "+", type: "vec_op_vec" },
  __vectorSubtract: { operator: "-", type: "vec_op_vec" },
  __vectorScale: { operator: "*", type: "vec_op_scalar_commutative" },
  __vectorDivide: { operator: "/", type: "vec_op_scalar" },
  __vectorMod: { operator: "%", type: "vec_op_scalar" },
  __vectorPower: { operator: "**", type: "vec_op_scalar" },
}

/**
 * Injects the necessary helper functions and imports into the program body.
 * This function is called at the end of the program traversal.
 * @param {import("@babel/core")} babel The Babel core object.
 * @param {import("@babel/traverse").NodePath<import("@babel/types").Program>} programPath The path to the Program node.
 * @param {Map<string, {originalFunction: string, module: string}>} helpers A map of helper configurations to be injected.
 */
export function injectHelpers(babel, programPath, helpers) {
  const { types: t } = babel

  let hasVCalls = false

  programPath.traverse({
    CallExpression(path) {
      if (t.isIdentifier(path.node.callee, { name: "v" })) {
        hasVCalls = true
        path.stop()
      }
    },
  })

  if (hasVCalls) {
    const vId = addNamed(programPath, "v", V_MODULE)

    programPath.traverse({
      CallExpression(path) {
        if (t.isIdentifier(path.node.callee, { name: "v" })) {
          path.node.callee = t.cloneNode(vId)
        }
      },
    })
  }

  let isVectorId = null

  if (helpers.size) {
    isVectorId = addNamed(programPath, "isVector", VECTOR_MODULE)
  }

  const helperFunctions = Array.from(helpers.entries()).map(
    ([helperName, { originalFunction, module }]) => {
      const importId = addNamed(programPath, originalFunction, module)
      const config = helperConfig[helperName]

      return createHelper(
        t,
        helperName,
        config.operator,
        importId,
        isVectorId,
        config.type,
      )
    },
  )

  programPath.unshiftContainer("body", helperFunctions)
}

/**
 * Creates the AST for a helper function that performs a vector operation.
 * The generated function checks if the operands are vectors or numbers and either
 * calls the specialized vector function or falls back to the standard binary operator.
 * @param {import("@babel/core").types} t The Babel types object.
 * @param {string} helperName The name for the generated function (e.g., `__vectorSum`).
 * @param {string} operator The fallback binary operator (e.g., `+`).
 * @param {import("@babel/types").Identifier} importId The identifier for the imported vector function (e.g., `_sum`).
 * @param {import("@babel/types").Identifier} isVectorId The identifier for the `isVector` helper.
 * @param {'vec_op_vec' | 'vec_op_scalar' | 'vec_op_scalar_commutative'} type The type of operation to generate.
 * @returns {import("@babel/types").FunctionDeclaration} The AST for the generated helper function.
 */
function createHelper(t, helperName, operator, importId, isVectorId, type) {
  const a = t.identifier("a")
  const b = t.identifier("b")

  const isAVector = t.logicalExpression(
    "&&",
    a,
    t.callExpression(isVectorId, [a]),
  )
  const isBVector = t.logicalExpression(
    "&&",
    b,
    t.callExpression(isVectorId, [b]),
  )
  const isANumber = t.binaryExpression(
    "===",
    t.unaryExpression("typeof", a),
    t.stringLiteral("number"),
  )
  const isBNumber = t.binaryExpression(
    "===",
    t.unaryExpression("typeof", b),
    t.stringLiteral("number"),
  )

  const statements = []

  /**
   * Generates:
   * if (a && isVector(a) && b && isVector(b)) {
   *   return importId(a, b);
   * }
   *
   * Used for: vec + vec, vec - vec
   */
  if (type === "vec_op_vec") {
    statements.push(
      t.ifStatement(
        t.logicalExpression("&&", isAVector, isBVector),
        t.returnStatement(t.callExpression(importId, [a, b])),
      ),
    )
    /**
     * Generates:
     * if (a && isVector(a) && typeof b === "number") {
     *   return importId(a, b);
     * }
     *
     * Used for: vec / s, vec % s, vec ** s
     */
  } else if (type === "vec_op_scalar") {
    statements.push(
      t.ifStatement(
        t.logicalExpression("&&", isAVector, isBNumber),
        t.returnStatement(t.callExpression(importId, [a, b])),
      ),
    )
    /**
     * Generates:
     * if (a && isVector(a) && typeof b === "number") {
     *   return importId(a, b);
     * }
     * if (typeof a === "number" && b && isVector(b)) {
     *   return importId(b, a);
     * }
     *
     * Used for: vec * s, s * vec
     */
  } else if (type === "vec_op_scalar_commutative") {
    statements.push(
      t.ifStatement(
        t.logicalExpression("&&", isAVector, isBNumber),
        t.returnStatement(t.callExpression(importId, [a, b])),
      ),
      t.ifStatement(
        t.logicalExpression("&&", isANumber, isBVector),
        t.returnStatement(t.callExpression(importId, [b, a])),
      ),
    )
  }

  statements.push(t.returnStatement(t.binaryExpression(operator, a, b)))

  return t.functionDeclaration(
    t.identifier(helperName),
    [a, b],
    t.blockStatement(statements),
  )
}
