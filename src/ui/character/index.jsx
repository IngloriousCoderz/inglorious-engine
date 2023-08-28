import { useSelector } from 'react-redux'

import classes from './character.module.scss'

export default function Character({ id }) {
  const { position, orientation } = useSelector((state) => state.entities[id])

  const [x, , z] = position

  return (
    <div
      className={classes.character}
      style={{
        '--x': `${x}px`,
        '--z': `${z}px`,
        '--angle': `${orientation}rad`,
      }}
    />
  )
}
