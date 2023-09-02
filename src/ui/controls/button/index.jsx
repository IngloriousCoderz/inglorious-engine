import { useDispatch } from 'react-redux'

import classes from './button.module.scss'

export default function Button({ id, instance }) {
  const dispatch = useDispatch()

  const { label, ...rest } = instance

  const handleClick = () => dispatch({ id: `${id}:click` })

  return (
    <button {...rest} onClick={handleClick} className={classes.button}>
      {label}
    </button>
  )
}
