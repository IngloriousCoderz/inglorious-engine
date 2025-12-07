import { html } from "@inglorious/web"

import classes from "../product-table.module.css"

export const rangeFilter = {
  render(entity, column, api) {
    const filter = entity.filters[column.id] ?? {}

    return html`<div class=${classes.row}>
      <input
        name=${`${column.id}Min`}
        type="number"
        placeholder=${column.filter.placeholder ?? "≥"}
        value=${filter.min}
        @input=${(event) => {
          const value = event.target.value
          const formattedValue = value ? Number(value) : null

          api.notify(`#${entity.id}:filterChange`, {
            columnId: column.id,
            value: { ...filter, min: formattedValue },
          })
        }}
        class=${classes.textRight}
      />
      <input
        name=${`${column.id}Max`}
        type="number"
        placeholder=${column.filter.placeholder ?? "≤"}
        value=${filter.max}
        @input=${(event) => {
          const value = event.target.value
          const formattedValue = value ? Number(value) : null

          api.notify(`#${entity.id}:filterChange`, {
            columnId: column.id,
            value: { ...filter, max: formattedValue },
          })
        }}
        class=${classes.textRight}
      />
    </div>`
  },
}
