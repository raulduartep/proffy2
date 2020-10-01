import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import moment from 'moment';
import bcrypt from 'bcrypt';

import ForgotPasswordModel from '../models/ForgotPasswordModel';
import UserModel from '../models/UserModel';
import RefreshTokenModel from '../models/RefreshTokenModel';
import AccessTokenModel from '../models/AccessTokenModel';

import ForgotPasswordEmail from '../services/mail/models/ForgotPassword';
import VerificationEmail from '../services/mail/models/VerificationEmail';

function generateLinkVerificationEmail(id: number) {

  const token = jwt.sign(
    { id },
    process.env.SECRET_KEY,
  )

  return `${process.env.FRONT_URL}/confirmed_email/${token}`
}

function generateLinkForgotPassword(token: string) {

  return `${process.env.FRONT_URL}/reset_password/${token}`
}


export default class UsersController {
  async autenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        error: "Email or password not informed"
      })
    }

    try {
      const user = await UserModel.indexForEmail(email);

      if (!user) {
        return response.status(401).json({ error: "User not found" });
      }

      if (!user.verified_email) {
        return response.status(401).json({ error: "User not confirmed" });
      }

      if (!await bcrypt.compare(password, user.password)) {
        return response.status(401).json({ error: "Wrong password" });
      }

      const accessToken = await AccessTokenModel.create(user.id)

      const refreshToken = await RefreshTokenModel.create(user.id);

      return response.status(200).json({ user, accessToken, refreshToken })

    } catch (err) {
      return response.status(401).json({ error: err.message })
    }
  }

  async index(request: Request, response: Response) {

    try {

      const user = await UserModel.indexForPK(request.user_id);

      return response.status(200).json(user)
    } catch (err) {
      return response.status(400).json({
        error: err.message
      })
    }
  }

  async create(request: Request, response: Response) {
    const { name, last_name, email, password } = request.body;

    try {

      const hash = await bcrypt.hash(password, 10);

      const id = await UserModel.create({
        name,
        last_name,
        email,
        password: hash,
      })

      try {

        const urlEmailVerification = await generateLinkVerificationEmail(id);

        await new VerificationEmail(email, urlEmailVerification).send()

      } catch (err) {
        console.log(err)
        return response.status(400).json({
          error: 'Error sending verification email'
        })
      }

      return response.status(201).send();

    } catch (err) {
      return response.status(400).json({
        error: err.message
      })
    }

  }

  async confirmEmail(request: Request, response: Response) {
    const { token } = request.params;

    try {
      const id = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return response.status(401).json({ error: "Token invalid" });

        return (<any>decoded).id;
      })

      const user = await UserModel.indexForPK(Number(id));

      if (user.verified_email) {
        return response.status(401).json({ error: "Email already confirmed" });
      }

      await UserModel.checkEmail(Number(id));

      return response.status(201).send();

    } catch (err) {
      response.status(400).json({
        error: err.message
      });
    }
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const user = await UserModel.indexForEmail(email);

      if (!user) {
        return response.status(400).json({
          error: 'User not found'
        })
      }

      const tokenForgotPassword = await ForgotPasswordModel.create(user.id)

      const urlForgotPassword = await generateLinkForgotPassword(tokenForgotPassword)

      await new ForgotPasswordEmail(
        email,
        urlForgotPassword,
      ).send()

      return response.status(201).send();

    } catch (err) {
      return response.status(400).json({
        error: err.message,
      })
    }
  }

  async resetPassword(request: Request, response: Response) {
    const { password } = request.body;
    const { token } = request.params;

    try {
      const forgotPasswordRequest = await ForgotPasswordModel.indexForToken(token);

      if (!forgotPasswordRequest) {
        return response.status(400).json({
          error: 'Not found token'
        });
      }

      if (forgotPasswordRequest.expires < moment().unix()) {
        return response.status(401).json({
          error: 'Token expired',
        });
      }

      const hash = await bcrypt.hash(password, 10);

      await UserModel.updatePassword(
        hash,
        forgotPasswordRequest.user_id,
        token
      );

      return response.status(201).send();

    } catch (err) {
      response.status(400).json({
        error: err.message
      });
    }
  }
}