import draw from "@inglorious/ui/canvas/image/tilemap.js"

export default {
  types: {
    tilemap: {
      draw,
    },
  },

  instances: {
    game: {
      pixelated: true,
    },

    dungeon: {
      type: "tilemap",
      position: [400 - 160 / 2, 0, 300 + 160 / 2],
      tilemap: {
        image: {
          id: "dungeon",
          src: "/tilemaps/dungeon.png",
          imageSize: [160, 160],
          tileSize: [16, 16],
          columns: 6,
          scale: 2,
        },
        tiles: [
          // first row
          0, 1, 2, 3, 4, 5,
          // second row
          10, 11, 12, 13, 14, 15,
          // third row
          20, 21, 22, 23, 24, 25,
          // fourth row
          30, 31, 32, 33, 34, 35,
          // fifth row
          40, 41, 42, 43, 44, 45,
        ],
      },
    },
  },
}
