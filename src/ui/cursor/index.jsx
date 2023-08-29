import { useSelector } from 'react-redux'

import classes from './cursor.module.scss'

const X = 0
const Z = 2

export default function Cursor() {
  const entity = useSelector((state) => state.instances.cursor)

  return (
    entity && (
      <div
        className={classes.cursor}
        style={{
          '--x': `${entity.position[X]}px`,
          '--z': `${entity.position[Z]}px`,
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
