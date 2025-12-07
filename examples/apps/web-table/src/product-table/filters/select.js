import { html } from "@inglorious/web"

export const selectFilter = {
  render(entity, column, api) {
    return html`<select
      name=${column.id}
      ?multiple=${column.filter.isMultiple}
      autocomplete="off"
      value=${entity.filters[column.id]}
      @change=${(event) => {
        const value = event.target.value
        const formattedValue = value ? format(value, column.type) : null

        api.notify(`#${entity.id}:filterChange`, {
          columnId: column.id,
          value: formattedValue,
        })
      }}
    >
      ${column.filter.options.map(
        (option) => html`<option value=${option}>${option}</option>`,
      )}
    </select>`
  },
}

function format(value, type) {
  if (type === "number") return Number(value)
  if (type === "boolean")
    return value === "true" ? true : value === "false" ? false : null
  if (["date", "time", "datetime"].includes(type))
    return new Date(value).getTime()
  return value
}
