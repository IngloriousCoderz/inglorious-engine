import { BaseEntity } from "@inglorious/store"

export type Filter = "all" | "active" | "completed"

// Define the task structure
export interface Task {
  id: number
  text: string
  completed?: boolean
}

// Define your entity types
export interface FormEntity extends BaseEntity {
  type: "form"
  value: string
}

export interface ListEntity extends BaseEntity {
  type: "list"
  tasks: Task[]
}

export interface FooterEntity extends BaseEntity {
  type: "footer"
  activeFilter: Filter
}

// Union type of all entities
export type TodoListEntity = FormEntity | ListEntity | FooterEntity

// State type with known entity IDs
export interface TodoListState {
  form: FormEntity
  list: ListEntity
  footer: FooterEntity
  [id: string]: TodoListEntity
}

// Types configuration
export interface TodoListTypes {
  form: {
    inputChange: (entity: FormEntity, value: string) => void
    formSubmit: (entity: FormEntity) => void
  }

  list: {
    formSubmit: (entity: ListEntity, value: string) => void
    toggleClick: (entity: ListEntity, id: number) => void
    deleteClick: (entity: ListEntity, id: number) => void
    clearClick: (entity: ListEntity, _payload: void) => void
  }

  footer: {
    filterClick: (entity: FooterEntity, id: Filter) => void
  }
}
