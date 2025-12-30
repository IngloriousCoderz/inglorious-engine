import "@inglorious/web/table/base.css"
import "@inglorious/web/table/theme.css"

import { table } from "@inglorious/web/table"
import { format } from "date-fns"

const formatters = {
  isAvailable: (value) => (value ? "✔️" : "❌"),
  createdAt: (value) => format(value, "dd/MM/yyyy HH:mm"),
}

export const productTable = {
  ...table,

  renderValue(value, column) {
    return formatters[column.formatter]?.(value) ?? value
  },
}
