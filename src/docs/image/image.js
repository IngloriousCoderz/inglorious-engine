import draw from "@inglorious/ui/canvas/image/image.js"

export default {
  types: {
    image: {
      draw,
    },
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
