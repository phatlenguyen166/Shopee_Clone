import commonAuthRouter from './common-auth.route'

const commonRoutes = {
  prefix: '/',
  routes: [
    {
      path: '',
      route: commonAuthRouter
    }
  ]
}

export default commonRoutes
