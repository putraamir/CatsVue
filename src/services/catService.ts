import axios from 'axios'
import type { Cat } from '../../types'

const API_BASE_URL = 'https://api.api-ninjas.com/v1/cats'
const API_KEY = import.meta.env.VITE_API_NINJAS_KEY

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
})

export const catService = {
  // Get all cats with pagination
  getAllCats(offset: number = 0) {
    return apiClient.get(`?min_weight=1&offset=${offset}`)
  },

  // Get cat by name
  getCatByName(name: string) {
    return apiClient.get(`?name=${name}`)
  },

  // Get all cat names
  async getCatNames() {
    const response = await apiClient.get('?min_weight=1')
    return response.data.map((cat: Cat) => cat.name)
  },
}
