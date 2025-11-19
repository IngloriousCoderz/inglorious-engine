import { getFieldError } from "@inglorious/lit"
import { repeat } from "@inglorious/lit"
import { getFieldValue } from "@inglorious/lit"
import { html } from "@inglorious/lit"

export const select = {
  render(entity, params, api) {
    const { label, path, isMultiple } = params
    const fieldError = getFieldError(entity, path)

    return html`<label for=${path}>${label}</label>
      <div>
        ${!isMultiple ? singleSelect.render(entity, params, api) : ""}
        ${isMultiple ? multipleSelect.render(entity, params, api) : ""}
        ${fieldError && html`<div class="error">${fieldError}</div>`}
      </div>`
  },
}

const singleSelect = {
  render(entity, { path, options, validate }, api) {
    const fieldValue = getFieldValue(entity, path)

    return html`<select
      id=${path}
      name=${path}
      @change=${(event) =>
        api.notify("#form:fieldChange", {
          path,
          value: event.target.value,
          validate,
        })}
    >
      ${repeat(
        options,
        ({ value }) => value,
        ({ value, label }) =>
          html`<option value=${value} ?selected=${fieldValue === value}>
            ${label}
          </option>`,
      )}
      >
    </select>`
  },
}

const multipleSelect = {
  render(entity, { path, options, validate }, api) {
    const fieldValue = getFieldValue(entity, path)

    return html`<select
      id=${path}
      name=${path}
      multiple
      @change=${(event) =>
        api.notify("#form:fieldChange", {
          path,
          value: [...event.target.selectedOptions].map(({ value }) => value),
          validate,
        })}
    >
      ${repeat(
        options,
        ({ value }) => value,
        ({ value, label }) =>
          html`<option value=${value} ?selected=${fieldValue.includes(value)}>
            ${label}
          </option>`,
      )}
      >
    </select>`
  },
}
