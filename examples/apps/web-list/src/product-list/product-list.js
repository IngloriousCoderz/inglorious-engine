import { html, list } from "@inglorious/web"

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
