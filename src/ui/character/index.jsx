import { useDispatch } from 'react-redux'

import classes from './character.module.scss'

export default function Character({ id, instance }) {
  const dispatch = useDispatch()

  const { orientation } = instance

  const handleClick = () => dispatch({ id: 'character:click', payload: id })

  return (
    <div
      className={classes.character}
      style={{
        '--angle': `${orientation}rad`,
      }}
      onClick={handleClick}
    />
  )
}
