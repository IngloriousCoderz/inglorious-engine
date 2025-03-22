/* eslint-disable no-magic-numbers */

import { useDispatch } from "react-redux"

import classes from "./platform.module.scss"

const DEFAULT_SIZE = [80, 20]

export default function Platform({ id, instance, className, style }) {
  const notify = useDispatch()

  const [width, height] = instance.size ?? DEFAULT_SIZE

  const handleClick = (event) => {
    event.stopPropagation()
    notify({ id: "instance:click", payload: id })
  }

  return (
    <div
      className={`${classes.platform} ${className}`}
      style={{
        ...style,
        "--width": `${width}px`,
        "--height": `${height}px`,
      }}
      onClick={handleClick}
    />
  )
}
