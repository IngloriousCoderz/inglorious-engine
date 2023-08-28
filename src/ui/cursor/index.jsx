import { useSelector } from 'react-redux'

import classes from './cursor.module.scss'

export default function Cursor() {
  const entity = useSelector((state) => state.entities.cursor)

  return (
    entity && (
      <div
        className={classes.cursor}
        style={{
          '--x': `${entity.position[0]}px`,
          '--z': `${entity.position[2]}px`,
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
