import db from '../database/connection';
import { Request, Response } from 'express';

import ClassesModel from '../models/ClassesModel';
import UserModel from '../models/UserModel';

export default class ClassesController {
  async indexByFilters(request: Request, response: Response) {

    const filters = request.query;
    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    try {
      const classes = await ClassesModel.index({
        subject,
        week_day,
        time
      })

      return response.status(200).json(classes);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      })
    }
  }

  async create(request: Request, response: Response) {
    const {
      subject,
      cost,
      schedule,
      whatsapp,
      bio,
      avatar,
    } = request.body;

    try {

      const classId = await ClassesModel.create(
        {
          subject,
          cost,
          whatsapp,
          bio,
          avatar,
          user_id: request.user_id
        },
        schedule
      );

      return response.status(201).json({
        id: classId
      });

    } catch (err) {
      return response.status(400).json({
        error: err.message
      })
    }
  }

  async indexByUserPk(request: Request, response: Response) {
    const { user_id } = request

    try {
      const classes = await ClassesModel.indexByUserPk(user_id)

      return response.status(200).json(classes);
    } catch (err) {
      return response.status(400).json({
        error: err.message
      })
    }
  }

  async update(request: Request, response: Response) {
    const {
      subject,
      cost,
      schedule,
      whatsapp,
      bio,
      avatar,
      name,
      last_name
    } = request.body;

    try {

      if (name || last_name) {
        UserModel.updateNameOrLastName({
          name,
          last_name
        },
          request.user_id)
      }

      await ClassesModel.update(
        {
          subject,
          cost,
          whatsapp,
          bio,
          avatar,
          schedule
        },
        request.user_id
      );

      return response.status(200).send();

    } catch (err) {
      console.log(err)
      return response.status(400).json({
        error: err.message
      })
    }
  }
}