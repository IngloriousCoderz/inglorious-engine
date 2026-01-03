import { getModuleName } from "../module.js"
import { createGetPageOption } from "../page-options.js"
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

  if (module.load) {
    const api = store._api
    const entity = api.getEntity(name)
    await module.load(entity, page, api)
  }

  const getPageOption = createGetPageOption(store, module)

  const lang = getPageOption("lang", DEFAULT_OPTIONS) ?? options.lang
  const charset = getPageOption("charset", DEFAULT_OPTIONS) ?? options.charset
  const title = getPageOption("title", DEFAULT_OPTIONS) ?? options.title
  const meta = { ...options.meta, ...getPageOption("meta", DEFAULT_OPTIONS) }
  const styles = [
    ...(options.styles ?? []),
    ...getPageOption("styles", DEFAULT_OPTIONS),
  ]
  const head = getPageOption("head", DEFAULT_OPTIONS) ?? options.head
  const scripts = [
    ...(options.scripts ?? []),
    ...getPageOption("scripts", DEFAULT_OPTIONS),
  ]

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
