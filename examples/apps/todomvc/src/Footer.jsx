import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"

import { selectActiveFilter, selectTasksCount } from "./store"

const SINGLE_TASK = 1

export default function Footer() {
  const dispatch = useDispatch()

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
          onClick={() => dispatch({ type: "filterClick", payload: "all" })}
        >
          All
        </button>
        <button
          className={clsx({ selected: activeFilter === "active" })}
          onClick={() => dispatch({ type: "filterClick", payload: "active" })}
        >
          Active
        </button>
        <button
          className={clsx({ selected: activeFilter === "completed" })}
          onClick={() =>
            dispatch({ type: "filterClick", payload: "completed" })
          }
        >
          Completed
        </button>
      </span>

      {!completedTasksCount && <span></span>}

      {!!completedTasksCount && (
        <button onClick={() => dispatch({ type: "clearClick" })}>
          Clear Completed
        </button>
      )}
    </footer>
  )
}
