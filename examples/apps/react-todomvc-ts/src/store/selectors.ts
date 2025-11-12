import { createSelector } from "@inglorious/store/select"

import type { Filter, Task, TodoListState } from "../../types"

export const selectValue = (entities: TodoListState) => entities.form.value
export const selectTasks = (entities: TodoListState) => entities.list.tasks

export const selectTasksCount = (filter?: Filter) =>
  createSelector(
    [selectTasks],
    (tasks: Task[]) => getTasks(tasks, filter).length,
  )

export const selectActiveFilter = (entities: TodoListState): Filter =>
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
