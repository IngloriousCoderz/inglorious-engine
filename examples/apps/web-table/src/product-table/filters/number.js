import { html } from "@inglorious/web"

import classes from "../product-table.module.css"

export const numberFilter = {
  render(entity, column, api) {
    return html`<input
      name=${column.id}
      type="number"
      placeholder=${column.filter.placeholder ?? "="}
      value=${entity.filters[column.id]}
      @input=${(event) => {
        const value = event.target.value
        const formattedValue = value ? Number(value) : null

        api.notify(`#${entity.id}:filterChange`, {
          columnId: column.id,
          value: formattedValue,
        })
      }}
      class=${classes.textRight}
    />`
  },
}
