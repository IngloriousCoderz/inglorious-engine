import { getFieldError, getFieldValue, html, repeat } from "@inglorious/web"

import classes from "../user-form.module.css"

export const select = {
  render(entity, params, api) {
    const { label, path, isMultiple } = params
    const fieldError = getFieldError(entity, path)

    return html`<label for=${path}>${label}</label>
      <div>
        ${!isMultiple ? singleSelect.render(entity, params, api) : ""}
        ${isMultiple ? multipleSelect.render(entity, params, api) : ""}
        ${fieldError && html`<div class=${classes.error}>${fieldError}</div>`}
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
        api.notify(`#${entity.id}:fieldChange`, {
          path,
          value: event.target.value,
          validate,
        })}
    >
      ${repeat(
        options,
        ({ value }) => value,
        ({ value, label }) =>
          html`<option value=${value} .selected=${fieldValue === value}>
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
        api.notify(`#${entity.id}:fieldChange`, {
          path,
          value: [...event.target.selectedOptions].map(({ value }) => value),
          validate,
        })}
    >
      ${repeat(
        options,
        ({ value }) => value,
        ({ value, label }) =>
          html`<option value=${value} .selected=${fieldValue.includes(value)}>
            ${label}
          </option>`,
      )}
      >
    </select>`
  },
}
