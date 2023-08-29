import classes from './cursor.module.scss'

export default function Cursor({ instance }) {
  const { position } = instance
  const [x, , z] = position
  return (
    <div
      className={classes.cursor}
      style={{
        '--x': `${x}px`,
        '--z': `${z}px`,
      }}
    >
      <div className={classes.top} />
      <div className={classes.bottom} />
      <div className={classes.left} />
      <div className={classes.right} />
    </div>
  )
}
