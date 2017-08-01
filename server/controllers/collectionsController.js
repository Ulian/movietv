const config = require('../config/config')

const MovieDB = require('moviedb')(config.API.KEY)
const language = config.API.LANGUAGE || 'es-ES'

const collections = {}

collections.getCollection = (req, res) => {
  const { id } = req.params

  const params = {
    id,
    language
  }

  MovieDB.collectionInfo(params, (error, response) => {
    if (error || !response) {
      return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
    }

    return res.status(200).json(response)
  })
}

module.exports = collections
