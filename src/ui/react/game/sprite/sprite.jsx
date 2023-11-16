import './sprite.module.css'

export default function Sprite({
  src,
  width,
  height,
  rows,
  cols,
  scale,
  flip,
  frame,
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

Sprite.defaultProps = {
  rows: 1,
  cols: 1,
  scale: 1,
  frame: [0, 0], // eslint-disable-line no-magic-numbers
  flip: '',
}
