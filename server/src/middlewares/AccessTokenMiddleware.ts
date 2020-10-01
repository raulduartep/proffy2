import { Request, Response, NextFunction } from "express";

import AccessTokenModel from '../models/AccessTokenModel';

export default (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).json({ error: "No token provided" });

  const parts = authHeader.split(' ');

  if (parts.length !== 2)
    return response.status(401).json({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({ error: "Token bad formatted" });


  try {
    const userId = AccessTokenModel.validate(token);

    request.user_id = userId;

    return next()

  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
}

