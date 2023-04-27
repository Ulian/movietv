import { Request, Response } from 'express';

import mapShowStateToMethod from '../helpers/mapShowStateToMethod';
import config from '../config/config.json';
import errorResponseParser, { MovieDBErrorResponse } from '../helpers/errorResponseParser';
import MovieDBInstance from '../helpers/MovieDBInstance';

const language = config.API.LANGUAGE || 'es-ES'

class ShowsController {
  getShows(req: Request, res: Response) {
    const { page, state } = req.params

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

  getShow(req: Request, res: Response) {
    const { id } = req.params
    const appendToResponse = 'credits,images,videos'

    const params = {
      id,
      append_to_response: appendToResponse,
      language
    }

    MovieDBInstance.tvInfo(params, (error: MovieDBErrorResponse, response) => {
      if (error || !response) {
        return res.status(400).json({ message: errorResponseParser(error) })
      }

      return res.status(200).json(response)
    })
  }

  getSeason(req: Request, res: Response) {
    const { id, number: seasonNumber } = req.params;

    const appendToResponse = 'images,videos'

    const params = {
      id,
      season_number: seasonNumber || 1,
      append_to_response: appendToResponse,
      language
    }

    MovieDBInstance.tvSeasonInfo(params, (error: MovieDBErrorResponse, response) => {
      if (error || !response) {
        return res.status(400).json({ message: errorResponseParser(error) })
      }

      return res.status(200).json(response)
    })
  }
}

export default new ShowsController();
