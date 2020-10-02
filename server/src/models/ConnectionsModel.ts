import db from '../database/connection';

export default {
  async index() {
    try {
      const [totalConnections] = await db('connections').count('* as total');

      const { total } = totalConnections;

      return total
    } catch (error) {
      throw new Error('Unexpected error while index connections');
    }
  },

  async create(user_id: number) {
    try {
      await db('connections').insert({
        user_id
      })
    } catch (error) {
      throw new Error('Unexpected error while create connection');
    }
  }
}