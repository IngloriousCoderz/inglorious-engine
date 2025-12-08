import type { AppState } from "../../types"

export const entities: AppState = {
  form: {
    type: "form",
    value: "",
  },
  list: {
    type: "list",
    tasks: [],
  },
  footer: {
    type: "footer",
    activeFilter: "all",
  },
}
