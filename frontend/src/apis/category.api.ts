import { Category } from '../types/category.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'categories'
const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  },
  getCategoryDetails(id: string) {
    return http.get<SuccessResponse<Category>>(`${URL}/${id}`)
  }
}

export default categoryApi
