const express = require('express')

let routes = express.Router()

const movies = require('../controllers/moviesController')

routes.get('/movies/:state/:page?', movies.getMovies)
routes.get('/movie/:id', movies.getMovie)

const shows = require('../controllers/showsController')

routes.get('/tvshows/:state/:page?', shows.getShows)
routes.get('/tvshow/:id', shows.getShow)
routes.get('/season/:id/:number?', shows.getSeason)

const celebrities = require('../controllers/celebritiesController')

routes.get('/celebrities/:page?', celebrities.getCelebrities)
routes.get('/celebritie/:id', celebrities.getCelebritie)
routes.get('/celebritie/:id/tagged_images/:page?', celebrities.getCelebritieImages)

const search = require('../controllers/searchController')

routes.get('/search/:query', search.query)

const collections = require('../controllers/collectionsController')

routes.get('/collection/:id', collections.getCollection)

module.exports = routes
