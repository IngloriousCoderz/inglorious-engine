import { useDispatch } from 'react-redux'

import classes from './button.module.scss'

export default function Button({ id, instance }) {
  const dispatch = useDispatch()

  const { position, label, ...rest } = instance
  const [x, , z] = position

  const handleClick = () => dispatch({ id: `${id}:click` })

  return (
    <button
      {...rest}
      onClick={handleClick}
      className={classes.button}
      style={{ '--x': `${x}px`, '--z': `${z}px` }}
    >
      {label}
    </button>
  )
}
