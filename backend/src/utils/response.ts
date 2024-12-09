import { Response, Request, NextFunction } from 'express'
import { STATUS } from '../constants/status'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const wrapAsync = (func: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch(next)
  }
}

export class ErrorHandler extends Error {
  status: number
  error: string | ErrorThrow
  constructor(status: number, error: string | ErrorThrow) {
    super()
    this.status = status
    this.error = error
  }
}

export const responseError = (res: Response, error: ErrorHandler | any) => {
  if (res.headersSent) return // Ngăn không gửi phản hồi lần thứ hai

  if (error instanceof ErrorHandler) {
    const status = error.status
    if (typeof error.error === 'string') {
      const message = error.error
      return res.status(status).send({ message })
    }
    const errorObject = error.error
    return res.status(status).send({
      message: 'Lỗi',
      data: errorObject
    })
  }
  return res.status(STATUS.INTERNAL_SERVER_ERROR).send({ message: error.message })
}

export const responseSuccess = (res: Response, data: SuccessResponse) => {
  return res.status(STATUS.OK).send(data)
}
