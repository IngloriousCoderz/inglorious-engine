import { renderTilemap } from "@inglorious/renderers/canvas/image/tilemap.js"

export default {
  types: {
    tilemap: [{ render: renderTilemap }],
  },

  entities: {
    game: {
      pixelated: true,
    },

    dungeon: {
      type: "tilemap",
      position: [400 - (16 * 6 * 3) / 2, 0, 300 - (16 * 5 * 3) / 2],
      tilemap: {
        image: {
          id: "dungeon",
          src: "/tilemaps/dungeon.png",
          imageSize: [160, 160],
          tileSize: [16, 16],
          columns: 6,
          scale: 3,
        },
        layers: [
          {
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
          {
            tiles: [
              // first row
              -1,
              -1,
              -1,
              -1,
              -1,
              -1,
              // second row
              -1,
              91,
              83,
              -1,
              0x80000000 + 91,
              -1,
              // third row
              -1,
              -1,
              -1,
              97,
              -1,
              -1,
              // fourth row
              -1,
              91,
              -1,
              -1,
              0x80000000 + 91,
              -1,
              // fifth row
              // -1, -1, 36, 37, -1, -1,
              -1,
              -1,
              66,
              67,
              -1,
              -1,
            ],
          },
        ],
      },
    },
  },
}
