import { Fragment } from 'react'

import Field from '../field'
import classes from './form.module.scss'

export default function Form({ instance }) {
  const { fields, groups } = instance

  return (
    <div className={classes.form}>
      {fields && renderFields(fields)}

      {groups &&
        Object.entries(groups).map(([id, { title, fields }]) => (
          <Fragment key={id}>
            <div className={classes.group}>{title}</div>
            {fields && renderFields(fields)}
          </Fragment>
        ))}
    </div>
  )
}

function renderFields(fields) {
  return (
    <div className={classes.fields}>
      {Object.entries(fields).map(([id, field]) => (
        <Field key={id} id={id} instance={field} />
      ))}
    </div>
  )
}
