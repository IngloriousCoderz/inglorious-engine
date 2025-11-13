import { html, classMap } from "@inglorious/lit"
import { selectTasksCount } from "../store/selectors"

const SINGLE_TASK = 1

export const footer = {
  filterClick(entity, id) {
    entity.activeFilter = id
  },

  render({ activeFilter }, { notify, getEntities }) {
    const entities = getEntities()

    const tasksCount = selectTasksCount()(entities)
    const completedTasksCount = selectTasksCount("completed")(entities)
    const activeTasksCount = selectTasksCount("active")(entities)

    if (!tasksCount) return null

    return html`<footer>
      <span>
        ${activeTasksCount}
        item${activeTasksCount === SINGLE_TASK ? "" : "s"}${" "} left
      </span>

      <span class="filters">
        <a
          class=${classMap({ selected: activeFilter === "all" })}
          @click=${() => notify("filterClick", "all")}
        >
          All
        </a>
        <a
          class=${classMap({ selected: activeFilter === "active" })}
          @click=${() => notify("filterClick", "active")}
        >
          Active
        </a>
        <a
          class=${classMap({ selected: activeFilter === "completed" })}
          @click=${() => notify("filterClick", "completed")}
        >
          Completed
        </a>
      </span>

      <a
        class=${classMap({ hidden: !completedTasksCount })}
        @click=${() => notify("clearClick")}
      >
        Clear Completed
      </a>
    </footer>`
  },
}
