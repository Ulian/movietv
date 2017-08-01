const config = require('../config/config')

const MovieDB = require('moviedb')(config.API.KEY)
const language = config.API.LANGUAGE || 'es-ES'

const movies = {}

movies.getMovies = (req, res) => {
  const states = ['now_playing', 'popular', 'top_rated', 'upcoming']
  let { page, state } = req.params
  if (page === undefined) page = 1

  let movieMethod

  const params = {
    page,
    language
  }

  if (!states.includes(state)) {
    state = 'popular'
  }

  switch (state) {
    case 'now_playing': {
      movieMethod = 'miscNowPlayingMovies'
      break
    }
    case 'popular': {
      movieMethod = 'miscPopularMovies'
      break
    }
    case 'top_rated': {
      movieMethod = 'miscTopRatedMovies'
      break
    }
    case 'upcoming': {
      movieMethod = 'miscUpcomingMovies'
      break
    }
  }

  MovieDB[movieMethod](params, (error, response) => {
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

movies.getMovie = (req, res) => {
  const { id } = req.params
  const appendToResponse = 'credits,images,videos'
  const includeImageLanguage = 'en,null'

  const params = {
    id,
    append_to_response: appendToResponse,
    include_image_language: includeImageLanguage,
    language
  }

  MovieDB.movieInfo(params, (error, response) => {
    if (error || !response) {
      return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
    }

    return res.status(200).json(response)
  })
}

module.exports = movies
