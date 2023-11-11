import { Fragment } from 'react'

import Fields from './fields'
import classes from './form.module.scss'

export default function Form({ instance }) {
  const { fields, groups } = instance

  return (
    <div className={classes.form}>
      {fields && <Fields fields={fields} />}

      {groups &&
        Object.entries(groups).map(([id, { title, fields }]) => (
          <Fragment key={id}>
            <div className={classes.group}>{title}</div>
            {fields && <Fields fields={fields} />}
          </Fragment>
        ))}
    </div>
  )
}
