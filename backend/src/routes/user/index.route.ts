import { userUserRoutes } from './user-user.route'

const userRoutes = {
  prefix: '/',
  routes: [
    {
      path: 'user',
      route: userUserRoutes
    }
  ]
}

export default userRoutes
