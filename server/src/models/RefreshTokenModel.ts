import db from '../database/connection';
import crypto from 'crypto';
import moment from 'moment';

interface RefreshToken {
  id: number
  token: string,
  expires: number,
  user_id: number
}

export default {
  async create(user_id: number) {
    try {

      const token = crypto.randomBytes(24).toString('hex');
      const expires = moment().add(1, 'h').unix();

      await this.delete(user_id)

      const [id] = await db('allowlist_refresh_tokens')
        .insert({
          user_id,
          token,
          expires
        })
        .returning('id');

      return token;

    } catch (err) {
      throw new Error('Unexpected error while create refresh token');
    }
  },

  async indexForToken(token: string): Promise<RefreshToken | null> {

    try {
      const refreshToken = await db('allowlist_refresh_tokens')
        .where('token', token)
        .first()
        .select('*');

      if (!refreshToken) {
        return null
      }

      return refreshToken

    } catch (err) {
      console.log(err)
      throw new Error('Unexpected error while search refresh token')
    }
  },

  async delete(id: number) {
    try {
      await db('allowlist_refresh_tokens')
        .where('id', id)
        .delete();

    } catch (err) {
      throw new Error('Unexpected error while delete refresh token')
    }
  }

}