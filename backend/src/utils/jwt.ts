import jwt from 'jsonwebtoken'

export const signToken = (payload: string | object | Buffer, secret_key: string, token_life: number | string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret_key, { expiresIn: token_life }, (error, token) => {
      if (error) {
        return reject(error)
      }
      resolve(token)
    })
  })
}
