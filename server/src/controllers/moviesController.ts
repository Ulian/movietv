import { Request, Response } from 'express';
import config from '../config/config.json';

import errorResponseParser, { MovieDBErrorResponse } from '../helpers/errorResponseParser';
import mapShowStateToMethod from '../helpers/mapShowStateToMethod';
import MovieDBInstance from '../helpers/MovieDBInstance';
const language = config.API.LANGUAGE || 'es-ES'

class MoviesController {
  getMovies(req: Request, res: Response) {
    const { page, state } = req.params;

    const params = {
      page: page || 1,
      language
    }

    MovieDBInstance[mapShowStateToMethod(state)](params, (error: MovieDBErrorResponse, response) => {
      if (error || !response) {
        return res.status(400).json({ message: errorResponseParser(error) })
      }

      if (page > response.total_pages) {
        const url = req.url.split('/')
        url.shift()
        url.pop()
        return res.redirect(`${req.baseUrl}/${url.join('/')}/${response.total_pages}`)
      }

      return res.status(200).json(response)
    })
  }

  getMovie(req: Request, res: Response) {
    const { id } = req.params
    const appendToResponse = 'credits,images,videos'
    const includeImageLanguage = 'en,null'

    const params = {
      id,
      append_to_response: appendToResponse,
      include_image_language: includeImageLanguage,
      language
    }

    MovieDBInstance.movieInfo(params, (error: MovieDBErrorResponse, response) => {
      if (error || !response) {
        return res.status(400).json({ message: errorResponseParser(error) })
      }

      return res.status(200).json(response)
    })
  }
}

export default new MoviesController();
