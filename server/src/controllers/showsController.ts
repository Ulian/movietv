import { Request, Response } from 'express';

import mapShowStateToMethod from '../helpers/mapShowStateToMethod';
import config from '../config/config.json';

const MovieDB = require('moviedb')(config.API.KEY)
const language = config.API.LANGUAGE || 'es-ES'

class ShowsController {
  getShows(req: Request, res: Response) {
    const { page, state } = req.params

    const params = {
      page: page || 1,
      language
    }

    MovieDB[mapShowStateToMethod(state)](params, (error, response) => {
      if (error || !response) {
        return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
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

    MovieDB.tvInfo(params, (error, response) => {
      if (error || !response) {
        return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
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

    MovieDB.tvSeasonInfo(params, (error, response) => {
      if (error || !response) {
        return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
      }

      return res.status(200).json(response)
    })
  }
}

export default new ShowsController();
