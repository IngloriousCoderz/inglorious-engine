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
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
          // second row
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
          // third row
          [0, 2],
          [1, 2],
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 2],
          // fourth row
          [0, 3],
          [1, 3],
          [2, 3],
          [3, 3],
          [4, 3],
          [5, 3],
          // fifth row
          [0, 4],
          [1, 4],
          [6, 3],
          [7, 3],
          [4, 4],
          [5, 4],
        ],
      },
    },
  },
}
