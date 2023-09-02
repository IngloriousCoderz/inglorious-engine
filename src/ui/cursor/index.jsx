import classes from './cursor.module.scss'

export default function Cursor() {
  return (
    <div className={classes.cursor}>
      <div className={classes.top} />
      <div className={classes.bottom} />
      <div className={classes.left} />
      <div className={classes.right} />
    </div>
  )
}
