import { getFieldError } from "@inglorious/lit"
import { getFieldValue } from "@inglorious/lit"
import { html } from "@inglorious/lit"

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
            api.notify("#form:fieldChange", {
              path,
              value: parseValue(event.target.value, type),
              validate,
            })}
          @blur=${() =>
            api.notify("#form:fieldBlur", {
              path,
              validate,
            })}
        />

        ${fieldError && html`<div class="error">${fieldError}</div>`}
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
