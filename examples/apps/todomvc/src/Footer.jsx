import clsx from "clsx"

import { useNotify, useSelector } from "./store"
import { selectActiveFilter, selectTasksCount } from "./store/selectors"

const SINGLE_TASK = 1

export default function Footer() {
  const notify = useNotify()

  const tasksCount = useSelector(selectTasksCount())
  const completedTasksCount = useSelector(selectTasksCount("completed"))
  const activeTasksCount = useSelector(selectTasksCount("active"))
  const activeFilter = useSelector(selectActiveFilter)

  if (!tasksCount) return null

  return (
    <footer>
      <span>
        {activeTasksCount} item{activeTasksCount === SINGLE_TASK ? "" : "s"}{" "}
        left
      </span>

      <span>
        <button
          className={clsx({ selected: activeFilter === "all" })}
          onClick={() => notify("filterClick", "all")}
        >
          All
        </button>
        <button
          className={clsx({ selected: activeFilter === "active" })}
          onClick={() => notify("filterClick", "active")}
        >
          Active
        </button>
        <button
          className={clsx({ selected: activeFilter === "completed" })}
          onClick={() => notify("filterClick", "completed")}
        >
          Completed
        </button>
      </span>

      {!completedTasksCount && <span></span>}

      {!!completedTasksCount && (
        <button onClick={() => notify("clearClick")}>Clear Completed</button>
      )}
    </footer>
  )
}
