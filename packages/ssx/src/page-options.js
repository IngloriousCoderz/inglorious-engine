import { getModuleName } from "./module.js"

export function createGetPageOption(store, module) {
  const name = getModuleName(module)
  const api = store._api
  const entity = api.getEntity(name)

  return (name, defaults) =>
    typeof module[name] === "function"
      ? module[name](entity, api)
      : (module[name] ?? defaults[name])
}
