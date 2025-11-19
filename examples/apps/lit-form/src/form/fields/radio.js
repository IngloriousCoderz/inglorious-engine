import { getFieldValue } from "@inglorious/lit"
import { getFieldError } from "@inglorious/lit"
import { repeat } from "@inglorious/lit"
import { html } from "@inglorious/lit"

export const radio = {
  render(entity, { label, options, path, validate }, api) {
    const fieldValue = getFieldValue(entity, path)
    const fieldError = getFieldError(entity, path)

    return html`<div>${label}</div>
      <div>
        ${repeat(
          options,
          ({ value }) => value,
          ({ value, label }) =>
            html`<input
                type="radio"
                id=${value}
                name=${path}
                value=${value}
                .checked=${fieldValue === value}
                @change=${() =>
                  api.notify("#form:fieldChange", { path, value, validate })}
              />
              <label for=${value}>${label}</label>`,
        )}
        ${fieldError && html`<div class="error">${fieldError}</div>`}
      </div>`
  },
}
