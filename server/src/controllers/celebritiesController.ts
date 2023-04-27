import { Request, Response } from "express";
import config  from '../config/config.json';
import errorResponseParser, {  MovieDBErrorResponse } from '../helpers/errorResponseParser';
import MovieDBInstance from '../helpers/MovieDBInstance';

const language = config.API.LANGUAGE || 'es-ES'

class CelebritiesController {
  getCelebrities(req: Request, res: Response) {
    let { page } = req.params
    if (page === undefined) page = "1"

    const params = {
      page,
      language
    }

    MovieDBInstance.personPopular(params, (error: MovieDBErrorResponse, response) => {
      if (error || !response) {
        return res.status(400).json({ message: errorResponseParser(error) })
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

  getCelebrity(req: Request, res: Response) { // TODO: celebritie biography when language is not english. (wikipedia as source?)
    const { id } = req.params
    const appendToResponse = 'combined_credits,tagged_images,external_ids'

    const params = {
      id,
      append_to_response: appendToResponse,
      language
    }

    MovieDBInstance.personInfo(params, (error: MovieDBErrorResponse, response) => {
      if (error || !response) {
        return res.status(400).json({ message: errorResponseParser(error) })
      }

      return res.status(200).json(response)
    })
  }

  getCelebrityImages(req: Request, res: Response) {
    const { id, page } = req.params

    const params = {
      id,
      page: page || 1,
      language
    }

    MovieDBInstance.personTaggedImages(params, (error: MovieDBErrorResponse, response) => {
      if (error || !response) {
        return res.status(400).json({ message: errorResponseParser(error) })
      }

      return res.status(200).json(response)
    })
  }
}

export default new CelebritiesController();
