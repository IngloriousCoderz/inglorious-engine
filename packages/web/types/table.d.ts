import type { TemplateResult } from "lit-html"
import type { Api } from "./mount"

/**
 * Represents a column definition for the table.
 */
export interface TableColumn {
  /** The unique identifier for the column (usually matches a property in the data). */
  id: string
  /** The display label for the column header. */
  title: string
  /** The type of data in the column. */
  type?: "string" | "number" | "boolean" | "date"
  /** Whether the column is sortable. */
  isSortable?: boolean
  /** Whether the column is filterable. */
  isFilterable?: boolean
  /** Filter configuration. */
  filter?: {
    type: "text" | "number" | "range" | "select" | "date" | "time" | "datetime"
    options?: any[]
    [key: string]: any
  }
  /** The width of the column. */
  width?: number
  /** Optional formatter key or function. */
  formatter?: string | ((value: any) => any)
  /** Custom sort function. */
  sortFn?: (a: any, b: any) => number
  /** Custom filter function. */
  filterFn?: (row: any, filterValue: any) => boolean
  /** Custom format function. */
  format?: (value: any) => string
  /** Any other custom properties. */
  [key: string]: any
}

/**
 * Represents the state of a table entity.
 */
export interface TableEntity<T = any> {
  /** A unique identifier for the table entity. */
  id: string | number
  /** The entity type. */
  type: string
  /** The data array to display. */
  data: T[]
  /** The column definitions. */
  columns: TableColumn[]
  /** Sorting state. */
  sorts: { column: string; direction: "asc" | "desc" }[]
  /** Filtering state. */
  filters: Record<string, any>
  /** Search state. */
  search: { value: string } | null
  /** Selected row IDs. */
  selection: (string | number)[]
  /** Pagination state. */
  pagination: { page: number; pageSize: number } | null
  /** Whether multi-select is enabled. */
  isMultiSelect: boolean
  /** Any other custom properties. */
  [key: string]: any
}

/**
 * The table type implementation.
 */
export declare const table: {
  /**
   * Initializes the table entity.
   * @param entity The table entity.
   */
  init(entity: TableEntity): void

  /**
   * Resets the table entity when a 'create' event payload matches its ID.
   * @param entity The table entity.
   * @param id The ID of the entity to create/reset.
   */
  create(entity: TableEntity, id: string): void

  /**
   * Toggles sorting for a specific column.
   * @param entity The table entity.
   * @param columnId The ID of the column to sort by.
   */
  sortChange(entity: TableEntity, columnId: string): void

  /**
   * Clears all active sorts.
   * @param entity The table entity.
   */
  sortsClear(entity: TableEntity): void

  /**
   * Updates the filter value for a specific column.
   * @param entity The table entity.
   * @param payload The filter change payload containing columnId and value.
   */
  filterChange(
    entity: TableEntity,
    payload: { columnId: string; value: any },
  ): void

  /**
   * Clears all active filters.
   * @param entity The table entity.
   */
  filtersClear(entity: TableEntity): void

  /**
   * Updates the global search term.
   * @param entity The table entity.
   * @param search The new search string.
   */
  searchChange(entity: TableEntity, search: string): void

  /**
   * Changes the current page index.
   * @param entity The table entity.
   * @param page The new page index (0-based).
   */
  pageChange(entity: TableEntity, page: number): void

  /**
   * Moves to the next page.
   * @param entity The table entity.
   */
  pageNext(entity: TableEntity): void

  /**
   * Moves to the previous page.
   * @param entity The table entity.
   */
  pagePrev(entity: TableEntity): void

  /**
   * Changes the page size (number of items per page).
   * @param entity The table entity.
   * @param pageSize The new page size.
   */
  pageSizeChange(entity: TableEntity, pageSize: number): void

  /**
   * Selects a specific row.
   * @param entity The table entity.
   * @param rowId The ID of the row to select.
   */
  rowSelect(entity: TableEntity, rowId: string | number): void

  /**
   * Deselects a specific row.
   * @param entity The table entity.
   * @param rowId The ID of the row to deselect.
   */
  rowDeselect(entity: TableEntity, rowId: string | number): void

  /**
   * Toggles selection for a specific row.
   * @param entity The table entity.
   * @param rowId The ID of the row to toggle.
   */
  rowToggle(entity: TableEntity, rowId: string | number): void

  /**
   * Toggles selection for all currently visible rows.
   * @param entity The table entity.
   */
  rowsToggleAll(entity: TableEntity): void

  /**
   * Selects all currently visible rows.
   * @param entity The table entity.
   */
  rowsSelectAll(entity: TableEntity): void

  /**
   * Clears the current row selection.
   * @param entity The table entity.
   */
  selectionClear(entity: TableEntity): void

  /**
   * Renders the table component.
   * @param entity The table entity.
   * @param api The store API.
   */
  render(entity: TableEntity, api: Api): TemplateResult

  /**
   * Renders the table header.
   * @param entity The table entity.
   * @param api The store API.
   */
  renderHeader(entity: TableEntity, api: Api): TemplateResult

  /**
   * Renders the table body.
   * @param entity The table entity.
   * @param api The store API.
   */
  renderBody(entity: TableEntity, api: Api): TemplateResult

  /**
   * Renders a single row.
   * @param entity The table entity.
   * @param item The data item for the row.
   * @param index The index of the row.
   * @param api The store API.
   */
  renderRow(
    entity: TableEntity,
    item: any,
    index: number,
    api: Api,
  ): TemplateResult

  /**
   * Renders a single cell.
   * @param entity The table entity.
   * @param item The data item for the row.
   * @param column The column definition.
   * @param api The store API.
   */
  renderCell(
    entity: TableEntity,
    item: any,
    column: TableColumn,
    api: Api,
  ): TemplateResult

  /**
   * Renders the value of a cell.
   * @param value The raw value from the data item.
   * @param column The column definition.
   */
  renderValue(value: any, column: TableColumn): any
}
