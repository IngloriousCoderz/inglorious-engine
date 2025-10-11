import { createStore } from "@inglorious/store"
import { createSelector } from "@inglorious/store/select"

const TASKS_TO_REMOVE = 1
const DEFAULT_ID = 1
const LAST_TASK = 1
const NEXT_ID = 1

export const store = createStore({
  types: {
    form: {
      inputChange(entity, value) {
        entity.value = value
      },
      formSubmit(entity) {
        entity.value = ""
      },
    },

    list: {
      formSubmit(entity, value) {
        entity.tasks.push({ id: nextId(entity.tasks), text: value })
      },
      toggleClick(entity, id) {
        const task = entity.tasks.find((task) => task.id === id)
        task.completed = !task.completed
      },
      deleteClick(entity, id) {
        const index = entity.tasks.findIndex((task) => task.id === id)
        entity.tasks.splice(index, TASKS_TO_REMOVE)
      },
      clearClick(entity) {
        entity.tasks = entity.tasks.filter((task) => !task.completed)
      },
    },

    footer: {
      filterClick(entity, id) {
        entity.activeFilter = id
      },
    },
  },

  entities: {
    form: {
      type: "form",
      value: "",
    },
    list: {
      type: "list",
      tasks: [],
    },
    footer: {
      type: "footer",
      activeFilter: "all",
    },
  },
})

export const selectValue = ({ entities }) => entities.form.value
export const selectTasks = ({ entities }) => entities.list.tasks

export const selectTasksCount = (filter) =>
  createSelector([selectTasks], (tasks) => getTasks(tasks, filter).length)

export const selectActiveFilter = ({ entities }) => entities.footer.activeFilter

export const selectFilteredTasks = createSelector(
  [selectTasks, selectActiveFilter],
  (tasks, activeFilter) => getTasks(tasks, activeFilter),
)

function nextId(tasks) {
  if (!tasks.length) return DEFAULT_ID
  return tasks[tasks.length - LAST_TASK].id + NEXT_ID
}

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
