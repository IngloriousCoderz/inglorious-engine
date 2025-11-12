import { it, expect } from "vitest"

import {
  selectValue,
  selectTasks,
  selectTasksCount,
  selectActiveFilter,
  selectFilteredTasks,
} from "./selectors"
import type { TodoListState } from "../../types"

it("should select the form value", () => {
  const state = {
    form: { value: "Hello world!" },
  } as TodoListState

  expect(selectValue(state)).toBe("Hello world!")
})

it("should select the tasks", () => {
  const state = {
    list: { tasks: [{ id: 1, text: "Hello world!" }] },
  } as TodoListState

  expect(selectTasks(state)).toEqual([{ id: 1, text: "Hello world!" }])
})

it("should select the tasks count", () => {
  const state = {
    list: { tasks: [{ id: 1, text: "Hello world!" }] },
  } as TodoListState

  expect(selectTasksCount("all")(state)).toBe(1)
})

it("should select the active filter", () => {
  const state = {
    footer: { activeFilter: "completed" },
  } as TodoListState

  expect(selectActiveFilter(state)).toBe("completed")
})

it("should select the filtered tasks", () => {
  const state = {
    list: {
      tasks: [
        { id: 1, text: "Hello world!", completed: true },
        { id: 2, text: "Hello again!", completed: false },
      ],
    },
    footer: { activeFilter: "completed" },
  } as TodoListState

  expect(selectFilteredTasks(state)).toEqual([
    { id: 1, text: "Hello world!", completed: true },
  ])
})
