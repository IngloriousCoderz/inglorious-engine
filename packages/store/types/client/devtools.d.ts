import type { BaseEntity, EntitiesState, Middleware } from "../store"

export function createDevtools<
  T extends BaseEntity = BaseEntity,
  S extends EntitiesState<T> = EntitiesState<T>,
>(
  config?: any,
): {
  middleware: Middleware<T, S>
}
