import type { TemplateResult } from "lit-html"
import type { Api } from "./mount"

/**
 * Represents an option in the select component.
 * Can be a simple string/number or an object with value and label.
 */
export type SelectOption =
  | string
  | number
  | {
      value: string | number
      label?: string
      disabled?: boolean
      [key: string]: any
    }

/**
 * Represents the state of a select entity.
 */
export interface SelectEntity {
  /** A unique identifier for the select entity. */
  id: string | number
  /** The entity type (usually 'select'). */
  type: string
  /** The list of options available for selection. */
  options: SelectOption[]
  /** Whether the dropdown is currently open. */
  isOpen: boolean
  /** The current search term entered by the user. */
  searchTerm: string
  /** The index of the currently focused option (for keyboard navigation). */
  focusedIndex: number
  /** Whether multiple options can be selected. */
  isMulti: boolean
  /** The currently selected value(s). */
  selectedValue: string | number | (string | number)[] | null
  /** Whether the options are currently loading. */
  isLoading: boolean
  /** Whether the select component is disabled. */
  isDisabled: boolean
  /** Whether the user can search through options. */
  isSearchable: boolean
  /** Whether the selection can be cleared. */
  isClearable: boolean
  /** Whether new options can be created by the user. */
  isCreatable: boolean
  /** Placeholder text to display when no value is selected. */
  placeholder: string
  /** Message to display when no options match the search term. */
  noOptionsMessage: string
  /** Message to display while options are loading. */
  loadingMessage: string
  /** Property name to group options by. */
  groupBy: string | null
}

/**
 * The select type implementation.
 */
export declare const select: {
  /**
   * Initializes the select entity with default state.
   * @param {SelectEntity} entity
   */
  create(entity: SelectEntity): void

  /**
   * Renders the select component.
   * @param entity The select entity.
   * @param api The store API.
   */
  render(entity: SelectEntity, api: Api): TemplateResult

  /**
   * Opens the select dropdown.
   * @param entity The select entity.
   */
  open(entity: SelectEntity): void

  /**
   * Closes the select dropdown.
   * @param entity The select entity.
   */
  close(entity: SelectEntity): void

  /**
   * Toggles the select dropdown open/closed state.
   * @param entity The select entity.
   */
  toggle(entity: SelectEntity): void

  /**
   * Selects an option.
   * @param entity The select entity.
   * @param option The option to select.
   */
  optionSelect(entity: SelectEntity, option: SelectOption): void

  /**
   * Clears the current selection.
   * @param entity The select entity.
   */
  clear(entity: SelectEntity): void

  /**
   * Updates the search term and filters options.
   * @param entity The select entity.
   * @param term The new search term.
   */
  searchChange(entity: SelectEntity, term: string): void

  /**
   * Moves focus to the next option.
   * @param entity The select entity.
   */
  focusNext(entity: SelectEntity): void

  /**
   * Moves focus to the previous option.
   * @param entity The select entity.
   */
  focusPrev(entity: SelectEntity): void

  /**
   * Moves focus to the first option.
   * @param entity The select entity.
   */
  focusFirst(entity: SelectEntity): void

  /**
   * Moves focus to the last option.
   * @param entity The select entity.
   */
  focusLast(entity: SelectEntity): void
}
