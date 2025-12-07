import { html } from "@inglorious/web"

const INPUT_TYPE = {
  date: "date",
  time: "time",
  datetime: "datetime-local",
}

export const dateFilter = {
  render(entity, column, api) {
    const filter = entity.filters[column.id] ?? {}

    return html`<input
        name=${`${column.id}Min`}
        type=${INPUT_TYPE[column.filter.type]}
        value=${entity.filters[column.id]}
        @input=${(event) => {
          const value = event.target.value
          const formattedValue = value ? new Date(value).getTime() : null

          api.notify(`#${entity.id}:filterChange`, {
            columnId: column.id,
            value: { ...filter, min: formattedValue },
          })
        }}
      />
      <input
        name=${`${column.id}Max`}
        type=${INPUT_TYPE[column.filter.type]}
        value=${entity.filters[column.id]}
        @input=${(event) => {
          const value = event.target.value
          const formattedValue = value ? new Date(value).getTime() : null

          api.notify(`#${entity.id}:filterChange`, {
            columnId: column.id,
            value: { ...filter, max: formattedValue },
          })
        }}
      />`
  },
}
