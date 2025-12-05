/* eslint-disable no-magic-numbers */

export const table = {
  init(entity) {
    initTable(entity)
  },

  create(entity) {
    initTable(entity)
  },

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

  sortsClear(entity) {
    entity.sorts = []
  },

  filter(entity, { columnId, value }) {
    if (value === null || value === undefined || value === "") {
      delete entity.filters[columnId]
    } else {
      entity.filters[columnId] = value
    }

    // Reset to first page when filtering
    if (entity.pagination) {
      entity.pagination.page = 0
    }
  },

  filtersClear(entity) {
    entity.filters = {}
    if (entity.pagination) {
      entity.pagination.page = 0
    }
  },

  pageChange(entity, page) {
    if (!entity.pagination) return

    const totalPages = Math.ceil(
      getTotalRows(entity) / entity.pagination.pageSize,
    )
    entity.pagination.page = Math.max(0, Math.min(page, totalPages - 1))
  },

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

  pagePrev(entity) {
    if (!entity.pagination) return
    entity.pagination.page = Math.max(entity.pagination.page - 1, 0)
  },

  pageSizeChange(entity, pageSize) {
    if (!entity.pagination) return

    entity.pagination.pageSize = pageSize
    entity.pagination.page = 0
  },

  rowSelect(entity, rowId) {
    if (!entity.selection.includes(rowId)) {
      entity.selection.push(rowId)
    }
  },

  rowDeselect(entity, rowId) {
    const index = entity.selection.indexOf(rowId)
    if (index !== -1) {
      entity.selection.splice(index, 1)
    }
  },

  rowToggle(entity, rowId) {
    const index = entity.selection.indexOf(rowId)
    if (index === -1) {
      entity.selection.push(rowId)
    } else {
      entity.selection.splice(index, 1)
    }
  },

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

  rowsSelectAll(entity) {
    const rows = getRows(entity)
    rows.forEach((row) => {
      if (!entity.selection.includes(row.id)) {
        entity.selection.push(row.id)
      }
    })
  },

  selectionClear(entity) {
    entity.selection.length = 0
  },
}

// Helper functions outside the type (like form helpers)

export function getRows(entity) {
  let rows = entity.data || []

  // Filtering
  if (Object.keys(entity.filters).length > 0) {
    rows = rows.filter((row) => {
      return Object.entries(entity.filters).every(([columnId, filterValue]) => {
        const column = entity.columns.find((c) => c.id === columnId)
        if (!column) return true

        // Custom filter function
        if (column.filterFn) {
          return column.filterFn(row, filterValue)
        }

        // Default filters by type
        const value = row[columnId]

        if (column.type === "number") {
          if (typeof filterValue === "object") {
            const { min, max } = filterValue
            if (min !== undefined && value < min) return false
            if (max !== undefined && value > max) return false
            return true
          }
          return value === filterValue
        }

        if (column.type === "boolean") {
          return value === filterValue
        }

        // String filtering (case-insensitive contains)
        return String(value)
          .toLowerCase()
          .includes(String(filterValue).toLowerCase())
      })
    })
  }

  // Sorting
  if (entity.sorts.length) {
    rows = [...rows].sort((a, b) => {
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

  // Pagination
  if (entity.pagination) {
    const { page, pageSize } = entity.pagination
    const start = page * pageSize
    rows = rows.slice(start, start + pageSize)
  }

  return rows
}

export function getTotalRows(entity) {
  if (!entity.data) return 0

  // If no filters, return total data length
  if (Object.keys(entity.filters).length === 0) {
    return entity.data.length
  }

  // Count filtered rows
  return entity.data.filter((row) => {
    return Object.entries(entity.filters).every(([columnId, filterValue]) => {
      const column = entity.columns.find((c) => c.id === columnId)
      if (!column) return true

      // Custom filter function
      if (column.filterFn) {
        return column.filterFn(row, filterValue)
      }

      // Default filters by type
      const value = row[columnId]

      if (column.type === "number") {
        if (typeof filterValue === "object") {
          const { min, max } = filterValue
          if (min !== undefined && value < min) return false
          if (max !== undefined && value > max) return false
          return true
        }
        return value === filterValue
      }

      if (column.type === "boolean") {
        return value === filterValue
      }

      // String filtering (case-insensitive contains)
      return String(value)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase())
    })
  }).length
}

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

export function getSortDirection(entity, columnId) {
  const sort = entity.sorts.find((s) => s.column === columnId)
  return sort?.direction || null
}

export function getSortIndex(entity, columnId) {
  return entity.sorts.findIndex((s) => s.column === columnId)
}

export function getFilter(entity, columnId) {
  return entity.filters[columnId]
}

export function isRowSelected(entity, rowId) {
  return entity.selection.includes(rowId)
}

export function isAllSelected(entity) {
  const rows = getRows(entity)
  return rows.length && rows.every((row) => entity.selection.includes(row.id))
}

export function isSomeSelected(entity) {
  const rows = getRows(entity)
  const selectedCount = rows.filter((row) =>
    entity.selection.includes(row.id),
  ).length
  return selectedCount && selectedCount < rows.length
}

function initTable(entity) {
  // Auto-generate columns from first data item if not provided
  if (!entity.columns && entity.data?.length) {
    const [firstRow] = entity.data

    entity.columns = Object.keys(firstRow).map((key) => {
      const value = firstRow[key]
      const type = getDefaultColumnType(value)
      const [firstChar, ...rest] = key

      return {
        id: key,
        title: [firstChar.toUpperCase(), ...rest].join(""),
        isSortable: true,
        isFilterable: type !== "boolean",
        type,
        width: getDefaultColumnWidth(type),
      }
    })
  } else {
    entity.columns ??= []
  }

  // State
  entity.sorts ??= []
  entity.filters ??= {}
  entity.selection ??= []

  // Pagination (null = disabled)
  entity.pagination ??= null

  if (entity.pagination) {
    entity.pagination.page ??= 0
  }
}

function getDefaultColumnType(value) {
  if (typeof value === "number") return "number"
  if (typeof value === "boolean") return "boolean"
  if (value instanceof Date) return "date"
  return "string"
}

function getDefaultColumnWidth(type) {
  if (type === "number") return 100
  if (type === "boolean") return 80
  if (type === "date") return 120
  return 200
}
