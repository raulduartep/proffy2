import db from '../database/connection';
import fs from 'fs';
import path from 'path';

export default {
  async updateAvatar(imageName: string, user_id: number) {

    try {

      const { avatar: oldImage } = await db('teachers')
        .where('user_id', user_id)
        .first()
        .select('avatar')

      await db('teachers')
        .where('user_id', user_id)
        .update({
          avatar: imageName
        })

      if (oldImage) {

        const oldImageUrl = path.resolve(__dirname, '..', '..', 'public', 'uploads', oldImage)

        fs.unlinkSync(oldImageUrl)
      }

    } catch (err) {
      console.log(err)
      throw new Error('Unexpected error while update teacher avatar')
    }

  }
}