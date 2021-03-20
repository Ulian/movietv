import { Request, Response } from "express";
import config  from '../config/config.json';

const MovieDB = require('moviedb')(config.API.KEY)
const language = config.API.LANGUAGE || 'es-ES'

class SearchController {
  query(req: Request, res: Response) {
    const query = req.params.query

    const params = {
      query,
      language
    }

    if (query.length < 3) {
      return res.status(400).json({ message: 'Query must be at lest 3 character' }) // translate
    }

    MovieDB.searchMulti(params, (error, response) => {
      if (error || !response) {
        return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
      }

      return res.status(200).json(response)
    })
  }
}

export default new SearchController();
