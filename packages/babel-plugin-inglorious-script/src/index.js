import { injectHelpers } from "./helpers.js"
import { isVector } from "./static-check.js"

const VECTORS_MODULE = "@inglorious/utils/math/vectors.js"
const VECTOR_MODULE = "@inglorious/utils/math/vector.js"

const UNARY_MINUS = -1

export default function (babel) {
  const { types: t } = babel

  return {
    name: "inglorious-script",
    visitor: {
      Program: {
        enter() {
          this.vectorHelpers = new Map()
        },
        exit(path) {
          injectHelpers(babel, path, this.vectorHelpers)
        },
      },

      BinaryExpression(path) {
        const { operator, left, right } = path.node
        const scope = path.scope

        const isLeftVector = isVector(left, scope)
        const isRightVector = isVector(right, scope)

        // --- Vector Addition / Subtraction: v1 + v2 or v1 - v2 or mixed operations ---
        if (operator === "+" || operator === "-") {
          // Transform any expression that might involve vectors
          if (isLeftVector || isRightVector) {
            const helperName =
              operator === "+" ? "__vectorSum" : "__vectorSubtract"
            this.vectorHelpers.set(helperName, {
              helperName,
              originalFunction: operator === "+" ? "sum" : "subtract",
              module: VECTORS_MODULE,
            })

            const operationCall = t.callExpression(t.identifier(helperName), [
              left,
              right,
            ])
            path.replaceWith(operationCall)
          }
        }

        // --- Vector Scaling: v1 * s  or  s * v1 or potential mixed operations ---
        else if (operator === "*") {
          if (isLeftVector && isRightVector) {
            // ERROR: Both operands are vectors
            throw path.buildCodeFrameError(
              "Cannot multiply two vectors. Did you mean dot product (dot(v1, v2)) or cross product (cross(v1, v2))?",
            )
          } else if (isLeftVector || isRightVector) {
            // Handle vector * scalar, scalar * vector, or uncertain mixed cases
            this.vectorHelpers.set("__vectorScale", {
              originalFunction: "scale",
              module: VECTOR_MODULE,
            })
            const scaleCall = t.callExpression(t.identifier("__vectorScale"), [
              left,
              right,
            ])
            path.replaceWith(scaleCall)
          }
        }

        // --- Vector Division: v1 / s or potential mixed operations ---
        else if (operator === "/") {
          if (isLeftVector || isRightVector) {
            this.vectorHelpers.set("__vectorDivide", {
              originalFunction: "divide",
              module: VECTOR_MODULE,
            })
            const divideCall = t.callExpression(
              t.identifier("__vectorDivide"),
              [left, right],
            )
            path.replaceWith(divideCall)
          }
        }

        // --- Vector Modulus: v1 % s or potential mixed operations ---
        else if (operator === "%") {
          if (isLeftVector || isRightVector) {
            this.vectorHelpers.set("__vectorMod", {
              originalFunction: "mod",
              module: VECTOR_MODULE,
            })
            const modCall = t.callExpression(t.identifier("__vectorMod"), [
              left,
              right,
            ])
            path.replaceWith(modCall)
          }
        }

        // --- Vector Exponentiation: v1 ** s (power operator) ---
        else if (operator === "**") {
          if (isLeftVector || isRightVector) {
            this.vectorHelpers.set("__vectorPower", {
              originalFunction: "power",
              module: VECTOR_MODULE,
            })
            const powerCall = t.callExpression(t.identifier("__vectorPower"), [
              left,
              right,
            ])
            path.replaceWith(powerCall)
          }
        }
      },

      // Handle compound assignment operators: v1 += v2, v1 -= v2, v1 *= s, v1 /= s, v1 %= s
      AssignmentExpression(path) {
        const { operator, left, right } = path.node
        const scope = path.scope

        if (!isVector(left, scope)) {
          return
        }

        // Vector compound assignment: v1 += v2, v1 -= v2
        if (operator === "+=" || operator === "-=") {
          const helperName =
            operator === "+=" ? "__vectorSum" : "__vectorSubtract"
          const functionName = operator === "+=" ? "sum" : "subtract"
          this.vectorHelpers.set(helperName, {
            originalFunction: functionName,
            module: VECTORS_MODULE,
          })

          // Transform: v1 += v2  ->  v1 = __vectorSum(v1, v2)
          // Let wrapper function handle vector vs scalar logic
          path.replaceWith(
            t.assignmentExpression(
              "=",
              left,
              t.callExpression(t.identifier(helperName), [left, right]),
            ),
          )
        }

        // Vector scaling assignment: v1 *= s
        else if (operator === "*=") {
          this.vectorHelpers.set("__vectorScale", {
            originalFunction: "scale",
            module: VECTOR_MODULE,
          })

          // Transform: v1 *= s  ->  v1 = __vectorScale(v1, s)
          // Let wrapper function handle vector vs scalar logic
          path.replaceWith(
            t.assignmentExpression(
              "=",
              left,
              t.callExpression(t.identifier("__vectorScale"), [left, right]),
            ),
          )
        }

        // Vector division assignment: v1 /= s
        else if (operator === "/=") {
          this.vectorHelpers.set("__vectorDivide", {
            originalFunction: "divide",
            module: VECTOR_MODULE,
          })

          // Transform: v1 /= s  ->  v1 = __vectorDivide(v1, s)
          path.replaceWith(
            t.assignmentExpression(
              "=",
              left,
              t.callExpression(t.identifier("__vectorDivide"), [left, right]),
            ),
          )
        }

        // Vector modulus assignment: v1 %= s
        else if (operator === "%=") {
          this.vectorHelpers.set("__vectorMod", {
            originalFunction: "mod",
            module: VECTOR_MODULE,
          })

          // Transform: v1 %= s  ->  v1 = __vectorMod(v1, s)
          path.replaceWith(
            t.assignmentExpression(
              "=",
              left,
              t.callExpression(t.identifier("__vectorMod"), [left, right]),
            ),
          )
        }

        // Vector power assignment: v1 **= s
        else if (operator === "**=") {
          this.vectorHelpers.set("__vectorPower", {
            originalFunction: "power",
            module: VECTOR_MODULE,
          })

          // Transform: v1 **= s  ->  v1 = __vectorPower(v1, s)
          path.replaceWith(
            t.assignmentExpression(
              "=",
              left,
              t.callExpression(t.identifier("__vectorPower"), [left, right]),
            ),
          )
        }
      },

      // Handle unary operators: -v1, +v1
      UnaryExpression(path) {
        const { operator, argument } = path.node
        const scope = path.scope

        if (!isVector(argument, scope)) {
          return
        }

        // Unary minus: -v1 -> __vectorScale(v1, -1)
        if (operator === "-") {
          this.vectorHelpers.set("__vectorScale", {
            originalFunction: "scale",
            module: VECTOR_MODULE,
          })

          const negateCall = t.callExpression(t.identifier("__vectorScale"), [
            argument,
            t.numericLiteral(UNARY_MINUS),
          ])

          path.replaceWith(negateCall)
        }

        // Unary plus: +v1 -> v1 (no transformation needed, but could add abs() if desired)
        // For now, we'll leave +v1 as-is since it's already a no-op
      },
    },
  }
}
