import { compose } from "@inglorious/utils/functions/functions.js"

/**
 * Applies a list of middleware functions to a store's dispatch method.
 *
 * @param {...Function} middlewares The middleware functions to apply.
 * @returns {Function} A store enhancer function.
 */
export function applyMiddlewares(...middlewares) {
  return (store) => {
    let dispatch = () => {
      throw new Error(
        "Dispatching while constructing your middleware is not allowed.",
      )
    }

    // The middleware API that can be passed to each middleware function.
    const api = {
      ...store,
      dispatch: (...args) => dispatch(...args),
      notify: (type, payload) => dispatch({ type, payload }),
    }

    // Create a chain of middleware functions.
    const chain = middlewares.map((middleware) => middleware(api))

    // Compose the middleware chain to create the final dispatch function.
    dispatch = compose(...chain)(store.dispatch)

    return api
  }
}
