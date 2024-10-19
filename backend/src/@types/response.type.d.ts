interface ErrorThrow {
  [key: string]: string
}
interface SuccessResponse {
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}
