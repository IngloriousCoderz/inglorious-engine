import * as time from '../helpers/time'

const ONE_SECOND = 1
const TO_MILLISECONDS = 1000

let counter = 1

export function processInput() {
  // TODO: implement this function
}

export async function update(store, elapsed) {
  await time.sleep(ONE_SECOND * TO_MILLISECONDS - elapsed) // simulating some heavy calculation
  store.update(elapsed)
}

export async function render(tick) {
  await time.sleep(ONE_SECOND * TO_MILLISECONDS - tick * TO_MILLISECONDS) // simulating some heavy rendering
  console.log(counter, 'Hello world!')
  counter++
  // TODO: implement this function
}
