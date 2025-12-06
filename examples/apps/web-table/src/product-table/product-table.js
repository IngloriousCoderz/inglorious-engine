import { getRows } from "@inglorious/web"
import {
  getPaginationInfo,
  getSortDirection,
  html,
  table,
} from "@inglorious/web"

import classes from "./product-table.module.css"

const DIVISOR = 2
const FIRST_PAGE = 0
const PRETTY_PAGE = 1

const SORT_ICON = {
  asc: "▲",
  desc: "▼",
}

export const productTable = {
  ...table,

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
      <div class=${classes.row}>
        ${entity.columns.map((column) =>
          type.renderHeaderColumn(entity, column, api),
        )}
      </div>
    </div>`
  },

  renderHeaderColumn(entity, column, api) {
    return html`<div
      class=${classes.column}
      style="width: ${column.width}px"
      @click=${() => api.notify("#table:sortChange", column.id)}
    >
      ${column.title} ${SORT_ICON[getSortDirection(entity, column.id)]}
    </div>`
  },

  renderBody(entity, api) {
    const type = api.getType(entity.type)

    return html`<div class=${classes.body}>
      ${getRows(entity).map((item, index) =>
        type.renderRow(entity, item, index, api),
      )}
    </div>`
  },

  renderRow(entity, item, index, api) {
    const type = api.getType(entity.type)

    return html`<div
      class="${classes.row} ${index % DIVISOR ? classes.even : classes.odd}"
    >
      ${Object.values(item).map((value, index) =>
        type.renderColumn(entity, value, index, api),
      )}
    </div>`
  },

  renderColumn(entity, value, index) {
    return html`<div
      class=${classes.column}
      style="width: ${entity.columns[index].width}px"
    >
      ${value}
    </div>`
  },

  renderFooter(entity, api) {
    const type = api.getType(entity.type)
    const pagination = getPaginationInfo(entity)

    return html`<div class=${classes.footer}>
        <div class=${classes.row}>
          <div>
            ${pagination.start} to ${pagination.end} of ${pagination.totalRows}
            entries
          </div>

          ${type.renderPagination(pagination, api)}

          <div class=${classes.row}>
            <div>Page size:</div>
            <select
              name="pageSize"
              @change=${(event) =>
                api.notify("#table:pageSizeChange", event.target.value)}
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

  renderPagination(pagination, api) {
    return html`<div class=${classes.row}>
      <button
        ?disabled=${!pagination.hasPrevPage}
        @click=${() => api.notify("#table:pageChange", FIRST_PAGE)}
      >
        |&#10094;
      </button>
      <button
        ?disabled=${!pagination.hasPrevPage}
        @click=${() => api.notify("#table:pagePrev")}
      >
        &#10094;
      </button>
      <input
        name="page"
        type="number"
        min="1"
        max=${pagination.totalPages}
        value=${pagination.page + PRETTY_PAGE}
        class=${classes.page}
        @input=${(event) =>
          api.notify(
            "#table:pageChange",
            Number(event.target.value) - PRETTY_PAGE,
          )}
      />
      /
      <span>${pagination.totalPages}</span>
      <button
        ?disabled="${!pagination.hasNextPage}"
        @click=${() => api.notify("#table:pageNext")}
      >
        &#10095;
      </button>
      <button
        ?disabled=${!pagination.hasNextPage}
        @click=${() => api.notify("#table:pageChange", pagination.totalPages)}
      >
        &#10095;|
      </button>
    </div>`
  },
}
