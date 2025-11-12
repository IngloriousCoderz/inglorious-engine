import { html } from "lit-html"

export const form = {
  inputChange(entity, value) {
    entity.value = value
  },

  formSubmit(entity) {
    entity.value = ""
  },

  render({ value }, { notify }) {
    return html`<form
      @submit=${(event) => {
        event.preventDefault()
        notify("formSubmit", value)
      }}
    >
      <input
        placeholder="What next?"
        autofocus
        .value=${value}
        @input=${(event) => notify("inputChange", event.target.value)}
      />
      <button>Add</button>
    </form>`
  },
}
