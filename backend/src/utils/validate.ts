import { Request } from 'express'
import { ROLE } from '../constants/role.enum'
import mongoose from 'mongoose'

// eslint-disable-next-line no-useless-escape
const REGEX_EMAIL = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
export const isEmail = (email: string) => {
  return REGEX_EMAIL.test(email)
}

export const isAdmin = (req: Request) => {
  return req.jwtDecoded?.roles?.includes(ROLE.ADMIN)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMongoId = (id: any) => mongoose.Types.ObjectId.isValid(id)
