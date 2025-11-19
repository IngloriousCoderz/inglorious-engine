import { form as baseForm, html } from "@inglorious/lit"

export const form = {
  ...baseForm,

  submit(entity, _, api) {
    if (!entity.isValid) {
      console.error("Form is not valid:", clone(entity.errors))
      return
    }

    alert("Submitted! " + JSON.stringify(entity.values))
    api.notify("form[form]:reset")
  },

  render(entity, api) {
    return html`<form
      @submit=${() => {
        api.notify("form[form]:validate", { validate: validateForm })
        api.notify("form[form]:submit")
      }}
    >
      <div class="fields">
        <label for="name">Name</label>
        <div>
          <input
            id="name"
            name="name"
            autocomplete="off"
            .value=${entity.values.name}
            @input=${(event) =>
              api.notify("form[form]:fieldChange", {
                path: "name",
                value: event.target.value,
                validate: validateName,
              })}
            @blur=${() =>
              api.notify("form[form]:fieldBlur", {
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
            name="age"
            type="number"
            autocomplete="off"
            .value=${entity.values.age}
            @input=${(event) =>
              api.notify("form[form]:fieldChange", {
                path: "age",
                value: Number(event.target.value),
                validate: validateAge,
              })}
            @blur=${() =>
              api.notify("form[form]:fieldBlur", {
                path: "age",
                validate: validateAge,
              })}
          />${entity.errors.age &&
          html`<div class="error">${entity.errors.age}</div>`}
        </div>

        <div>Sex</div>
        <div>
          <input
            id="F"
            name="sex"
            type="radio"
            value="F"
            .checked=${entity.values.sex === "F"}
            @change=${() =>
              api.notify("form[form]:fieldChange", {
                path: "sex",
                value: "F",
              })}
          /><label for="F">Female</label>
          <input
            id="M"
            name="sex"
            type="radio"
            value="M"
            .checked=${entity.values.sex === "M"}
            @change=${() =>
              api.notify("form[form]:fieldChange", {
                path: "sex",
                value: "M",
              })}
          /><label for="M">Male</label>
          ${entity.errors.sex &&
          html`<div class="error">${entity.errors.sex}</div>`}
        </div>

        <label for="favoriteAnimal">Favorite animal</label>
        <div>
          <select
            id="favoriteAnimal"
            name="favoriteAnimal"
            .value=${entity.values.favoriteAnimal}
            @change=${(event) =>
              api.notify("form[form]:fieldChange", {
                path: "favoriteAnimal",
                value: event.target.value,
                validate: validateFavoriteAnimal,
              })}
          >
            <option></option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="seal">Seal</option></select
          >${entity.errors.favoriteAnimal &&
          html`<div class="error">${entity.errors.favoriteAnimal}</div>`}
        </div>

        <div>Addresses</div>
        <div>
          <ul>
            ${entity.values.addresses.map(
              (address, index) =>
                html`<li>
                  <input
                    placeholder="street"
                    .value=${address.street}
                    @input=${(event) =>
                      api.notify("form[form]:fieldChange", {
                        path: `addresses.${index}.street`,
                        value: event.target.value,
                      })}
                  />
                  ${entity.errors.addresses[index].street &&
                  html`<div class="error">
                    ${entity.errors.addresses[index].street}
                  </div>`}<input
                    placeholder="city"
                    .value=${address.city}
                    @input=${(event) =>
                      api.notify("form[form]:fieldChange", {
                        path: `addresses.${index}.city`,
                        value: event.target.value,
                      })}
                  />${entity.errors.addresses[index].city &&
                  html`<div class="error">
                    ${entity.errors.addresses[index].city}
                  </div>`}
                  <button
                    @click=${() =>
                      api.notify("form[form]:fieldArrayRemove", {
                        path: "addresses",
                        index,
                      })}
                  >
                    x
                  </button>
                </li>`,
            )}
          </ul>
          <button
            @click=${() =>
              api.notify("form[form]:fieldArrayAppend", {
                path: "addresses",
                value: { street: "", city: "" },
              })}
          >
            Add
          </button>
        </div>

        <div>Actions</div>
        <div>
          <button
            ?disabled=${entity.isPristine}
            @click=${() => api.notify("form[form]:reset")}
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
  errors.sex = validateSex(values.sex)
  errors.favoriteAnimal = validateFavoriteAnimal(values.favoriteAnimal)
  errors.addresses = values.addresses.map(validateAddress)
  return errors
}

function validateName(name) {
  return !name ? "Missing name" : null
}

function validateAge(age) {
  return !age ? "Missing age" : null
}

function validateSex(sex) {
  return !sex ? "Missing sex" : null
}

function validateFavoriteAnimal(favoriteAnimal) {
  return !favoriteAnimal ? "Missing favorite animal" : null
}

function validateAddress(address) {
  const errors = {}
  errors.street = validateStreet(address.street)
  errors.city = validateCity(address.city)
  return errors
}

function validateStreet(street) {
  return !street ? "Missing street" : null
}

function validateCity(city) {
  return !city ? "Missing city" : null
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
