import classes from "./cursor.module.scss"

export default function Cursor({ instance, className, style }) {
  const { orientation } = instance

  return (
    <div
      className={`${classes.cursor} ${className}`}
      style={{
        ...style,
        "--angle": `${-orientation}rad`,
      }}
    >
      <div className={classes.top} />
      <div className={classes.bottom} />
      <div className={classes.left} />
      <div className={classes.right} />
    </div>
  )
}
