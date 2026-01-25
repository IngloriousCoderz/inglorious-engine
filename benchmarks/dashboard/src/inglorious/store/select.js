const SAME = 0

export const selectRows = (entities) => entities.table.data
const selectFilter = (entities) => entities.metrics.filter
const selectSortBy = (entities) => entities.metrics.sortBy

export const selectFilteredRows = (entities) => {
  const rows = selectRows(entities)
  const filter = selectFilter(entities)
  const sortBy = selectSortBy(entities)

  return rows
    .filter((row) => {
      return (
        row.name.toLowerCase().includes(filter.toLowerCase()) ||
        row.status.toLowerCase().includes(filter.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortBy === "id") return a.id - b.id
      if (sortBy === "value") return b.value - a.value
      if (sortBy === "progress") return b.progress - a.progress
      return SAME
    })
}

export const selectChartData = (entities, start, end) => {
  const rows = selectRows(entities)
  const values = rows.slice(start, end).map((r) => r.value)
  const max = Math.max(...values)
  const avg = Math.floor(values.reduce((a, b) => a + b) / values.length)
  return { values, max, avg }
}
