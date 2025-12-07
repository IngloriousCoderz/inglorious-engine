import { getFieldError, getFieldValue, html } from "@inglorious/web"

import classes from "../user-form.module.css"

export const radio = {
  render(entity, { label, options, path, validate }, api) {
    const fieldValue = getFieldValue(entity, path)
    const fieldError = getFieldError(entity, path)

    return html`<div>${label}</div>
      <div>
        ${options.map(
          ({ value, label }) =>
            html`<input
                type="radio"
                id=${value}
                name=${path}
                value=${value}
                .checked=${fieldValue === value}
                @change=${() =>
                  api.notify(`#${entity.id}:fieldChange`, {
                    path,
                    value,
                    validate,
                  })}
              />
              <label for=${value}>${label}</label>`,
        )}
        ${fieldError && html`<div class=${classes.error}>${fieldError}</div>`}
      </div>`
  },
}
