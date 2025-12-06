import { getFieldError, getFieldValue, html } from "@inglorious/web"

import classes from "../user-form.module.css"

export const input = {
  render(entity, { type = "text", label, path, validate }, api) {
    const fieldValue = getFieldValue(entity, path)
    const fieldError = getFieldError(entity, path)

    return html`<label for=${path}>${label}</label>
      <div>
        <input
          id=${path}
          name=${path}
          type=${type}
          autocomplete="off"
          .value=${fieldValue}
          @input=${(event) =>
            api.notify(`#${entity.id}:fieldChange`, {
              path,
              value: parseValue(event.target.value, type),
              validate,
            })}
          @blur=${() =>
            api.notify(`#${entity.id}:fieldBlur`, {
              path,
              validate,
            })}
        />

        ${fieldError && html`<div class=${classes.error}>${fieldError}</div>`}
      </div>`
  },
}

function parseValue(value, type) {
  switch (type) {
    case "number":
      return Number(value)

    default:
      return value
  }
}
