import {
  getPaginationInfo,
  getRows,
  getSortDirection,
  html,
  ref,
  repeat,
  table,
} from "@inglorious/web"
import { format } from "date-fns"

import { filters } from "./filters"
import classes from "./product-table.module.css"

const DIVISOR = 2
const FIRST_PAGE = 0
const LAST_PAGE = 1
const PRETTY_PAGE = 1
const PERCENTAGE_TO_FLEX = 0.01

const formatters = {
  isAvailable: (value) => (value ? "✔️" : "❌"),
  createdAt: (value) => format(value, "dd/MM/yyyy HH:mm"),
}

export const productTable = {
  ...table,

  mount(entity, containerEl) {
    const columns = containerEl.querySelectorAll(":scope > *")
    ;[...columns].forEach((column, index) => {
      entity.columns[index].width = column.offsetWidth
    })
  },

  render(entity, api) {
    const type = api.getType(entity.type)

    return html`<div class=${classes.table}>
      ${type.renderHeader(entity, api)} ${type.renderBody(entity, api)}
      ${type.renderFooter(entity, api)}
    </div> `
  },

  renderHeader(entity, api) {
    const type = api.getType(entity.type)

    return html`<div class=${classes.header}>
      <div
        class=${classes.row}
        ${ref((el) => {
          if (
            el &&
            entity.columns.some(({ width }) => typeof width === "string")
          ) {
            queueMicrotask(() => {
              api.notify(`#${entity.id}:mount`, el)
            })
          }
        })}
      >
        ${repeat(
          entity.columns,
          (column) => column.id,
          (column) => type.renderHeaderColumn(entity, column, api),
        )}
      </div>

      ${entity.search && type.renderSearchbar(entity, api)}
    </div>`
  },

  renderHeaderColumn(entity, column, api) {
    return html`<div class=${classes.column} style=${getColumnStyle(column)}>
      <div
        @click=${() =>
          column.isSortable &&
          api.notify(`#${entity.id}:sortChange`, column.id)}
        class=${classes.title}
      >
        ${column.title} ${getSortIcon(getSortDirection(entity, column.id))}
      </div>

      ${column.isFilterable && filters.render(entity, column, api)}
    </div>`
  },

  renderSearchbar(entity, api) {
    return html`<input
      name="search"
      type="text"
      placeholder=${entity.search.placeholder ?? "Fuzzy search..."}
      value=${entity.search.value}
      @input=${(event) =>
        api.notify(`#${entity.id}:searchChange`, event.target.value)}
      class=${classes.searchbar}
    />`
  },

  renderBody(entity, api) {
    const type = api.getType(entity.type)

    return html`<div class=${classes.body}>
      ${repeat(
        getRows(entity),
        (row) => row[entity.rowId ?? "id"],
        (item, index) => type.renderRow(entity, item, index, api),
      )}
    </div>`
  },

  renderRow(entity, row, index, api) {
    const type = api.getType(entity.type)
    const rowId = row[entity.rowId ?? "id"]

    return html`<div
      @click=${() => api.notify(`#${entity.id}:rowToggle`, rowId)}
      class="${classes.row} ${index % DIVISOR
        ? classes.even
        : classes.odd} ${entity.selection.includes(rowId)
        ? classes.selected
        : ""}"
    >
      ${Object.values(row).map((value, index) =>
        type.renderCell(entity, value, index, api),
      )}
    </div>`
  },

  renderCell(entity, cell, index, api) {
    const type = api.getType(entity.type)
    const column = entity.columns[index]

    return html`<div
      class=${`${classes.cell} ${column.type === "number" ? classes.textRight : ""} ${column.type === "date" ? classes.textRight : ""} ${column.type === "boolean" ? classes.textCenter : ""}`}
      style=${getColumnStyle(column)}
    >
      ${type.renderValue(cell, column, api)}
    </div>`
  },

  renderValue(value, column) {
    return formatters[column.formatter]?.(value) ?? value
  },

  renderFooter(entity, api) {
    const type = api.getType(entity.type)
    const pagination = getPaginationInfo(entity)

    return html`<div class=${classes.footer}>
        <div class=${classes.row}>
          <div>
            ${pagination.start + PRETTY_PAGE} to ${pagination.end} of ${pagination.totalRows}
            entries
          </div>

          ${type.renderPagination(entity, pagination, api)}

          <div class=${classes.row}>
            <div>Page size:</div>
            <select
              name="pageSize"
              @change=${(event) =>
                api.notify(
                  `#${entity.id}:pageSizeChange`,
                  Number(event.target.value),
                )}
            >
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>
        </div>
      </div>
    </div>`
  },

  renderPagination(entity, pagination, api) {
    return html`<div class=${classes.row}>
      <button
        ?disabled=${!pagination.hasPrevPage}
        @click=${() => api.notify(`#${entity.id}:pageChange`, FIRST_PAGE)}
      >
        |&#10094;
      </button>
      <button
        ?disabled=${!pagination.hasPrevPage}
        @click=${() => api.notify(`#${entity.id}:pagePrev`)}
      >
        &#10094;
      </button>
      <input
        name="page"
        type="number"
        min="1"
        max=${pagination.totalPages}
        value=${pagination.page + PRETTY_PAGE}
        class=${`${classes.page} ${classes.textRight}`}
        @input=${(event) =>
          api.notify(
            `#${entity.id}:pageChange`,
            Number(event.target.value) - PRETTY_PAGE,
          )}
      />
      /
      <span>${pagination.totalPages}</span>
      <button
        ?disabled="${!pagination.hasNextPage}"
        @click=${() => api.notify(`#${entity.id}:pageNext`)}
      >
        &#10095;
      </button>
      <button
        ?disabled=${!pagination.hasNextPage}
        @click=${() =>
          api.notify(
            `#${entity.id}:pageChange`,
            pagination.totalPages - LAST_PAGE,
          )}
      >
        &#10095;|
      </button>
    </div>`
  },
}

function getColumnStyle(column) {
  if (typeof column.width === "string") {
    if (column.width?.endsWith("%")) {
      // eslint-disable-next-line no-magic-numbers
      const percentage = Number(column.width.slice(0, -1))
      return `flex: ${percentage * PERCENTAGE_TO_FLEX}`
    }

    return `width: ${column.width}`
  }

  return `width: ${column.width}px`
}

function getSortIcon(direction) {
  switch (direction) {
    case "asc":
      return "▲"
    case "desc":
      return "▼"
    default:
      return "▲▼"
  }
}
