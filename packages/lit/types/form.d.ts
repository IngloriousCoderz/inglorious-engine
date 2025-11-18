/**
 * Represents the structure of form values, which can be a nested object.
 */
export type FormValues = Record<string, any>

/**
 * A recursive type that mirrors the structure of `T` (the form values),
 * but with leaf nodes as `string | null`. Used for validation errors.
 */
export type FormErrors<T> = T extends (infer U)[]
  ? FormErrors<U>[]
  : T extends object
    ? { [P in keyof T]?: FormErrors<T[P]> }
    : string | null

/**
 * A recursive type that mirrors the structure of `T` (the form values),
 * but with leaf nodes as `boolean`. Used for tracking touched fields.
 */
export type FormTouched<T> = T extends (infer U)[]
  ? FormTouched<U>[]
  : T extends object
    ? { [P in keyof T]?: FormTouched<T[P]> }
    : boolean

/**
 * Represents the state of a form entity. It is generic over the shape
 * of the form's values.
 */
export interface FormEntity<T extends FormValues = FormValues> {
  /** A unique identifier for the form entity. */
  id: string | number
  /** The initial values of the form, used for resetting. */
  initialValues: T
  /** The current values of the form fields. */
  values: T
  /** The current validation errors for the form fields. */
  errors: FormErrors<T>
  /** A map indicating if a field has been touched. */
  touched: FormTouched<T>
  /** A flag indicating if the form has any validation errors. */
  isValid: boolean
  /** A flag indicating if the form has not been touched. */
  isPristine: boolean
  /** A flag indicating if async validation is in progress. */
  isValidating: boolean
  /** A flag indicating if the form is currently being submitted. */
  isSubmitting: boolean
  /** An error message from form submission failure. */
  submitError?: string | null
}

/**
 * The payload for the `formFieldChange` event.
 */
export interface FormFieldChangePayload<T extends FormValues = FormValues> {
  /** The ID of the target form entity. */
  entityId: string | number
  /** The dot-notation path to the field (e.g., 'user.name'). */
  path: string
  /** The new value of the field. */
  value: any
  /** An optional function to validate the field's value. */
  validate?: (value: any) => string | null
}

/**
 * The payload for the `formFieldBlur` event.
 */
export interface FormFieldBlurPayload {
  /** The ID of the target form entity. */
  entityId: string | number
  /** The dot-notation path to the field (e.g., 'user.name'). */
  path: string
  /** An optional function to validate the field's value on blur. */
  validate?: (value: any) => string | null
}

/**
 * The payload for the `formReset` event.
 */
export interface FormResetPayload {
  /** The ID of the target form entity. */
  entityId: string | number
}

/**
 * The payload for the `formValidate` event (synchronous validation).
 */
export interface FormValidatePayload<T extends FormValues = FormValues> {
  /** The ID of the target form entity. */
  entityId: string | number
  /**
   * A function that validates the entire form's values and returns
   * a complete error object.
   */
  validate: (values: T) => FormErrors<T>
}

/**
 * The payload for the `formValidateAsync` event (asynchronous validation).
 */
export interface FormValidateAsyncPayload<T extends FormValues = FormValues> {
  /** The ID of the target form entity. */
  entityId: string | number
  /**
   * An async function that validates the entire form's values and returns
   * a complete error object.
   */
  validate: (values: T) => Promise<FormErrors<T>>
}

/**
 * The payload for the `formValidationComplete` event.
 */
export interface FormValidationCompletePayload<
  T extends FormValues = FormValues,
> {
  /** The ID of the target form entity. */
  entityId: string | number
  /** The validation errors returned from async validation. */
  errors: FormErrors<T>
  /** Whether the form is valid (no errors). */
  isValid: boolean
}

/**
 * The payload for the `formValidationError` event.
 */
export interface FormValidationErrorPayload {
  /** The ID of the target form entity. */
  entityId: string | number
  /** The error message from the failed validation. */
  error: string
}

/**
 * The form type implementation for the entity-based state manager.
 */
export declare const form: {
  /**
   * Initializes the form entity by resetting it to its initial state.
   * @param entity The form entity.
   */
  init<T extends FormValues>(entity: FormEntity<T>): void

  /**
   * Resets the form entity when a 'create' event payload matches its ID.
   * @param entity The form entity.
   * @param entityId The entity ID from the create event, used to target a specific form.
   */
  create<T extends FormValues>(
    entity: FormEntity<T>,
    entityId: string | number,
  ): void

  /**
   * Handles a change in a form field's value and optionally validates it.
   * @param entity The form entity.
   * @param payload The change event payload.
   */
  formFieldChange<T extends FormValues>(
    entity: FormEntity<T>,
    payload: FormFieldChangePayload<T>,
  ): void

  /**
   * Handles the blur event for a form field, marking it as touched and optionally validating it.
   * @param entity The form entity.
   * @param payload The blur event payload.
   */
  formFieldBlur<T extends FormValues>(
    entity: FormEntity<T>,
    payload: FormFieldBlurPayload,
  ): void

  /**
   * Resets the form to its initial state.
   * @param entity The form entity.
   * @param payload The reset event payload.
   */
  formReset<T extends FormValues>(
    entity: FormEntity<T>,
    payload: FormResetPayload,
  ): void

  /**
   * Synchronously validates the entire form.
   * @param entity The form entity.
   * @param payload The validation event payload.
   */
  formValidate<T extends FormValues>(
    entity: FormEntity<T>,
    payload: FormValidatePayload<T>,
  ): void

  /**
   * Asynchronously validates the entire form.
   * Dispatches 'formValidationComplete' on success or 'formValidationError' on failure.
   * @param entity The form entity.
   * @param payload The async validation event payload.
   * @param api The API object for notifying events.
   */
  formValidateAsync<T extends FormValues>(
    entity: FormEntity<T>,
    payload: FormValidateAsyncPayload<T>,
    api: any,
  ): Promise<void>

  /**
   * Handles the completion of async validation.
   * @param entity The form entity.
   * @param payload The validation completion event payload.
   */
  formValidationComplete<T extends FormValues>(
    entity: FormEntity<T>,
    payload: FormValidationCompletePayload<T>,
  ): void

  /**
   * Handles validation errors from async validation.
   * @param entity The form entity.
   * @param payload The validation error event payload.
   */
  formValidationError<T extends FormValues>(
    entity: FormEntity<T>,
    payload: FormValidationErrorPayload,
  ): void
}

/**
 * Gets the value of a specific field in the form.
 * @param form The form entity.
 * @param path The path to the field (e.g., 'user.name').
 */
export declare function getFieldValue<T extends FormValues>(
  form: FormEntity<T>,
  path: string,
): any

/**
 * Gets the error message for a specific field in the form.
 * @param form The form entity.
 * @param path The path to the field.
 */
export declare function getFieldError<T extends FormValues>(
  form: FormEntity<T>,
  path: string,
): string | null

/** Checks if a specific field has been touched by the user. */
export declare function isFieldTouched<T extends FormValues>(
  form: FormEntity<T>,
  path: string,
): boolean

/** Resets the form to its initial state. */
export declare function resetForm<T extends FormValues>(
  form: FormEntity<T>,
): void

/** Sets the value of a specific field and marks it as touched. */
export declare function setFieldValue<T extends FormValues>(
  form: FormEntity<T>,
  path: string,
  value: any,
): void

/** Sets an error message for a specific field. */
export declare function setFieldError<T extends FormValues>(
  form: FormEntity<T>,
  path: string,
  error: string | null,
): void
