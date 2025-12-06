import { html, list } from "@inglorious/web"

import classes from "./product-list.module.css"

const DIVISOR = 2

export const productList = {
  ...list,

  renderItem(item, index) {
    return html`<div
      class="${classes.product} ${index % DIVISOR ? classes.even : classes.odd}"
    >
      <strong>Name: ${item.name}</strong>
      <div>Price: ${item.price}</div>
    </div>`
  },
}
