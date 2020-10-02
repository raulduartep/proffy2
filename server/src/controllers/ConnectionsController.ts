import { Request, Response } from 'express'

import ConnectionsModel from '../models/ConnectionsModel'

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    try {
      const total = await ConnectionsModel.index()

      return response.json({ total })
    } catch (err) {
      return response.status(400).json({
        error: err.message
      })
    }
  }

  async create(request: Request, response: Response) {
    try {
      await ConnectionsModel.create(request.user_id)

      return response.status(201).send();

    } catch (err) {
      return response.status(400).json({
        error: err.message
      })
    }
  }
}