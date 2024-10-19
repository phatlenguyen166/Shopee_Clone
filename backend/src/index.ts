/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import 'dotenv/config'
import { connectMongoDB } from './database/database'
import commonRoutes from './routes/common/index.route'
import { responseError } from './utils/response'
import morgan from 'morgan'

const app: express.Application = express()
connectMongoDB()
const routes = [{ ...commonRoutes }]
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

routes.forEach((item) => item.routes.forEach((route) => app.use(item.prefix + route.path, route.route)))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: any, req: any, res: any, next: any) {
  responseError(res, err)
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
