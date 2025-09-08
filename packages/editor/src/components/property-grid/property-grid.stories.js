import { fn } from "storybook/test"

import { PropertyGrid } from "./property-grid"

export default {
  title: "Property Grid",
  component: PropertyGrid,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
}

export const Default = {
  args: {},
}

export const PlainObject = {
  args: {
    obj: {
      position: [0, 0, 0],
      maxSpeed: 250,
    },
  },
}
