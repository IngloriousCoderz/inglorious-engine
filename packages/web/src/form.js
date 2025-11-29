import { clone, get, set } from "@inglorious/utils/data-structures/object.js"

/**
 * @typedef {import('../types/form.js').FormEntity} FormEntity
 * @typedef {import('../types/form.js').FormFieldChangePayload} FormFieldChangePayload
 * @typedef {import('../types/form.js').FormFieldBlurPayload} FormFieldBlurPayload
 *
 * @typedef {object} FormValidatePayload
 * @property {string|number} entityId - The ID of the target form entity.
 * @property {(values: object) => import('../types/form.js').FormErrors<object>} validate - A function that validates the entire form's values and returns a complete error object.
 *
 * @typedef {object} FormValidateAsyncPayload
 * @property {string|number} entityId - The ID of the target form entity.
 * @property {(values: object) => Promise<import('../types/form.js').FormErrors<object>>} validate - An async function that validates the entire form's values.
 *
 * @typedef {object} FormValidationCompletePayload
 * @property {string|number} entityId - The ID of the target form entity.
 * @property {import('../types/form.js').FormErrors<object>} errors - The validation errors.
 * @property {boolean} isValid - Whether the form is valid.
 *
 * @typedef {object} FormValidationErrorPayload
 * @property {string|number} entityId - The ID of the target form entity.
 * @property {string} error - The error message.
 */

const NO_ITEMS_REMOVED = 0
const ONE_ITEM_REMOVED = 1

/**
 * A type definition for managing form state within an entity-based system.
 * It handles initialization, field changes, validation, and submission.
 *
 * @type {import('@inglorious/engine/types/type.js').Type}
 */
export const form = {
  /**
   * Initializes the form entity by resetting it to its initial state.
   * @param {FormEntity} entity - The form entity.
   */
  init(entity) {
    resetForm(entity)

    document.addEventListener("click", (e) => {
      const button = e.target.closest("button")

      if (!button || button.getAttribute("type") === "submit") return

      e.preventDefault()
    })

    document.addEventListener("submit", (e) => {
      const form = e.target.closest("form")

      if (!form) return

      e.preventDefault()
    })
  },

  /**
   * Resets the form entity when a 'create' event matches its ID.
   * @param {FormEntity} entity - The form entity.
   * @param {string|number} entityId - The ID from the create event.
   */
  create(entity) {
    resetForm(entity)
  },

  /**
   * Appends an item to a field array.
   * @param {FormEntity} entity - The form entity.
   * @param {Object} payload
   * @param {string|number} payload.entityId - The form entity ID.
   * @param {string} payload.path - Path to the array field (e.g., 'addresses').
   * @param {*} payload.value - The value to append.
   */
  fieldArrayAppend(entity, { path, value }) {
    const array = get(entity.values, path)
    if (!Array.isArray(array)) {
      console.warn(`Field at path '${path}' is not an array`)
      return
    }

    array.push(value)

    const errorsArray = get(entity.errors, path, [])
    errorsArray.push(initMetadata(value))

    const touchedArray = get(entity.touched, path, [])
    touchedArray.push(initMetadata(value))

    entity.isPristine = false
  },

  /**
   * Removes an item from a field array by index.
   * @param {FormEntity} entity - The form entity.
   * @param {Object} payload
   * @param {string|number} payload.entityId - The form entity ID.
   * @param {string} payload.path - Path to the array field.
   * @param {number} payload.index - The index to remove.
   */
  fieldArrayRemove(entity, { path, index }) {
    const array = get(entity.values, path)
    if (!Array.isArray(array)) {
      console.warn(`Field at path '${path}' is not an array`)
      return
    }

    array.splice(index, ONE_ITEM_REMOVED)

    const errorsArray = get(entity.errors, path)
    errorsArray.splice(index, ONE_ITEM_REMOVED)

    const touchedArray = get(entity.touched, path)
    touchedArray.splice(index, ONE_ITEM_REMOVED)

    entity.isPristine = false
  },

  /**
   * Inserts an item into a field array at a specific index.
   * @param {FormEntity} entity - The form entity.
   * @param {Object} payload
   * @param {string|number} payload.entityId - The form entity ID.
   * @param {string} payload.path - Path to the array field.
   * @param {number} payload.index - The index to insert at.
   * @param {*} payload.value - The value to insert.
   */
  fieldArrayInsert(entity, { path, index, value }) {
    const array = get(entity.values, path)
    if (!Array.isArray(array)) {
      console.warn(`Field at path '${path}' is not an array`)
      return
    }

    array.splice(index, NO_ITEMS_REMOVED, value)

    const errorsArray = get(entity.errors, path)
    errorsArray.splice(index, NO_ITEMS_REMOVED, initMetadata(value))

    const touchedArray = get(entity.touched, path)
    touchedArray.splice(index, NO_ITEMS_REMOVED, initMetadata(value))

    entity.isPristine = false
  },

  /**
   * Moves an item in a field array from one index to another.
   * @param {FormEntity} entity - The form entity.
   * @param {Object} payload
   * @param {string|number} payload.entityId - The form entity ID.
   * @param {string} payload.path - Path to the array field.
   * @param {number} payload.fromIndex - The source index.
   * @param {number} payload.toIndex - The destination index.
   */
  fieldArrayMove(entity, { path, fromIndex, toIndex }) {
    const array = get(entity.values, path)
    if (!Array.isArray(array)) {
      console.warn(`Field at path '${path}' is not an array`)
      return
    }

    const [item] = array.splice(fromIndex, ONE_ITEM_REMOVED)
    array.splice(toIndex, NO_ITEMS_REMOVED, item)

    const errorsArray = get(entity.errors, path)
    const [errorItem] = errorsArray.splice(fromIndex, ONE_ITEM_REMOVED)
    errorsArray.splice(toIndex, NO_ITEMS_REMOVED, errorItem)

    const touchedArray = get(entity.touched, path)
    const [touchedItem] = touchedArray.splice(fromIndex, ONE_ITEM_REMOVED)
    touchedArray.splice(toIndex, NO_ITEMS_REMOVED, touchedItem)

    entity.isPristine = false
  },

  /**
   * Handles the blur event for a form field, marking it as touched and optionally validating it.
   * @param {FormEntity} entity - The form entity.
   * @param {FormFieldBlurPayload} payload - The event payload.
   */
  fieldBlur(entity, { path, validate }) {
    set(entity.touched, path, true)

    if (!validate) return

    const error = validate(get(entity.values, path))
    setFieldError(entity, path, error)
  },

  /**
   * Handles a change in a form field's value and optionally validates it.
   * @param {FormEntity} entity - The form entity.
   * @param {FormFieldChangePayload} payload - The event payload.
   */
  fieldChange(entity, { path, value, validate }) {
    setFieldValue(entity, path, value)

    if (!validate) return

    const error = validate(get(entity.values, path))
    setFieldError(entity, path, error)
  },

  /**
   * Resets the form to its initial state.
   * @param {FormEntity} entity - The form entity.
   * @param {string|number} entityId - The ID of the target form entity.
   */
  reset(entity) {
    resetForm(entity)
  },

  /**
   * Synchronously validates the entire form.
   * @param {FormEntity} entity - The form entity.
   * @param {FormValidatePayload} payload - The event payload.
   */
  validate(entity, { validate }) {
    entity.errors = validate(entity.values)
    entity.isValid = !hasErrors(entity.errors)
  },

  /**
   * Asynchronously validates the entire form.
   * Dispatches 'formValidationComplete' on success or 'formValidationError' on failure.
   * @param {FormEntity} entity - The form entity.
   * @param {FormValidateAsyncPayload} payload - The event payload.
   * @param {Object} api - The API object for notifying events.
   */
  async validateAsync(entity, { validate }, api) {
    try {
      entity.isValidating = true
      const errors = await validate(entity.values)
      api.notify(`#${entity.id}:validationComplete`, {
        errors,
        isValid: !hasErrors(errors),
      })
    } catch (error) {
      api.notify(`#${entity.id}:validationError`, {
        error: error.message,
      })
    }
  },

  /**
   * Handles the completion of async validation.
   * @param {FormEntity} entity - The form entity.
   * @param {FormValidationCompletePayload} payload - The event payload.
   */
  validationComplete(entity, { errors, isValid }) {
    entity.isValidating = false
    entity.errors = errors
    entity.isValid = isValid
  },

  /**
   * Handles validation errors from async validation.
   * @param {FormEntity} entity - The form entity.
   * @param {FormValidationErrorPayload} payload - The event payload.
   */
  validationError(entity, { error }) {
    entity.isValidating = false
    entity.submitError = error
  },
}

/**
 * Retrieves the validation error for a specific form field.
 * @param {FormEntity} form - The form entity object.
 * @param {string} path - The dot-separated path to the field (e.g., 'user.name').
 * @returns {string|null|undefined} The error message for the field, or null/undefined if there is no error.
 */
export function getFieldError(form, path) {
  return get(form.errors, path)
}

/**
 * Retrieves the value of a specific form field.
 * @param {FormEntity} form - The form entity object.
 * @param {string} path - The dot-separated path to the field (e.g., 'user.name').
 * @param {*} [defaultValue] - An optional default value to return if the path does not exist.
 * @returns {*} The value of the field, or the default value if not found.
 */
export function getFieldValue(form, path, defaultValue) {
  return get(form.values, path, defaultValue)
}

/**
 * Checks if a specific form field has been touched (i.e., has received a blur event).
 * @param {FormEntity} form - The form entity object.
 * @param {string} path - The dot-separated path to the field (e.g., 'user.name').
 * @returns {boolean|undefined} `true` if the field has been touched, otherwise `false` or `undefined`.
 */
export function isFieldTouched(form, path) {
  return get(form.touched, path)
}

// Private helper functions

function hasErrors(errors) {
  if (errors === null || errors === undefined) {
    return false
  }

  if (typeof errors !== "object") {
    // Leaf value - check if it's truthy (error string)
    return Boolean(errors)
  }

  if (Array.isArray(errors)) {
    return errors.some((item) => hasErrors(item))
  }

  // Object - check all properties
  return Object.values(errors).some((value) => hasErrors(value))
}

function initMetadata(value) {
  if (Array.isArray(value)) {
    return value.map((item) => initMetadata(item))
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, initMetadata(val)]),
    )
  }

  return null
}

function resetForm(form) {
  form.values = clone(form.initialValues)
  form.errors = initMetadata(form.initialValues)
  form.touched = initMetadata(form.initialValues)

  form.isValid = true
  form.isPristine = true

  form.isValidating = false
  form.isSubmitting = false
}

function setFieldValue(form, path, value) {
  set(form.values, path, value)
  set(form.touched, path, true)

  form.isPristine = false

  // By clearing the error for this path, the form might become valid.
  // We delegate to setFieldError(..., null) to correctly run the check.
  setFieldError(form, path, null)
}

function setFieldError(form, path, error) {
  // Ensure we set null if error is falsy, but not an empty string
  const newError = error || null
  set(form.errors, path, newError)

  if (newError) {
    // If we are adding an error, the form is definitely invalid.
    // No need for an expensive check.
    form.isValid = false
  } else {
    // If we are removing an error, the form MIGHT become valid.
    // This is when we must perform the check.
    form.isValid = !hasErrors(form.errors)
  }
}
