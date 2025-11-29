export function validateForm(values) {
  const errors = {}
  errors.name = validateName(values.name)
  errors.age = validateAge(values.age)
  errors.sex = validateSex(values.sex)
  errors.favoriteAnimal = validateFavoriteAnimal(values.favoriteAnimal)
  errors.languages = validateLanguages(values.languages)
  errors.addresses = values.addresses.map(validateAddress)
  return errors
}

export function validateName(name) {
  return !name ? "Missing name" : null
}

export function validateAge(age) {
  return !age ? "Missing age" : null
}

export function validateSex(sex) {
  return !sex ? "Missing sex" : null
}

export function validateFavoriteAnimal(favoriteAnimal) {
  return !favoriteAnimal ? "Missing favorite animal" : null
}

export function validateLanguages(languages) {
  return !languages.length ? "Choose at least one language" : null
}

export function validateAddresses(addresses) {
  return !addresses.length ? "Add at least one address" : null
}

export function validateAddress(address) {
  const errors = {}
  errors.street = validateStreet(address.street)
  errors.city = validateCity(address.city)
  return errors
}

export function validateStreet(street) {
  return !street ? "Missing street" : null
}

export function validateCity(city) {
  return !city ? "Missing city" : null
}
