import { Request, Response } from "express";

import TeacherModel from '../models/TeacherModel';

export default class TeacherController {
  async updateAvatar(request: Request, response: Response) {
    const { file } = request;

    try {
      await TeacherModel.updateAvatar(file.filename, request.user_id);

      return response.status(200).send();
    } catch (err) {
      return response.status(400).json({
        error: err.message
      })
    }
  }
}