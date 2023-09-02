import { useDispatch } from 'react-redux'

import classes from './input.module.scss'

export default function Input({ id, instance }) {
  const dispatch = useDispatch()

  const { inputType, ...rest } = instance

  const handleChange = (event) =>
    dispatch({ id: `${id}:change`, payload: event.target.value })

  return (
    <input
      {...rest}
      type={inputType}
      onChange={handleChange}
      className={classes.input}
    />
  )
}
