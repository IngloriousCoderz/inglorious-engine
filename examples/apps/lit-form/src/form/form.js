import { html, form as baseForm } from "@inglorious/lit"

export const form = {
  ...baseForm,

  formSubmit(entity, { entityId }, api) {
    if (entity.id !== entityId) return

    if (!entity.isValid) {
      console.error("Form is not valid:", entity.errors)
      return
    }

    console.log("Submitted!")
    api.notify("formReset", { entityId: "form" })
  },

  render(entity, api) {
    return html`<form
      @submit=${(event) => {
        event.preventDefault()
        api.notify("formValidate", { entityId: "form", validate: validateForm })
        api.notify("formSubmit", { entityId: "form" })
      }}
    >
      <div class="fields">
        <label for="name">Name</label>
        <div>
          <input
            id="name"
            .value=${entity.values.name}
            @input=${(event) =>
              api.notify("formFieldChange", {
                entityId: "form",
                path: "name",
                value: event.target.value,
                validate: validateName,
              })}
            @blur=${() =>
              api.notify("formFieldBlur", {
                entityId: "form",
                path: "name",
                validate: validateName,
              })}
          />${entity.errors.name &&
          html`<div class="error">${entity.errors.name}</div>`}
        </div>

        <label for="age">Age</label>
        <div>
          <input
            id="age"
            type="number"
            .value=${entity.values.age}
            @input=${(event) =>
              api.notify("formFieldChange", {
                entityId: "form",
                path: "age",
                value: Number(event.target.value),
                validate: validateAge,
              })}
            @blur=${() =>
              api.notify("formFieldBlur", {
                entityId: "form",
                path: "age",
                validate: validateAge,
              })}
          />${entity.errors.age &&
          html`<div class="error">${entity.errors.age}</div>`}
        </div>

        <div>Actions</div>
        <div>
          <button
            ?disabled=${entity.isPristine}
            @click=${(event) => {
              event.preventDefault()
              api.notify("formReset", { entityId: "form" })
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            ?disabled=${entity.isPristine || !entity.isValid}
          >
            Submit
          </button>
        </div>
      </div>
    </form>`
  },
}

function validateForm(values) {
  const errors = {}
  errors.name = validateName(values.name)
  errors.age = validateAge(values.age)
  return errors
}

function validateName(name) {
  return !name ? "Missing name" : null
}

function validateAge(age) {
  return !age ? "Missing age" : null
}
