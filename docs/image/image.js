import { image } from "@inglorious/game/behaviors/image/image"

export default {
  types: {
    image: [image()],
  },

  instances: {
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
