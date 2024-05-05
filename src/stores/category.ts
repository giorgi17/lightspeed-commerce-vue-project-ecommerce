import { defineStore } from 'pinia'
import type { Category } from './interfaces'

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    items: [] as Category[],
    loading: false,
    error: null as Error | null
  }),
  actions: {
    async getItems(categoryId?: string) {
      this.loading = true

      const additionalOptions = categoryId ? `?categories=${categoryId}` : ''

      try {
        const categoriesResult = await fetch(
          `https://app.ecwid.com/api/v3/${import.meta.env.VITE_STORE_ID}/categories${additionalOptions}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STORE_TOKEN}`
            }
          }
        )

        if (!categoriesResult.ok) {
          throw new Error(
            `HTTP error! Status: ${categoriesResult.status}. StatusText: ${categoriesResult.statusText}`
          )
        }

        const result = await categoriesResult.json()
        this.items = result.items
      } catch (error) {
        this.error = error instanceof Error ? error : new Error('Unknown error')
      } finally {
        this.loading = false
      }
    },
    async getItem(categoryId: number) {
      if (!this.items.length) {
        await this.getItems(categoryId.toString())
      }

      const foundCategoryIndex = this.items.findIndex((item) => item.id === categoryId)
      if (foundCategoryIndex !== -1) return this.items[foundCategoryIndex]
    }
  }
})
