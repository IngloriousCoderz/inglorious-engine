import * as time from '../utils/time'

const ONE_SECOND = 1
const TO_MILLISECONDS = 1000

let counter = 1

export function processInput() {
  // TODO: implement this function
}

export async function update(engine, elapsed) {
  // await time.sleep(ONE_SECOND * TO_MILLISECONDS - elapsed) // simulating some heavy calculation
  engine.update(elapsed)
}

export async function render(engine, tick) {
  const { entities } = engine.getState()
  const canvas = document.querySelector('canvas')

  if (!canvas) {
    return
  }

  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'darkgrey'
  ctx.fillRect(0, 0, 100, 100)

  entities.forEach((entity) => {
    ctx.fillStyle = 'white'
    const [x, , z] = entity.position
    ctx.fillRect(x, z, 10, 10)
  })
  // await time.sleep(ONE_SECOND * TO_MILLISECONDS - tick * TO_MILLISECONDS) // simulating some heavy rendering
  // console.log(counter, 'Hello world!')
  // counter++
  // TODO: implement this function
}
