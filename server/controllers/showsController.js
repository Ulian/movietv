const config = require('../config/config')

const MovieDB = require('moviedb')(config.API.KEY)
const language = config.API.LANGUAGE || 'es-ES'

const show = {}

show.getShows = (req, res) => {
  const states = ['airing_today', 'popular', 'top_rated', 'on_the_air']
  let { page, state } = req.params
  if (page === undefined) page = 1

  let showMethod

  const params = {
    page,
    language
  }

  if (!states.includes(state)) {
    state = 'popular'
  }

  switch (state) {
    case 'airing_today': {
      showMethod = 'tvAiringToday'
      break
    }
    case 'popular': {
      showMethod = 'miscPopularTvs'
      break
    }
    case 'top_rated': {
      showMethod = 'miscTopRatedTvs'
      break
    }
    case 'on_the_air': {
      showMethod = 'tvOnTheAir'
      break
    }
  }

  MovieDB[showMethod](params, (error, response) => {
    if (error || !response) {
      return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
    }

    if (page > response.total_pages) {
      let url = req.url.split('/')
      url.shift()
      url.pop()
      return res.redirect(`${req.baseUrl}/${url.join('/')}/${response.total_pages}`)
    }

    return res.status(200).json(response)
  })
}

show.getShow = (req, res) => {
  const { id } = req.params
  const appendToResponse = 'credits,images,videos'

  const params = {
    id,
    append_to_response: appendToResponse,
    language
  }

  MovieDB.tvInfo(params, (error, response) => {
    if (error || !response) {
      return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
    }

    return res.status(200).json(response)
  })
}

show.getSeason = (req, res) => {
  let { id, number: seasonNumber } = req.params

  if (seasonNumber === undefined) seasonNumber = 1

  const appendToResponse = 'images,videos'

  const params = {
    id,
    season_number: seasonNumber,
    append_to_response: appendToResponse,
    language
  }

  MovieDB.tvSeasonInfo(params, (error, response) => {
    if (error || !response) {
      return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
    }

    return res.status(200).json(response)
  })
}

module.exports = show
