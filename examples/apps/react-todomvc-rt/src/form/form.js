export const form = {
  inputChange(entity, value) {
    entity.value = value
  },

  formSubmit(entity) {
    entity.value = ""
  },
}
