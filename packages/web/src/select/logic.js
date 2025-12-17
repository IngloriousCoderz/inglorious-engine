/* eslint-disable no-magic-numbers */

export const logic = {
  init(entity) {
    initSelect(entity)
  },

  create(entity) {
    initSelect(entity)
  },

  open(entity) {
    openSelect(entity)
  },

  close(entity) {
    closeSelect(entity)
  },

  toggle(entity) {
    if (entity.isOpen) {
      closeSelect(entity)
    } else {
      openSelect(entity)
    }
  },

  selectOption(entity, option) {
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

  clear(entity) {
    if (entity.isDisabled) return

    entity.selectedValue = entity.isMulti ? [] : null
  },

  searchChange(entity, searchTerm) {
    entity.searchTerm = searchTerm

    if (entity.remote) {
      entity.isLoading = true
      entity.error = null
      return
    }

    entity.filteredOptions = filterOptions(entity.options, searchTerm)
    entity.focusedIndex = entity.filteredOptions.length > 0 ? 0 : -1
  },

  /**
   * Next option (keyboard navigation)
   */
  focusNext(entity) {
    if (entity.filteredOptions.length === 0) return

    entity.focusedIndex = Math.min(
      entity.focusedIndex + 1,
      entity.filteredOptions.length - 1,
    )
  },

  /**
   * previous option (keyboard navigation)
   */
  focusPrev(entity) {
    entity.focusedIndex = Math.max(entity.focusedIndex - 1, -1)
  },

  /**
   * first option (keyboard navigation)
   */
  focusFirst(entity) {
    if (entity.filteredOptions.length > 0) {
      entity.focusedIndex = 0
    }
  },

  /**
   * Last option (keyboard navigation)
   */
  focusLast(entity) {
    if (entity.filteredOptions.length > 0) {
      entity.focusedIndex = entity.filteredOptions.length - 1
    }
  },
}

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
  entity.filteredOptions ??= []

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

  // API (optional)
  entity.source ??= null
  entity.remote ??= !!entity.source

  // Initial filtering
  if (!entity.remote) {
    entity.filteredOptions = filterOptions(entity.options, entity.searchTerm)
  }
}

function closeSelect(entity) {
  entity.isOpen = false
  entity.focusedIndex = -1
}

function openSelect(entity) {
  if (entity.isDisabled) return

  entity.isOpen = true

  // Se for searchable, o input será focado no rendering
  // Resetar focusedIndex
  entity.focusedIndex = -1

  // if there are no filtered options and not loading, focus the first option
  if (entity.filteredOptions.length > 0 && !entity.isLoading) {
    entity.focusedIndex = 0
  }
}

// Helper functions (following table pattern)

/**
 * Get the value of an option
 */
export function getOptionValue(option) {
  if (typeof option === "object" && option !== null && "value" in option) {
    return option.value
  }

  return option
}

/**
 * Get the label of an option
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
 * Filter options based on searchTerm
 * Search in label (case-insensitive)
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
 * Check if an option is selected
 * For single: compare value
 * For multi: check if it is in the array
 */
export function isOptionSelected(option, selectedValue, isMulti) {
  const optionValue = getOptionValue(option)

  if (isMulti && Array.isArray(selectedValue)) {
    return selectedValue.some((val) => val === optionValue)
  }

  return selectedValue === optionValue
}

/**
 * Find the index of an option by value
 */
export function findOptionIndex(options, value) {
  return options.findIndex((option) => getOptionValue(option) === value)
}

/**
 * Group options by a property
 * Returns: [{label: "Group 1", options: [...]}, ...]
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
 * Normalize an option to the standard format {value, label}
 * Accepts: string, number, or object {value, label, ...}
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
