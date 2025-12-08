import { createDevtools } from "@inglorious/web"

export const middlewares = []

if (window.process.env === "development") {
  middlewares.push(createDevtools().middleware)
}
