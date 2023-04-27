import config  from '../config/config.json';

import MovieDB from 'moviedb';

export default new MovieDB(config.API.KEY);
