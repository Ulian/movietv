import express from 'express';
import moviesController from '../controllers/moviesController';
import showsController from '../controllers/showsController';
import celebritiesController from '../controllers/celebritiesController';
import searchController from '../controllers/searchController';
import collectionsController from '../controllers/collectionsController';

const routes = express.Router()

routes.get('/movies/:state/:page?', moviesController.getMovies)
routes.get('/movie/:id', moviesController.getMovie)

routes.get('/tvshows/:state/:page?', showsController.getShows)
routes.get('/tvshow/:id', showsController.getShow)
routes.get('/season/:id/:number?', showsController.getSeason)

routes.get('/celebrities/:page?', celebritiesController.getCelebrities)
routes.get('/celebritie/:id', celebritiesController.getCelebrity)
routes.get('/celebritie/:id/tagged_images/:page?', celebritiesController.getCelebrityImages)

routes.get('/search/:query', searchController.query)

routes.get('/collection/:id', collectionsController.getCollection)

export default routes;
