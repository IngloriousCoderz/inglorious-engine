import classes from './with-absolute-position.module.scss'

export function withAbsolutePosition(Component) {
  return function AbsolutePosition({ id, instance }) {
    const { position } = instance

    if (!position) {
      return <Component id={id} instance={instance} />
    }

    const [x, , z] = position

    return (
      <div
        className={classes.withAbsolutePosition}
        style={{ '--x': `${x}px`, '--z': `${z}px` }}
      >
        <Component id={id} instance={instance} />
      </div>
    )
  }
}
