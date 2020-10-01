import jwt from 'jsonwebtoken';

export default {
  create(user_id: number): string {
    try {

      const token = jwt.sign(
        { id: user_id },
        process.env.SECRET_KEY,
        {
          expiresIn: "5m"
        })

      return token;

    } catch (err) {
      throw new Error('Unexpected error while create access token');
    }
  },

  validate(token: string): number {

    const id = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err)
        if (err.name === 'TokenExpiredError') {
          throw new Error("Token expired");
        }

        throw new Error("Token invalid");
      }

      return (<any>decoded).id;
    })

    return Number(id)
  }
}