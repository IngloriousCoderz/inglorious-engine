import { addNamed } from "@babel/helper-module-imports"

const VECTOR_MODULE = "@inglorious/utils/math/vector.js"

export function ensureHelper(
  pluginState,
  helperName,
  originalFunction,
  module,
) {
  if (!pluginState.vectorHelpers) {
    pluginState.vectorHelpers = new Set()
  }
  if (!pluginState.hasVectorOperations) {
    pluginState.hasVectorOperations = true
  }
  pluginState.vectorHelpers.add({ helperName, originalFunction, module })
}

export function injectHelpers(babel, programPath, helpers) {
  const { types: t } = babel
  const helperMap = new Map()

  for (const { helperName, originalFunction, module } of helpers) {
    if (helperMap.has(helperName)) {
      continue
    }

    const importId = addNamed(programPath, originalFunction, module)
    const isVectorId = addNamed(programPath, "isVector", VECTOR_MODULE)

    let helperFunction
    if (helperName === "__vectorSum") {
      helperFunction = t.functionDeclaration(
        t.identifier(helperName),
        [t.identifier("a"), t.identifier("b")],
        t.blockStatement([
          t.ifStatement(
            t.logicalExpression(
              "&&",
              t.logicalExpression(
                "&&",
                t.identifier("a"),
                t.callExpression(isVectorId, [t.identifier("a")]),
              ),
              t.logicalExpression(
                "&&",
                t.identifier("b"),
                t.callExpression(isVectorId, [t.identifier("b")]),
              ),
            ),
            t.returnStatement(
              t.callExpression(importId, [
                t.identifier("a"),
                t.identifier("b"),
              ]),
            ),
          ),
          t.returnStatement(
            t.binaryExpression("+", t.identifier("a"), t.identifier("b")),
          ),
        ]),
      )
    } else if (helperName === "__vectorSubtract") {
      helperFunction = t.functionDeclaration(
        t.identifier(helperName),
        [t.identifier("a"), t.identifier("b")],
        t.blockStatement([
          t.ifStatement(
            t.logicalExpression(
              "&&",
              t.logicalExpression(
                "&&",
                t.identifier("a"),
                t.callExpression(isVectorId, [t.identifier("a")]),
              ),
              t.logicalExpression(
                "&&",
                t.identifier("b"),
                t.callExpression(isVectorId, [t.identifier("b")]),
              ),
            ),
            t.returnStatement(
              t.callExpression(importId, [
                t.identifier("a"),
                t.identifier("b"),
              ]),
            ),
          ),
          t.returnStatement(
            t.binaryExpression("-", t.identifier("a"), t.identifier("b")),
          ),
        ]),
      )
    } else if (helperName === "__vectorScale") {
      helperFunction = t.functionDeclaration(
        t.identifier(helperName),
        [t.identifier("a"), t.identifier("b")],
        t.blockStatement([
          t.ifStatement(
            t.logicalExpression(
              "&&",
              t.logicalExpression(
                "&&",
                t.identifier("a"),
                t.callExpression(isVectorId, [t.identifier("a")]),
              ),
              t.binaryExpression(
                "===",
                t.unaryExpression("typeof", t.identifier("b")),
                t.stringLiteral("number"),
              ),
            ),
            t.returnStatement(
              t.callExpression(importId, [
                t.identifier("a"),
                t.identifier("b"),
              ]),
            ),
          ),
          t.ifStatement(
            t.logicalExpression(
              "&&",
              t.binaryExpression(
                "===",
                t.unaryExpression("typeof", t.identifier("a")),
                t.stringLiteral("number"),
              ),
              t.logicalExpression(
                "&&",
                t.identifier("b"),
                t.callExpression(isVectorId, [t.identifier("b")]),
              ),
            ),
            t.returnStatement(
              t.callExpression(importId, [
                t.identifier("b"),
                t.identifier("a"),
              ]),
            ),
          ),
          t.returnStatement(
            t.binaryExpression("*", t.identifier("a"), t.identifier("b")),
          ),
        ]),
      )
    } else if (helperName === "__vectorDivide") {
      helperFunction = t.functionDeclaration(
        t.identifier(helperName),
        [t.identifier("a"), t.identifier("b")],
        t.blockStatement([
          t.ifStatement(
            t.logicalExpression(
              "&&",
              t.logicalExpression(
                "&&",
                t.identifier("a"),
                t.callExpression(isVectorId, [t.identifier("a")]),
              ),
              t.binaryExpression(
                "===",
                t.unaryExpression("typeof", t.identifier("b")),
                t.stringLiteral("number"),
              ),
            ),
            t.returnStatement(
              t.callExpression(importId, [
                t.identifier("a"),
                t.identifier("b"),
              ]),
            ),
          ),
          t.returnStatement(
            t.binaryExpression("/", t.identifier("a"), t.identifier("b")),
          ),
        ]),
      )
    } else if (helperName === "__vectorMod") {
      helperFunction = t.functionDeclaration(
        t.identifier(helperName),
        [t.identifier("a"), t.identifier("b")],
        t.blockStatement([
          t.ifStatement(
            t.logicalExpression(
              "&&",
              t.logicalExpression(
                "&&",
                t.identifier("a"),
                t.callExpression(isVectorId, [t.identifier("a")]),
              ),
              t.binaryExpression(
                "===",
                t.unaryExpression("typeof", t.identifier("b")),
                t.stringLiteral("number"),
              ),
            ),
            t.returnStatement(
              t.callExpression(importId, [
                t.identifier("a"),
                t.identifier("b"),
              ]),
            ),
          ),
          t.returnStatement(
            t.binaryExpression("%", t.identifier("a"), t.identifier("b")),
          ),
        ]),
      )
    }

    helperMap.set(helperName, helperFunction)
  }

  programPath.unshiftContainer("body", Array.from(helperMap.values()))
}
