import { html } from "@inglorious/web"

export const textFilter = {
  render(entity, column, api) {
    return html`<input
      name=${column.id}
      type="text"
      placeholder=${column.filter.placeholder ?? "Contains..."}
      autocomplete="off"
      value=${entity.filters[column.id]}
      @input=${(event) => {
        const value = event.target.value
        const formattedValue = value || null

        api.notify(`#${entity.id}:filterChange`, {
          columnId: column.id,
          value: formattedValue,
        })
      }}
    />`
  },
}
