import { useSelector } from 'react-redux'

import classes from './cursor.module.scss'

const X = 0
const Z = 2

export default function Cursor() {
  const instance = useSelector((state) => state.instances.cursor)

  return (
    instance && (
      <div
        className={classes.cursor}
        style={{
          '--x': `${instance.position[X]}px`,
          '--z': `${instance.position[Z]}px`,
        }}
      >
        <div className={classes.top} />
        <div className={classes.bottom} />
        <div className={classes.left} />
        <div className={classes.right} />
      </div>
    )
  )
}
