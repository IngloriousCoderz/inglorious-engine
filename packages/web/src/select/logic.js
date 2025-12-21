/* eslint-disable no-magic-numbers */

/**
 * @typedef {import('../../types/select').SelectEntity} SelectEntity
 * @typedef {import('../../types/select').SelectOption} SelectOption
 */

export const logic = {
  /**
   * Resets the select entity with default state.
   * @param {SelectEntity} entity
   */
  create(entity) {
    initSelect(entity)
  },

  /**
   * Opens the select dropdown.
   * @param {SelectEntity} entity
   */
  open(entity) {
    openSelect(entity)
  },

  /**
   * Closes the select dropdown.
   * @param {SelectEntity} entity
   */
  close(entity) {
    closeSelect(entity)
  },

  /**
   * Toggles the select dropdown open/closed state.
   * @param {SelectEntity} entity
   */
  toggle(entity) {
    if (entity.isOpen) {
      closeSelect(entity)
    } else {
      openSelect(entity)
    }
  },

  /**
   * Selects an option.
   * @param {SelectEntity} entity
   * @param {SelectOption} option
   */
  optionSelect(entity, option) {
    if (entity.isDisabled) return

    const optionValue = getOptionValue(option)

    if (entity.isMulti) {
      // Multi-select: add or remove from array
      const index = entity.selectedValue.indexOf(optionValue)

      if (index === -1) {
        entity.selectedValue.push(optionValue)
      } else {
        entity.selectedValue.splice(index, 1)
      }
    } else {
      // Single select: substitute value and close
      entity.selectedValue = optionValue
      closeSelect(entity)
    }
  },

  /**
   * Clears the current selection.
   * @param {SelectEntity} entity
   */
  clear(entity) {
    if (entity.isDisabled) return

    entity.selectedValue = entity.isMulti ? [] : null
  },

  /**
   * Updates the search term and filters options.
   * @param {SelectEntity} entity
   * @param {string} searchTerm
   */
  searchChange(entity, searchTerm) {
    entity.searchTerm = searchTerm

    if (entity.isRemote) {
      entity.isLoading = true
      entity.error = null
      return
    }

    const filteredOptions = filterOptions(entity.options, entity.searchTerm)

    entity.focusedIndex = filteredOptions.length ? 0 : -1
  },

  /**
   * Moves focus to the next option.
   * @param {SelectEntity} entity
   */
  focusNext(entity) {
    const filteredOptions = filterOptions(entity.options, entity.searchTerm)

    if (!filteredOptions.length) return

    entity.focusedIndex = Math.min(
      entity.focusedIndex + 1,
      filteredOptions.length - 1,
    )
  },

  /**
   * Moves focus to the previous option.
   * @param {SelectEntity} entity
   */
  focusPrev(entity) {
    entity.focusedIndex = Math.max(entity.focusedIndex - 1, -1)
  },

  /**
   * Moves focus to the first option.
   * @param {SelectEntity} entity
   */
  focusFirst(entity) {
    const filteredOptions = filterOptions(entity.options, entity.searchTerm)

    if (filteredOptions.length) {
      entity.focusedIndex = 0
    }
  },

  /**
   * Moves focus to the last option.
   * @param {SelectEntity} entity
   */
  focusLast(entity) {
    const filteredOptions = filterOptions(entity.options, entity.searchTerm)
    if (filteredOptions.length) {
      entity.focusedIndex = filteredOptions.length - 1
    }
  },
}

// Helper functions

/**
 * Get the value of an option.
 * @param {SelectOption} option
 * @returns {string|number}
 */
export function getOptionValue(option) {
  if (typeof option === "object" && option !== null && "value" in option) {
    return option.value
  }

  return option
}

/**
 * Get the label of an option.
 * @param {SelectOption} option
 * @returns {string}
 */
export function getOptionLabel(option) {
  if (typeof option === "object" && option !== null && "label" in option) {
    return String(option.label)
  }

  if (typeof option === "object" && option !== null && "value" in option) {
    return String(option.value)
  }

  return String(option)
}

/**
 * Filter options based on searchTerm.
 * Search in label (case-insensitive).
 * @param {SelectOption[]} options
 * @param {string} searchTerm
 * @returns {SelectOption[]}
 */
export function filterOptions(options, searchTerm) {
  if (!searchTerm || searchTerm.trim() === "") {
    return options
  }

  const searchLower = String(searchTerm).toLowerCase().trim()

  return options.filter((option) => {
    const label = getOptionLabel(option)
    return label.toLowerCase().includes(searchLower)
  })
}

/**
 * Check if an option is selected.
 * For single: compare value.
 * For multi: check if it is in the array.
 * @param {SelectOption} option
 * @param {string|number|(string|number)[]} selectedValue
 * @param {boolean} isMulti
 * @returns {boolean}
 */
export function isOptionSelected(option, selectedValue, isMulti) {
  const optionValue = getOptionValue(option)

  if (isMulti && Array.isArray(selectedValue)) {
    return selectedValue.some((val) => val === optionValue)
  }

  return selectedValue === optionValue
}

/**
 * Find the index of an option by value.
 * @param {SelectOption[]} options
 * @param {string|number} value
 * @returns {number}
 */
export function findOptionIndex(options, value) {
  return options.findIndex((option) => getOptionValue(option) === value)
}

/**
 * Group options by a property.
 * Returns: [{label: "Group 1", options: [...]}, ...].
 * @param {SelectOption[]} options
 * @param {string} groupBy
 * @returns {{label: string, options: SelectOption[]}[] | null}
 */
export function groupOptions(options, groupBy) {
  if (!groupBy || typeof groupBy !== "string") {
    return null
  }

  const groups = new Map()

  options.forEach((option) => {
    const groupKey = option[groupBy] ?? "Ungrouped"

    if (!groups.has(groupKey)) {
      groups.set(groupKey, [])
    }

    groups.get(groupKey).push(option)
  })

  return Array.from(groups.entries()).map(([label, options]) => ({
    label,
    options,
  }))
}

/**
 * Normalize an option to the standard format {value, label}.
 * Accepts: string, number, or object {value, label, ...}.
 * @param {SelectOption} option
 * @returns {{value: string|number, label: string}}
 */
export function formatOption(option) {
  if (typeof option === "string" || typeof option === "number") {
    return { value: option, label: String(option) }
  }

  if (typeof option === "object" && option !== null) {
    return {
      value: option.value ?? option,
      label: option.label ?? String(option.value ?? option),
      ...option, // Preserve other properties (disabled, group, etc)
    }
  }

  return { value: option, label: String(option) }
}

// Private helper functions

function initSelect(entity) {
  // Dropdown state
  entity.isOpen ??= false
  entity.searchTerm ??= ""
  entity.focusedIndex ??= -1

  // Selected values
  entity.isMulti ??= false
  entity.selectedValue ??= entity.isMulti ? [] : null

  // Options
  entity.options ??= []

  // States
  entity.isLoading ??= false
  entity.error ??= null
  entity.isDisabled ??= false
  entity.isSearchable ??= true
  entity.isClearable ??= true
  entity.isCreatable ??= false

  // Messages
  entity.placeholder ??= "Select..."
  entity.noOptionsMessage ??= "No options"
  entity.loadingMessage ??= "Loading..."

  // Group by
  entity.groupBy ??= null
}

function closeSelect(entity) {
  entity.isOpen = false
  entity.focusedIndex = -1
}

function openSelect(entity) {
  if (entity.isDisabled) return

  entity.isOpen = true

  // If searchable, the input will be focused during rendering
  // Reset focusedIndex
  entity.focusedIndex = -1

  const filteredOptions = filterOptions(entity.options, entity.searchTerm)

  // if there are no filtered options and not loading, focus the first option
  if (filteredOptions.length && !entity.isLoading) {
    entity.focusedIndex = 0
  }
}
