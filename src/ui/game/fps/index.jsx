const ONE_SECOND = 1
const DECIMALS = 0

export default function Fps({ instance }) {
  const fps = ONE_SECOND / instance.value

  return <div>FPS: {fps.toFixed(DECIMALS)}</div>
}
