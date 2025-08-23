import { renderImage } from "@inglorious/renderers/canvas/image/image.js"

export default {
  devMode: true,
  types: {
    image: [{ render: renderImage }],
  },

  entities: {
    logo: {
      type: "image",
      position: [400 - 128 / 2, 0, 300 + 128 / 2],
      image: {
        id: "logo",
        src: "/logo.png",
        imageSize: [128, 128],
      },
    },
  },
}
