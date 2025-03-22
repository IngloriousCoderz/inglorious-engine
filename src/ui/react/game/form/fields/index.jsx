import Field from './field/index.jsx'
import classes from './fields.module.scss'

export default function Fields({ fields }) {
  return (
    <div className={classes.fields}>
      {Object.entries(fields).map(([id, field]) => (
        <Field key={id} id={id} instance={field} />
      ))}
    </div>
  )
}
