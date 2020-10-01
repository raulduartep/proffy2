import db from '../database/connection';
import crypto from 'crypto';
import moment, {  } from 'moment';

interface ForgotPasswordRequest {
  id: number;
  token: string;
  expires: number;
  user_id: number,
}

export default {
  async create(user_id: number) {
    try {
      
      const token = crypto.randomBytes(24).toString('hex');
      const expires = moment().add(1, 'hour').unix();

      const [ id ] = await db('allowlist_forgot_password_requests')
        .insert({
          user_id,
          token,
          expires
        })
        .returning('id');

      return token;

    } catch(err) {
      throw new Error('Unexpected error while create forgot password request');
    }
  },

  async indexForToken(token: string) {

    try {
      const forgotPasswordRequest: ForgotPasswordRequest = await db('allowlist_forgot_password_requests')
      .where('token', token)
      .select('*')
      .first();

      return forgotPasswordRequest

    }catch(err) {
      throw new Error('Unexpected error while search forgot password request')
    }
  }
}