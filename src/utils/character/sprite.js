/* eslint-disable no-magic-numbers */
import { angle } from '@ezpz/utils/math/linear-algebra/vector'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'
import { pi, toRange } from '@ezpz/utils/math/trigonometry'

const BEFORE = -1
const AFTER = 1

export function setTwoSprite(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 2
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    instance.sprite = 'right'
  } else {
    instance.sprite = 'left'
  }
}

export function setFourSprite(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 4
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    instance.sprite = 'down'
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    instance.sprite = 'right'
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    instance.sprite = 'up'
  } else {
    instance.sprite = 'left'
  }
}

export function setSixSprite(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 6
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -6 + BEFORE && theta < -6 + AFTER) {
    instance.sprite = 'leftDown'
  } else if (theta >= -4 + BEFORE && theta < -4 + AFTER) {
    instance.sprite = 'down'
  } else if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    instance.sprite = 'rightDown'
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    instance.sprite = 'right'
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    instance.sprite = 'rightUp'
  } else if (theta >= 4 + BEFORE && theta < 4 + AFTER) {
    instance.sprite = 'up'
  } else if (theta >= 6 + BEFORE && theta < 6 + AFTER) {
    instance.sprite = 'leftUp'
  } else {
    instance.sprite = 'left'
  }
}

export function setEightSprite(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 8
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -6 + BEFORE && theta < -6 + AFTER) {
    instance.sprite = 'leftDown'
  } else if (theta >= -4 + BEFORE && theta < -4 + AFTER) {
    instance.sprite = 'down'
  } else if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    instance.sprite = 'rightDown'
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    instance.sprite = 'right'
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    instance.sprite = 'rightUp'
  } else if (theta >= 4 + BEFORE && theta < 4 + AFTER) {
    instance.sprite = 'up'
  } else if (theta >= 6 + BEFORE && theta < 6 + AFTER) {
    instance.sprite = 'leftUp'
  } else {
    instance.sprite = 'left'
  }
}
