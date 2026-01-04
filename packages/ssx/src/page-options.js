export function createGetPageOption(store, module, entity) {
  return (name, defaults) =>
    typeof module[name] === "function"
      ? module[name](entity, store._api)
      : (module[name] ?? defaults[name])
}
