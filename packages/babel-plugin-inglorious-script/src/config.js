const VECTORS_MODULE = "@inglorious/utils/math/vectors.js"
const VECTOR_MODULE = "@inglorious/utils/math/vector.js"

/**
 * @typedef {'vec_op_vec' | 'vec_op_scalar' | 'vec_op_scalar_commutative'} HelperType
 * @typedef {'vec_op_vec' | 'vec_op_scalar' | 'vec_op_scalar_commutative' | 'vec_op_mixed'} HelperType
 * The type of vector operation, which determines the runtime checks and logic of the generated helper function.
 * - `vec_op_vec`: Vector-vector operation (e.g., `v + v`).
 * - `vec_op_scalar`: Vector-scalar operation where the vector must be the left operand (e.g., `v / s`).
 * - `vec_op_scalar_commutative`: Vector-scalar operation where operands can be swapped (e.g., `v * s` or `s * v`).
 */

/**
 * @typedef {object} OperatorConfig
 * @property {string} helperName The name for the generated runtime helper function (e.g., `__vectorSum`).
 * @property {HelperType} type The type of vector operation.
 * @property {string} originalFunction The name of the function to import from the specified module (e.g., `sum`).
 * @property {string} module The module path from which to import the vector operation function.
 * @property {string} [error] An optional error message to throw for statically-determined invalid operations (e.g., `v * v`).
 */

/** @type {Object<string, OperatorConfig>} */
export const Config = {
  "+": {
    helperName: "__vectorSum",
    type: "vec_op_vec",
    originalFunction: "sum",
    module: VECTORS_MODULE,
    error_scalar: "Cannot add a vector and a non-vector.",
  },
  "-": {
    helperName: "__vectorSubtract",
    type: "vec_op_vec",
    originalFunction: "subtract",
    module: VECTORS_MODULE,
    error_scalar: "Cannot subtract a vector and a non-vector.",
  },
  "*": {
    helperName: "__vectorMultiply",
    type: "vec_op_mixed",
    originalFunctionVec: "multiply",
    moduleVec: VECTORS_MODULE,
    originalFunctionScalar: "scale",
    moduleScalar: VECTOR_MODULE,
    error_scalar: "Cannot multiply a non-vector by a vector.",
  },
  "/": {
    helperName: "__vectorDivide",
    type: "vec_op_mixed",
    originalFunctionVec: "divide",
    moduleVec: VECTORS_MODULE,
    originalFunctionScalar: "divide",
    originalFunctionScalarReverse: "divideBy",
    moduleScalar: VECTOR_MODULE,
    error_scalar: "Cannot divide a non-vector by a vector.",
  },
  "%": {
    helperName: "__vectorMod",
    type: "vec_op_mixed",
    originalFunctionVec: "mod",
    moduleVec: VECTORS_MODULE,
    originalFunctionScalar: "mod",
    originalFunctionScalarReverse: "modOf",
    moduleScalar: VECTOR_MODULE,
    error_scalar: "Cannot compute the modulus of a non-vector by a vector.",
  },
  "**": {
    helperName: "__vectorPower",
    type: "vec_op_mixed",
    originalFunctionVec: "power",
    moduleVec: VECTORS_MODULE,
    originalFunctionScalar: "power",
    originalFunctionScalarReverse: "powerOf",
    moduleScalar: VECTOR_MODULE,
    error_scalar: "Cannot raise a non-vector to the power of a vector.",
  },
}
