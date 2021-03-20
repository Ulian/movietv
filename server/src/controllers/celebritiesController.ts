import { Request, Response } from "express";
import config  from '../config/config.json';

const MovieDB = require('moviedb')(config.API.KEY)
const language = config.API.LANGUAGE || 'es-ES'

class CelebritiesController {
  getCelebrities(req: Request, res: Response) {
    let { page } = req.params
    if (page === undefined) page = "1"

    const params = {
      page,
      language
    }

    MovieDB.personPopular(params, (error, response) => {
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

  getCelebritie(req: Request, res: Response) { // TODO: celebritie biography when language is not english. (wikipedia as source?)
    const { id } = req.params
    const appendToResponse = 'combined_credits,tagged_images,external_ids'

    const params = {
      id,
      append_to_response: appendToResponse,
      language
    }

    MovieDB.personInfo(params, (error, response) => {
      if (error || !response) {
        return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
      }

      return res.status(200).json(response)
    })
  }

  getCelebritieImages(req: Request, res: Response) {
    let { id, page } = req.params
    if (page === undefined) page = "1"

    const params = {
      id,
      page,
      language
    }

    MovieDB.personTaggedImages(params, (error, response) => {
      if (error || !response) {
        return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
      }

      return res.status(200).json(response)
    })
  }
}

export default new CelebritiesController();
