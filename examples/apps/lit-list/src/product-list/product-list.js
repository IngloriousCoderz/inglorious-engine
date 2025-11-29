import { html, list } from "@inglorious/lit"

const DIVISOR = 2

export const productList = {
  ...list,

  renderItem(item, index) {
    return html`<div class="product ${index % DIVISOR ? "even" : "odd"}">
      <strong>Name: ${item.name}</strong>
      <div>Price: ${item.price}</div>
    </div>`
  },
}
