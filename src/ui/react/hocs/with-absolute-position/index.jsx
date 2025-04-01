import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

import classes from "./with-absolute-position.module.scss"

const NO_JUMP = 0

export function withAbsolutePosition(Component) {
  return function AbsolutePosition(props) {
    const [, , , screenHeight] = props.instances.game.bounds
    const { position = zero(), py = NO_JUMP } = props.instance

    const [x, y, z] = position

    return (
      <Component
        {...props}
        className={classes.withAbsolutePosition}
        style={{ "--x": `${x}px`, "--y": `${screenHeight - y - py - z}px` }}
      />
    )
  }
}
