import { useDispatch } from 'react-redux'

import classes from './character.module.scss'

const DEFAULT_SIZE = 24
const DEFAULT_ORIENTATION = 0

export default function Character({ id, config, instance }) {
  const dispatch = useDispatch()

  const size = config.types[instance.type].size ?? DEFAULT_SIZE
  const { orientation = DEFAULT_ORIENTATION } = instance

  const handleClick = (event) => {
    event.stopPropagation()
    dispatch({ id: 'character:click', payload: id })
  }

  return (
    <div
      className={classes.character}
      style={{
        '--size': `${size}px`,
        '--angle': `${-orientation}rad`,
      }}
      onClick={handleClick}
    />
  )
}
