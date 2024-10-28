import { config } from '../constants/config'
import { verifyToken } from '../utils/jwt'
import { NextFunction, Request, Response } from 'express'
import { ROLE } from '../constants/role.enum'
import { responseError, ErrorHandler } from '../utils/response'
import { STATUS } from '../constants/status'

import { body } from 'express-validator'
import { AccessTokenModel } from '~/models/refresh-token.model'

const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '')
  if (access_token) {
    try {
      const decoded = (await verifyToken(access_token, config.SECRET_KEY)) as PayloadToken
      req.jwtDecoded = decoded
      const accessTokenDB = await AccessTokenModel.findOne({
        token: access_token
      }).exec()

      if (accessTokenDB) {
        return next()
      }
      responseError(res, new ErrorHandler(STATUS.UNAUTHORIZED, 'Không tồn tại token'))
    } catch (error) {
      responseError(res, error)
    }
  }
  responseError(res, new ErrorHandler(STATUS.UNAUTHORIZED, 'Token không được gửi'))
}

const loginRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Email không đúng định dạng')
      .isLength({ min: 5, max: 160 })
      .withMessage('Email phải từ 5-160 kí tự'),
    body('password').isLength({ min: 6, max: 160 }).withMessage('Mật khẩu phải từ 6-160 kí tự')
  ]
}

export const registerRules = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Email không đúng định dạng')
      .isLength({ min: 5, max: 160 })
      .withMessage('Email phải từ 5-160 kí tự'),
    body('password')
      .exists({ checkFalsy: true })
      .withMessage('Mật khẩu không được để trống')
      .isLength({ min: 6, max: 160 })
      .withMessage('Mật khẩu phải từ 6-160 kí tự')
  ]
}
const authMiddleware = {
  loginRules,
  registerRules,
  verifyAccessToken
}

export default authMiddleware
