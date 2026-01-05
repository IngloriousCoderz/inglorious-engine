export function createGetPageOption(store, module, entity) {
  let { metadata = {} } = module
  if (typeof metadata === "function") {
    metadata = metadata(entity, store._api)
  }

  return (name, defaults) => metadata[name] ?? defaults[name]
}
