import { useDispatch } from 'react-redux'

import classes from './button.module.scss'

export default function Button({ instance }) {
  const dispatch = useDispatch()

  const [x, , z] = instance.position

  const handleClick = () => dispatch({ id: 'button:click' })

  return (
    <button
      onClick={handleClick}
      className={classes.button}
      style={{ '--x': `${x}px`, '--z': `${z}px` }}
    >
      {instance.label}
    </button>
  )
}
