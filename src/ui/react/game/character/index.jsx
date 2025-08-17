import { useDispatch } from "react-redux"

import classes from "./character.module.scss"

const DEFAULT_SIZE = 24
const DEFAULT_ORIENTATION = 0

export default function Character({ id, type, instance, className, style }) {
  const dispatch = useDispatch()

  const size = type.size ?? DEFAULT_SIZE
  const { orientation = DEFAULT_ORIENTATION } = instance

  const handleClick = (event) => {
    event.stopPropagation()
    dispatch({ type: "instance:click", payload: id })
  }

  return (
    <div
      className={`${classes.character} ${className}`}
      style={{
        ...style,
        "--size": `${size}px`,
        "--angle": `${-orientation}rad`,
      }}
      onClick={handleClick}
    />
  )
}
