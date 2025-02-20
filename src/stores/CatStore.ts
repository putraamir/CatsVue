import { defineStore } from 'pinia'
import { catService } from '@/services/catService'
import type { Cat } from '../../types'

// Cache duration = 1 hour
const CACHE_DURATION = 60 * 60 * 1000

export const useCatStore = defineStore('cat', {
  state: () => ({
    cats: [] as Cat[],
    loading: false,
    lastFetched: 0,
  }),

  getters: {
    // Get the names of all cats for the suggestion search bar
    catNames(): string[] {
      return this.cats.map((cat) => cat.name)
    },

    // Get the number of cats
    numberOfCats(): number {
      return this.cats.length
    },
  },

  actions: {
    async fetchAllCats() {
      // Check if we have cached data and it's still valid
      const cached = localStorage.getItem('cats-cache')
      const timestamp = Number(localStorage.getItem('cats-cache-timestamp'))

      if (cached && timestamp && Date.now() - timestamp < CACHE_DURATION) {
        this.cats = JSON.parse(cached)
        this.lastFetched = timestamp
        return
      }

      let offset = 0
      let hasMore = true

      while (hasMore) {
        try {
          this.loading = true
          const response = await catService.getAllCats(offset)

          if (!this.cats.length) {
            this.cats = response.data
          } else {
            this.cats = [...this.cats, ...response.data]
          }

          offset += 20

          if (response.data.length < 20) {
            hasMore = false
            // Save to cache when we have all cats
            localStorage.setItem('cats-cache', JSON.stringify(this.cats))
            localStorage.setItem('cats-cache-timestamp', Date.now().toString())
            this.lastFetched = Date.now()
          }
        } catch (err) {
          console.error(err)
          hasMore = false
        } finally {
          this.loading = false
        }
      }
    },

    clearCache() {
      localStorage.removeItem('cats-cache')
      localStorage.removeItem('cats-cache-timestamp')
      this.lastFetched = 0
    },

    // Get a specific cat by name
    getCat(name: string) {
      return this.cats.find((cat) => cat.name === name)
    },
  },
})
