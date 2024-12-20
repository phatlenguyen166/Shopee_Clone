import { Router } from 'express'
import authController from '~/controllers/auth.controller'
import authMiddleware from '~/middleware/auth.middleware'
import helpersMiddleware from '~/middleware/helpers.middleware'
import { wrapAsync } from '~/utils/response'

const commonAuthRouter = Router()

commonAuthRouter.post(
  '/login',
  authMiddleware.loginRules(),
  helpersMiddleware.entityValidator,
  wrapAsync(authController.loginController)
)

commonAuthRouter.post('/logout', authMiddleware.verifyAccessToken, wrapAsync(authController.logoutController))

commonAuthRouter.post(
  '/register',
  authMiddleware.registerRules(), // Gọi middleware để kiểm tra quy tắc
  helpersMiddleware.entityValidator,
  wrapAsync(authController.registerController) // Gọi middleware để xác thực
)

export default commonAuthRouter
