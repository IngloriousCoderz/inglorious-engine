/**
 * Creates a helper function to retrieve page options (metadata) with fallback defaults.
 * Handles both static metadata objects and dynamic metadata functions.
 *
 * @param {Object} store - The application store instance.
 * @param {Object} module - The imported page module.
 * @param {Object} entity - The entity associated with the page.
 * @returns {function(string, Object): any} A function that retrieves a specific option by name.
 */
export function createGetPageOption(store, module, entity) {
  let { metadata = {} } = module
  if (typeof metadata === "function") {
    metadata = metadata(entity, store._api)
  }

  return (name, defaults) => metadata[name] ?? defaults[name]
}
