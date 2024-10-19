import http from '../utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post('/registerr', body)
