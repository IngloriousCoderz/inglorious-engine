import { Vector } from "@inglorious/utils"

declare global {
  function v(...coords: number[]): Vector
}

export {}
