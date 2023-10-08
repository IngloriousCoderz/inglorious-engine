const ONE_SECOND = 1
const DECIMALS = 1

export default function Fps({ instance }) {
  const { value } = instance

  return <div>FPS: {(ONE_SECOND / value).toFixed(DECIMALS)}</div>
}
