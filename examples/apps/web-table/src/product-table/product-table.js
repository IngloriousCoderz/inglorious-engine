import { getRows } from "@inglorious/web"
import {
  getPaginationInfo,
  getSortDirection,
  html,
  table,
} from "@inglorious/web"

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
    const pagination = getPaginationInfo(entity)

    return html`<div class="table">
      <div class="header">
        <div class="row">
          ${entity.columns.map(
            (column) =>
              html`<div
                class="column"
                style="width: ${column.width}px"
                @click=${() => api.notify("#table:sortChange", column.id)}
              >
                ${column.title}
                ${SORT_ICON[getSortDirection(entity, column.id)]}
              </div>`,
          )}
        </div>
      </div>

      <div class="body">
        ${getRows(entity).map(
          (product, index) =>
            html`<div class="row ${index % DIVISOR ? "even" : "odd"}">
              ${Object.values(product).map(
                (value, index) =>
                  html`<div
                    class="column"
                    style="width: ${entity.columns[index].width}px"
                  >
                    ${value}
                  </div>`,
              )}
            </div>`,
        )}
      </div>

      <div class="footer">
        <div class="row">
          <div>
            ${pagination.start} to ${pagination.end} of ${pagination.totalRows}
            entries
          </div>

          <div class="spacer"></div>

          <div class="row">
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
              class="page"
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
              @click=${() =>
                api.notify("#table:pageChange", pagination.totalPages)}
            >
              &#10095;|
            </button>
          </div>

          <div class="row">
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
}
