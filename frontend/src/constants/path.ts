import { generateNameId } from '../utils/utils'

const path = {
  home: '/',
  profile: '/profile',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetails: ':nameId',
  cart: '/cart'
} as const

export default path
