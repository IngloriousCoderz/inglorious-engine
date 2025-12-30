import { classMap, html } from "@inglorious/web"
import { list } from "@inglorious/web/list"

import classes from "./product-list.module.css"

const DIVISOR = 2

export const productList = {
  ...list,

  renderItem(item, index) {
    return html`<div
      class=${classMap({
        [classes.product]: true,
        [classes.even]: index % DIVISOR,
      })}
    >
      <strong>Name: ${item.name}</strong>
      <div>Price: ${item.price}</div>
    </div>`
  },
}
