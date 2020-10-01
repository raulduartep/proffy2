import { Request, Response } from "express";
import moment from "moment";

import RefreshTokenModel from '../models/RefreshTokenModel';
import AccessTokenModel from "../models/AccessTokenModel";



export default {
  async updateRefreshToken(request: Request, response: Response) {
    const { refresh_token: refreshToken } = request.body;

    if (!refreshToken)
      return response.status(401).json({ error: "No token provided" });

    try {
      const responseRefreshToken = await RefreshTokenModel.indexForToken(refreshToken);

      if (responseRefreshToken) {

        const { id, user_id, expires } = responseRefreshToken

        if (!id) {
          return response.status(401).json({ error: "Refresh token invalid" });
        }

        if (expires < moment().unix()) {
          return response.status(401).json({
            error: 'Token expired',
          });
        }

        await RefreshTokenModel.delete(id);

        const newRefreshToken = await RefreshTokenModel.create(user_id);

        const newAccessToken = AccessTokenModel.create(user_id)

        return response.status(200).json({
          refresh_token: newRefreshToken,
          access_token: newAccessToken
        })
      }

    } catch (err) {
      console.log(err)
      return response.status(400).json({
        error: err.message
      })
    }
  },
}
