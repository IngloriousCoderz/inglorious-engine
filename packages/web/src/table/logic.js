/* eslint-disable no-magic-numbers */

/**
 * @typedef {import('../../types/table').TableEntity} TableEntity
 * @typedef {import('../../types/table').TableColumn} TableColumn
 */

export const logic = {
  /**
   * Initializes the table entity.
   * @param {TableEntity} entity
   */
  init(entity) {
    initTable(entity)
  },

  /**
   * Resets the table entity when a 'create' event payload matches its ID.
   * @param {TableEntity} entity
   * @param {string|number} id
   */
  create(entity, id) {
    if (id !== entity.id) return
    initTable(entity)
  },

  /**
   * Toggles sorting for a column.
   * @param {TableEntity} entity
   * @param {string} columnId
   */
  sortChange(entity, columnId) {
    const column = entity.columns.find((c) => c.id === columnId)
    if (!column?.isSortable) return

    const existingIndex = entity.sorts.findIndex((s) => s.column === columnId)

    if (existingIndex !== -1) {
      // Toggle direction
      const existing = entity.sorts[existingIndex]
      if (existing.direction === "asc") {
        existing.direction = "desc"
      } else {
        // Remove from sort if going from desc back to nothing
        entity.sorts.splice(existingIndex, 1)
      }
    } else {
      // Add new sort
      entity.sorts.push({ column: columnId, direction: "asc" })
    }

    if (entity.pagination) {
      entity.pagination.page = 0
    }
  },

  /**
   * Clears all sorts.
   * @param {TableEntity} entity
   */
  sortsClear(entity) {
    entity.sorts = []
  },

  /**
   * Updates a filter value for a column.
   * @param {TableEntity} entity
   * @param {{ columnId: string, value: any }} payload
   */
  filterChange(entity, { columnId, value }) {
    if (value == null || value === "") {
      delete entity.filters[columnId]
    } else {
      entity.filters[columnId] = value
    }

    // Reset to first page when filtering
    if (entity.pagination) {
      entity.pagination.page = 0
    }
  },

  /**
   * Clears all filters.
   * @param {TableEntity} entity
   */
  filtersClear(entity) {
    entity.filters = {}
    if (entity.pagination) {
      entity.pagination.page = 0
    }
  },

  /**
   * Updates the search term.
   * @param {TableEntity} entity
   * @param {string} search
   */
  searchChange(entity, search) {
    entity.search.value = search
  },

  /**
   * Changes the current page.
   * @param {TableEntity} entity
   * @param {number} page
   */
  pageChange(entity, page) {
    if (!entity.pagination) return

    const totalPages = Math.ceil(
      getTotalRows(entity) / entity.pagination.pageSize,
    )
    entity.pagination.page = Math.max(0, Math.min(page, totalPages - 1))
  },

  /**
   * Moves to the next page.
   * @param {TableEntity} entity
   */
  pageNext(entity) {
    if (!entity.pagination) return
    const totalPages = Math.ceil(
      getTotalRows(entity) / entity.pagination.pageSize,
    )
    entity.pagination.page = Math.min(
      entity.pagination.page + 1,
      totalPages - 1,
    )
  },

  /**
   * Moves to the previous page.
   * @param {TableEntity} entity
   */
  pagePrev(entity) {
    if (!entity.pagination) return
    entity.pagination.page = Math.max(entity.pagination.page - 1, 0)
  },

  /**
   * Changes the page size.
   * @param {TableEntity} entity
   * @param {number} pageSize
   */
  pageSizeChange(entity, pageSize) {
    if (!entity.pagination) return

    entity.pagination.pageSize = pageSize
    entity.pagination.page = 0
  },

  /**
   * Selects a row.
   * @param {TableEntity} entity
   * @param {string|number} rowId
   */
  rowSelect(entity, rowId) {
    if (!entity.isMultiSelect) {
      entity.selection = []
    }

    if (!entity.selection.includes(rowId)) {
      entity.selection.push(rowId)
    }
  },

  /**
   * Deselects a row.
   * @param {TableEntity} entity
   * @param {string|number} rowId
   */
  rowDeselect(entity, rowId) {
    const index = entity.selection.indexOf(rowId)
    if (index !== -1) {
      entity.selection.splice(index, 1)
    }
  },

  /**
   * Toggles row selection.
   * @param {TableEntity} entity
   * @param {string|number} rowId
   */
  rowToggle(entity, rowId) {
    const index = entity.selection.indexOf(rowId)

    if (index === -1) {
      if (!entity.isMultiSelect) {
        entity.selection = [rowId] // Replace entirely
      } else {
        entity.selection.push(rowId)
      }
    } else {
      entity.selection.splice(index, 1)
    }
  },

  /**
   * Toggles selection of all currently visible rows.
   * @param {TableEntity} entity
   */
  rowsToggleAll(entity) {
    const rows = getRows(entity)
    const allSelected = rows.every((row) => entity.selection.includes(row.id))

    if (allSelected) {
      // Deselect all visible
      rows.forEach((row) => {
        const index = entity.selection.indexOf(row.id)
        if (index !== -1) entity.selection.splice(index, 1)
      })
    } else {
      // Select all visible
      rows.forEach((row) => {
        if (!entity.selection.includes(row.id)) {
          entity.selection.push(row.id)
        }
      })
    }
  },

  /**
   * Selects all currently visible rows.
   * @param {TableEntity} entity
   */
  rowsSelectAll(entity) {
    const rows = getRows(entity)
    rows.forEach((row) => {
      if (!entity.selection.includes(row.id)) {
        entity.selection.push(row.id)
      }
    })
  },

  /**
   * Clears all row selections.
   * @param {TableEntity} entity
   */
  selectionClear(entity) {
    entity.selection.length = 0
  },
}

// Helper functions

/**
 * Gets the processed rows (filtered, searched, sorted, paginated).
 * @param {TableEntity} entity
 * @returns {any[]}
 */
export function getRows(entity) {
  let rows = entity.data
  rows = applyFilters(entity, rows)
  rows = applySearch(entity, rows)
  rows = applySorts(entity, rows)
  rows = applyPagination(entity, rows)

  return rows
}

/**
 * Gets the total number of rows after filtering and searching.
 * @param {TableEntity} entity
 * @returns {number}
 */
export function getTotalRows(entity) {
  let rows = entity.data
  rows = applyFilters(entity, rows)
  rows = applySearch(entity, rows)
  return rows.length
}

/**
 * Gets pagination information.
 * @param {TableEntity} entity
 * @returns {object|null}
 */
export function getPaginationInfo(entity) {
  if (!entity.pagination) return null

  const totalRows = getTotalRows(entity)
  const { page, pageSize } = entity.pagination
  const totalPages = Math.ceil(totalRows / pageSize)
  const start = page * pageSize
  const end = Math.min((page + 1) * pageSize, totalRows)

  return {
    page,
    pageSize,
    totalPages,
    totalRows,
    start,
    end,
    hasNextPage: page < totalPages - 1,
    hasPrevPage: page > 0,
  }
}

/**
 * Gets the sort direction for a column.
 * @param {TableEntity} entity
 * @param {string} columnId
 * @returns {"asc"|"desc"|null}
 */
export function getSortDirection(entity, columnId) {
  const sort = entity.sorts.find((s) => s.column === columnId)
  return sort?.direction || null
}

/**
 * Gets the sort index (priority) for a column.
 * @param {TableEntity} entity
 * @param {string} columnId
 * @returns {number}
 */
export function getSortIndex(entity, columnId) {
  return entity.sorts.findIndex((s) => s.column === columnId)
}

/**
 * Gets the filter value for a column.
 * @param {TableEntity} entity
 * @param {string} columnId
 * @returns {any}
 */
export function getFilter(entity, columnId) {
  return entity.filters[columnId]
}

/**
 * Checks if a row is selected.
 * @param {TableEntity} entity
 * @param {string|number} rowId
 * @returns {boolean}
 */
export function isRowSelected(entity, rowId) {
  return entity.selection.includes(rowId)
}

/**
 * Checks if all visible rows are selected.
 * @param {TableEntity} entity
 * @returns {boolean}
 */
export function isAllSelected(entity) {
  const rows = getRows(entity)
  return rows.length && rows.every((row) => entity.selection.includes(row.id))
}

/**
 * Checks if some (but not all) visible rows are selected.
 * @param {TableEntity} entity
 * @returns {boolean}
 */
export function isSomeSelected(entity) {
  const rows = getRows(entity)
  const selectedCount = rows.filter((row) =>
    entity.selection.includes(row.id),
  ).length
  return selectedCount && selectedCount < rows.length
}

// Private helper functions

/**
 * Initializes the table state.
 * @param {TableEntity} entity
 */
function initTable(entity) {
  entity.data ??= []

  // Auto-generate columns from first data item if not provided
  if (!entity.columns && entity.data.length) {
    const [firstRow] = entity.data

    entity.columns = Object.keys(firstRow).map((key) => {
      const value = firstRow[key]
      const type = getDefaultColumnType(value)
      const filter = getDefaultColumnFilter(type)

      return {
        id: key,
        title: capitalize(key),
        type,
        isSortable: false,
        isFilterable: false,
        filter,
        width: getDefaultColumnWidth(filter.type),
      }
    })
  } else {
    entity.columns ??= []
    entity.columns.forEach((column) => {
      column.title ??= capitalize(column.id)
      column.type ??= getDefaultColumnType()
      column.filter ??= getDefaultColumnFilter(column.type)
      column.width ??= getDefaultColumnWidth(column.filter.type)
    })
  }

  // State
  entity.sorts ??= []
  entity.filters ??= {}
  entity.search ??= null
  if (entity.search) {
    entity.search.value ??= ""
  }
  entity.selection ??= []

  entity.pagination ??= null
  if (entity.pagination) {
    entity.pagination.page ??= 0
  }
}

/**
 * Infers the column type from a value.
 * @param {any} value
 * @returns {string}
 */
function getDefaultColumnType(value) {
  if (typeof value === "number") return "number"
  if (typeof value === "boolean") return "boolean"
  if (value instanceof Date) return "date"
  return "string"
}

/**
 * Gets the default filter configuration for a column type.
 * @param {string} type
 * @returns {object}
 */
function getDefaultColumnFilter(type) {
  if (type === "number") return { type: "range" }
  if (type === "boolean")
    return { type: "select", options: [null, true, false] }
  if (type === "date") return { type: "date" }
  return { type: "text" }
}

/**
 * Gets the default column width based on filter type.
 * @param {string} filterType
 * @returns {number}
 */
function getDefaultColumnWidth(filterType) {
  if (filterType === "number") return 70
  if (filterType === "range") return 100
  if (filterType === "select") return 70
  if (filterType === "date") return 120
  if (filterType === "time") return 120
  if (filterType === "datetime") return 170
  return 200
}

/**
 * Applies filters to the data.
 * @param {TableEntity} entity
 * @param {any[]} rows
 * @returns {any[]}
 */
function applyFilters(entity, rows) {
  if (!Object.keys(entity.filters).length) {
    return rows
  }

  return rows.filter((row) => {
    return Object.entries(entity.filters).every(([columnId, filterValue]) => {
      const column = entity.columns.find((c) => c.id === columnId)
      if (!column) return true

      // Custom filter function
      if (column.filterFn) {
        return column.filterFn(row, filterValue)
      }

      // Default filters by type
      const value = row[columnId]

      if (["range", "date", "time", "datetime"].includes(column.filter.type)) {
        const { min, max } = filterValue
        if (min != null && value < min) return false
        if (max != null && value > max) return false
        return true
      }

      if (["number", "boolean", "select"].includes(column.filter.type)) {
        return value === filterValue
      }

      // String filtering (case-insensitive contains)
      return String(value)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase())
    })
  })
}

/**
 * Applies search to the data.
 * @param {TableEntity} entity
 * @param {any[]} rows
 * @returns {any[]}
 */
function applySearch(entity, rows) {
  if (!entity.search?.value) {
    return rows
  }

  const searchLower = entity.search.value.toLowerCase()

  return rows.filter((row) =>
    entity.columns.some((column) => {
      const value = row[column.id]
      const formattedValue = column.format?.(value) ?? String(value)
      return formattedValue.toLowerCase().includes(searchLower)
    }),
  )
}

/**
 * Applies sorting to the data.
 * @param {TableEntity} entity
 * @param {any[]} rows
 * @returns {any[]}
 */
function applySorts(entity, rows) {
  if (!entity.sorts.length) {
    return rows
  }

  return [...rows].sort((a, b) => {
    for (const { column: columnId, direction } of entity.sorts) {
      const column = entity.columns.find((c) => c.id === columnId)
      let aVal = a[columnId]
      let bVal = b[columnId]

      // Custom sort function
      if (column?.sortFn) {
        const result =
          direction === "asc" ? column.sortFn(a, b) : column.sortFn(b, a)
        if (result !== 0) return result
        continue
      }

      // Default sorting
      if (aVal === bVal) continue
      if (aVal == null) return 1
      if (bVal == null) return -1

      const comparison = aVal < bVal ? -1 : 1
      return direction === "asc" ? comparison : -comparison
    }
    return 0
  })
}

/**
 * Applies pagination to the data.
 * @param {TableEntity} entity
 * @param {any[]} rows
 * @returns {any[]}
 */
function applyPagination(entity, rows) {
  if (!entity.pagination) {
    return rows
  }

  const { page, pageSize } = entity.pagination
  const start = page * pageSize
  return rows.slice(start, start + pageSize)
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  const [firstChar, ...rest] = str
  return [firstChar.toUpperCase(), ...rest].join("")
}
