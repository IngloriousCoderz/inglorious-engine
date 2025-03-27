export interface Type {
  hitbox: {
    shape: "circle" | "rectangle"
    radius?: number
    size?: [number, number, number]
  }
}

export interface Instance {
  type: string
  position: [number, number, number]
}

export interface Options {
  types: { [name: string]: Type }
  instances: { [name: string]: Instance }
}
