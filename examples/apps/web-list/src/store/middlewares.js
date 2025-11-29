import { createDevtools } from "@inglorious/lit"

export const middlewares = []

if (import.meta.env.DEV) {
  middlewares.push(createDevtools().middleware)
}
