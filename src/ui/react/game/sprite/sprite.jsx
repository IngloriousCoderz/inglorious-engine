import './sprite.module.css'

const DEFAULT_ROWS = 1
const DEFAULT_COLS = 1
const DEFAULT_SCALE = 1
const DEFAULT_FLIP = ''
const DEFAULT_FRAME = [0, 0] // eslint-disable-line no-magic-numbers

export default function Sprite({
  src,
  width,
  height,
  rows = DEFAULT_ROWS,
  cols = DEFAULT_COLS,
  scale = DEFAULT_SCALE,
  flip = DEFAULT_FLIP,
  frame = DEFAULT_FRAME,
  className,
  style: customStyle,
  children,
}) {
  const cellWidth = width / cols
  const cellHeight = height / rows

  let transform = `scale(${scale})`
  if (flip.includes('h')) {
    transform += ' scaleX(-1)'
  }
  if (flip.includes('v')) {
    transform += ' scaleY(-1)'
  }

  const [x, y] = frame
  const style = {
    ...customStyle,
    width: `${cellWidth}px`,
    height: `${cellHeight}px`,
    backgroundImage: `url(${src})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `-${x * cellWidth}px -${y * cellHeight}px`,
    transform,
  }

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
