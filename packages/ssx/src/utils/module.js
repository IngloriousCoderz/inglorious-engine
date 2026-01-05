/**
 * Extracts the name of the exported entity from a page module.
 * It looks for an export that is an object containing a `render` function.
 *
 * @param {Object} pageModule - The module object imported from a page file.
 * @returns {string} The name of the export that represents the entity.
 * @throws {Error} If no valid entity export is found.
 */
export function getModuleName(pageModule) {
  const name = Object.keys(pageModule).find((key) => {
    const value = pageModule[key]
    return (
      value && typeof value === "object" && typeof value.render === "function"
    )
  })

  if (!name) {
    throw new Error(
      "Page module must export an entity with a render() method. " +
        `Found exports: ${Object.keys(pageModule).join(", ")}`,
    )
  }

  return name
}
