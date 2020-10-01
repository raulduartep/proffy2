import { updateLocale } from 'moment';
import db from '../database/connection';

interface User {
  name: string;
  last_name: string;
  email: string;
  password: string
}

interface CompleteUser extends User {
  id: number;
  verified_email: number;
}

export default {
  async create(user: User): Promise<number> {
    if (await db('users')
      .where('email', user.email)
      .first('*')) {
      throw new Error('User already exists');
    }

    try {
      const [id] = await db('users')
        .insert({
          ...user,
          verified_email: false
        })
        .returning('id')

      return id
    } catch (err) {
      throw new Error('Unexpected error while creating new user')
    }
  },

  async checkEmail(id: number) {
    try {

      await db('users')
        .where('id', id)
        .update({
          verified_email: true,
        })

    } catch {
      throw new Error('Unexpected error while update column verified_email')
    }
  },

  async indexForEmail(email: string) {

    try {
      const user: CompleteUser = await db('users')
        .where('email', email)
        .select('*')
        .first();

      return user

    } catch (err) {
      throw new Error('Unexpected error while search user')
    }
  },

  async indexForPK(id: number) {

    try {
      const user: CompleteUser = await db('users')
        .where('id', id)
        .select('*')
        .first();

      return user

    } catch (err) {
      throw new Error('Unexpected error while search user')
    }
  },

  async updatePassword(password: string, user_id: number, token: string) {

    const trx = await db.transaction()

    try {
      await trx('users')
        .where('id', user_id)
        .update({
          password
        })

      await trx('allowlist_forgot_password_requests')
        .where('token', token)
        .delete()

      await trx.commit()

    } catch (err) {
      await trx.rollback()
      throw new Error('Unexpected error while update user')
    }
  },

  async updateNameOrLastName(updateData: { name?: string, last_name?: string }, user_id: number) {

    try {
      await db('users')
        .where('id', user_id)
        .update(updateData)
    } catch (err) {
      throw new Error('Unexpected error while update user')
    }
  }
}