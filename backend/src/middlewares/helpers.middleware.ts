/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { validationResult, ValidationError } from 'express-validator'
import { STATUS } from '~/constants/status'
import { ErrorHandler, responseError } from '~/utils/response'

// Type guard để kiểm tra ValidationError hợp lệ
const isValidationError = (item: ValidationError): item is ValidationError & { param: string; msg: string } => {
  return 'param' in item && 'msg' in item
}

const entityValidator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const error: ErrorThrow = errors.array({ onlyFirstError: true }).reduce((result: any, item) => {
    if (isValidationError(item)) {
      result[item.param] = item.msg
    }
    return result
  }, {})

  responseError(res, new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, error))
}

const helpersMiddleware = {
  entityValidator
}
export default helpersMiddleware
