import { useDispatch } from 'react-redux'

import classes from './character.module.scss'

export default function Character({ id, instance }) {
  const dispatch = useDispatch()

  const { position, orientation } = instance
  const [x, , z] = position

  const handleClick = () => dispatch({ id: 'character:click', payload: id })

  return (
    <div
      className={classes.character}
      style={{
        '--x': `${x}px`,
        '--z': `${z}px`,
        '--angle': `${orientation}rad`,
      }}
      onClick={handleClick}
    />
  )
}
