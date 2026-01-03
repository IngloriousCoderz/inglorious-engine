import { getModuleName } from "../module.js"
import { toHTML } from "./html.js"

const DEFAULT_OPTIONS = {
  lang: "en",
  charset: "UTF-8",
  title: "",
  meta: {},
  styles: [],
  head: "",
  scripts: [],
}

export async function renderPage(store, page, module, options = {}) {
  const name = getModuleName(module)
  const api = store._api
  const entity = api.getEntity(name)

  if (module.load) {
    await module.load(entity, page, store._api)
  }

  const getPageOption = createGetPageOption(module, entity, api)

  const lang = getPageOption("lang") ?? options.lang
  const charset = getPageOption("charset") ?? options.charset
  const title = getPageOption("title") ?? options.title
  const meta = { ...options.meta, ...getPageOption("meta") }
  const styles = [...(options.styles ?? []), ...getPageOption("styles")]
  const head = getPageOption("head") ?? options.head
  const scripts = [...(options.scripts ?? []), ...getPageOption("scripts")]

  return toHTML(store, (api) => api.render(name, { allowType: true }), {
    ...options,
    lang,
    charset,
    title,
    meta,
    styles,
    head,
    scripts,
  })
}

function createGetPageOption(module, entity, api) {
  return (name) =>
    typeof module[name] === "function"
      ? module[name](entity, api)
      : (module[name] ?? DEFAULT_OPTIONS[name])
}
