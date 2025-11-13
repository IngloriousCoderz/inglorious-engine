import type { Store, BaseEntity, EntitiesState } from "@inglorious/store"
import type { useSelector } from "react-redux"
import type { FC, ReactNode } from "react"

type Notify = (type: string, payload?: any) => void

export function createReactStore<
  T extends BaseEntity = BaseEntity,
  S extends EntitiesState<T> = EntitiesState<T>,
>(
  store: Store<T, S>,
): {
  Provider: FC<{ children: ReactNode }>
  useSelector: typeof useSelector
  useEntity: (id: string) => T
  useNotify: () => Notify
}
