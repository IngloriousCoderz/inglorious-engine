import Field from '../field'
import classes from './form.module.scss'

export default function Form({ instance }) {
  const { fields } = instance

  return (
    <div className={classes.form}>
      {Object.entries(fields).map(([id, field]) => (
        <Field key={id} id={id} instance={field} />
      ))}
    </div>
  )
}
