import axios, { AxiosError, AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { ToastContainer, toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'
import { clearLS, getAccessTokenFromLS, setProfileToLS, setAccessTokenToLS } from './auth'
import path from '../constants/path'
import config from '../constants/config'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        console.log(error)

        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message, { autoClose: 1000 })
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
          window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
