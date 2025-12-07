import { html } from "@inglorious/web"

export const rangeFilter = {
  render(entity, column, api) {
    const filter = entity.filters[column.id] ?? {}

    return html`<input
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
        class="iw-table-cell-number"
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
        class="iw-table-cell-number"
      />`
  },
}
