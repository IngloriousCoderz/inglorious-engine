import { useDispatch } from 'react-redux'

import classes from './input.module.scss'

export default function Input({ id, instance }) {
  const dispatch = useDispatch()

  const { position, inputType, ...rest } = instance
  const [x, , z] = position

  const handleChange = (event) =>
    dispatch({ id: 'input:change', payload: { id, value: event.target.value } })

  return (
    <input
      {...rest}
      type={inputType}
      onChange={handleChange}
      className={classes.input}
      style={{ '--x': `${x}px`, '--z': `${z}px` }}
    />
  )
}
