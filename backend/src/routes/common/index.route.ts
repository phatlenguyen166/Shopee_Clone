import commonAuthRouter from './common-auth.route'
import commonProductRouter from './common-product.route'

const commonRoutes = {
  prefix: '/',
  routes: [
    {
      path: '',
      route: commonAuthRouter
    },
    {
      path: 'products',
      route: commonProductRouter
    }
  ]
}

export default commonRoutes
