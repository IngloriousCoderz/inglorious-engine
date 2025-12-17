import { html } from "lit-html"
import { classMap } from "lit-html/directives/class-map.js"
import { ref } from "lit-html/directives/ref.js"
import { repeat } from "lit-html/directives/repeat.js"
import { when } from "lit-html/directives/when.js"

import { getOptionLabel, getOptionValue, isOptionSelected } from "./logic.js"

const ZERO = 0

export const rendering = {
  /**
   * Main render function
   */
  render(entity, api) {
    return html`<div class="iw-select">
      ${this.renderControl(entity, api)}
      ${when(entity.isOpen, () => this.renderDropdown(entity, api))}
    </div>`
  },

  /**
   * Render the control (input/button that opens the select)
   */
  renderControl(entity, api) {
    return html`<div
      class="iw-select-control ${classMap({
        "iw-select-control--open": entity.isOpen,
        "iw-select-control--disabled": entity.isDisabled,
      })}"
      @click=${() => !entity.isDisabled && api.notify(`#${entity.id}:toggle`)}
    >
      ${when(
        entity.isMulti,
        () => this.renderMultiValue(entity, api),
        () => this.renderSingleValue(entity, api),
      )}
      ${when(
        entity.isClearable &&
          ((entity.isMulti && entity.selectedValue?.length > ZERO) ||
            (!entity.isMulti && entity.selectedValue !== null)),
        () =>
          html`<button
            class="iw-select-clear"
            @click=${(e) => {
              e.stopPropagation()
              api.notify(`#${entity.id}:clear`)
            }}
          >
            ×
          </button>`,
      )}

      <span class="iw-select-arrow">▼</span>
    </div>`
  },

  /**
   * Render the selected value (single)
   */
  renderSingleValue(entity) {
    if (entity.selectedValue === null) {
      return html`<span class="iw-select-placeholder"
        >${entity.placeholder}</span
      >`
    }

    const selectedOption = entity.options.find(
      (opt) => getOptionValue(opt) === entity.selectedValue,
    )

    return html`<span class="iw-select-value"
      >${selectedOption
        ? getOptionLabel(selectedOption)
        : entity.selectedValue}</span
    >`
  },

  /**
   * Render the selected values (multi-select)
   */
  renderMultiValue(entity, api) {
    if (
      !Array.isArray(entity.selectedValue) ||
      entity.selectedValue.length === ZERO
    ) {
      return html`<span class="iw-select-placeholder"
        >${entity.placeholder}</span
      >`
    }

    return html`<div class="iw-select-multi-value">
      ${repeat(
        entity.selectedValue,
        (value) => value,
        (value) => {
          const option = entity.options.find(
            (opt) => getOptionValue(opt) === value,
          )
          const label = option ? getOptionLabel(option) : String(value)

          return html`<span class="iw-select-multi-value-tag">
            ${label}
            <button
              class="iw-select-multi-value-remove"
              @click=${(e) => {
                e.stopPropagation()
                api.notify(`#${entity.id}:selectOption`, option || { value })
              }}
            >
              ×
            </button>
          </span>`
        },
      )}
    </div>`
  },

  /**
   * Render the dropdown
   */
  renderDropdown(entity, api) {
    return html`<div
      class="iw-select-dropdown"
      ${ref((el) => {
        if (el) {
          // Click outside handler
          const handleClickOutside = (event) => {
            if (!el.contains(event.target)) {
              api.notify(`#${entity.id}:close`)
            }
          }

          // Add listener after a tick to not close immediately
          setTimeout(() => {
            document.addEventListener("click", handleClickOutside, {
              once: true,
            })
          }, ZERO)
        }
      })}
    >
      ${when(entity.isSearchable, () => this.renderSearchInput(entity, api))}
      ${when(entity.isLoading, () => this.renderLoading(entity, api))}
      ${when(!entity.isLoading && entity.filteredOptions.length === ZERO, () =>
        this.renderNoOptions(entity, api),
      )}
      ${when(!entity.isLoading && entity.filteredOptions.length > ZERO, () =>
        this.renderOptions(entity, api),
      )}
    </div>`
  },

  /**
   * Render the search input
   */
  renderSearchInput(entity, api) {
    return html`<input
      class="iw-select-search"
      type="text"
      placeholder="Search..."
      .value=${entity.searchTerm}
      @input=${(e) => api.notify(`#${entity.id}:searchChange`, e.target.value)}
      @keydown=${(e) => this.handleKeyDown(entity, e, api)}
      ${ref((el) => {
        if (el && entity.isOpen) {
          // Focus input when dropdown opens
          queueMicrotask(() => el.focus())
        }
      })}
    />`
  },

  /**
   * Render the list of options
   */
  renderOptions(entity, api) {
    return html`<div class="iw-select-options">
      ${repeat(
        entity.filteredOptions,
        (option) => getOptionValue(option),
        (option, index) => this.renderOption(entity, option, index, api),
      )}
    </div>`
  },

  /**
   * Render an individual option
   */
  renderOption(entity, option, index, api) {
    const optionLabel = getOptionLabel(option)
    const isSelected = isOptionSelected(
      option,
      entity.selectedValue,
      entity.isMulti,
    )
    const isFocused = index === entity.focusedIndex

    return html`<div
      class="iw-select-option ${classMap({
        "iw-select-option--selected": isSelected,
        "iw-select-option--focused": isFocused,
        "iw-select-option--disabled": option.disabled,
      })}"
      @click=${() =>
        !option.disabled && api.notify(`#${entity.id}:selectOption`, option)}
      @mouseenter=${() => {
        entity.focusedIndex = index
      }}
    >
      ${when(
        entity.isMulti,
        () =>
          html`<input
            type="checkbox"
            ?checked=${isSelected}
            @click=${(e) => e.stopPropagation()}
          />`,
      )}
      <span>${optionLabel}</span>
    </div>`
  },

  /**
   * Render the loading state
   */
  renderLoading(entity) {
    return html`<div class="iw-select-loading">${entity.loadingMessage}</div>`
  },

  /**
   * Render when there are no options
   */
  renderNoOptions(entity) {
    return html`<div class="iw-select-no-options">
      ${entity.noOptionsMessage}
    </div>`
  },

  /**
   * Keyboard navigation handler
   */
  handleKeyDown(entity, event, api) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        api.notify(`#${entity.id}:focusNext`)
        break

      case "ArrowUp":
        event.preventDefault()
        api.notify(`#${entity.id}:focusPrev`)
        break

      case "Enter":
        event.preventDefault()
        if (
          entity.focusedIndex >= ZERO &&
          entity.filteredOptions[entity.focusedIndex]
        ) {
          api.notify(
            `#${entity.id}:selectOption`,
            entity.filteredOptions[entity.focusedIndex],
          )
        }
        break

      case "Escape":
        event.preventDefault()
        api.notify(`#${entity.id}:close`)
        break

      case "Home":
        event.preventDefault()
        api.notify(`#${entity.id}:focusFirst`)
        break

      case "End":
        event.preventDefault()
        api.notify(`#${entity.id}:focusLast`)
        break

      default:
        break
    }
  },
}
