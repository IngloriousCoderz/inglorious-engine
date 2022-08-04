const axios = require('axios')

module.exports = { load }

async function load(game) {
  const { data } = await axios.get(
    `http://localhost:3000/games/${game}/configs.txt`
  )
  return data.trim().split('\n') // TODO: retrieve and merge all configs found
}
