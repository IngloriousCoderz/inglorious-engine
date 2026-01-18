import { createSelector } from "@inglorious/web"

import type { AppState, Filter, Task } from "../../types"

export const selectValue = (entities: AppState) => entities.form.value
export const selectTasks = (entities: AppState) => entities.list.tasks

export const selectTasksCount = (filter?: Filter) =>
  createSelector(
    [selectTasks],
    (tasks: Task[]) => getTasks(tasks, filter).length,
  )

export const selectActiveFilter = (entities: AppState): Filter =>
  entities.footer.activeFilter

export const selectFilteredTasks = createSelector(
  [selectTasks, selectActiveFilter],
  (tasks: Task[], activeFilter: Filter) => getTasks(tasks, activeFilter),
)

function getTasks(tasks: Task[], filter?: Filter) {
  return tasks.filter((task) => {
    switch (filter) {
      case "active":
        return !task.completed
      case "completed":
        return task.completed
      default:
        return true
    }
  })
}
