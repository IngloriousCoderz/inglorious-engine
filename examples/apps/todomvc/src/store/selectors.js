import { createSelector } from "@inglorious/store/select"

export const selectValue = ({ entities }) => entities.form.value
export const selectTasks = ({ entities }) => entities.list.tasks

export const selectTasksCount = (filter) =>
  createSelector([selectTasks], (tasks) => getTasks(tasks, filter).length)

export const selectActiveFilter = ({ entities }) => entities.footer.activeFilter

export const selectFilteredTasks = createSelector(
  [selectTasks, selectActiveFilter],
  (tasks, activeFilter) => getTasks(tasks, activeFilter),
)

function getTasks(tasks, filter) {
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
