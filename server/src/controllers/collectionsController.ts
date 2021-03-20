import { Request, Response } from "express";
import config  from '../config/config.json';

const MovieDB = require('moviedb')(config.API.KEY)
const language = config.API.LANGUAGE || 'es-ES'

class CollectionsController {
  getCollection(req: Request, res: Response) {
    const { id } = req.params

    const params = {
      id,
      language
    }

    MovieDB.collectionInfo(params, (error, response) => {
      if (error || !response) {
        return res.status(400).json({ message: JSON.parse(error.response.text).status_message })
      }

      return res.status(200).json(response)
    })
  }
}

export default new CollectionsController();
