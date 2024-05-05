import { defineStore } from 'pinia'
import type { Product } from './interfaces'

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    items: [] as Product[],
    loading: false,
    error: null as Error | null
  }),
  actions: {
    async getItems({ categoryId, productId }: { categoryId?: string; productId?: string }) {
      this.loading = true

      let additionalOptions = ''

      if (categoryId || productId) {
        additionalOptions += '?'

        if (categoryId) additionalOptions += `categories=${categoryId}`

        if (productId) {
          if (additionalOptions.length > 1) additionalOptions += `&productId=${productId}`
          else additionalOptions += `productId=${productId}`
        }
      }

      try {
        const productsResult = await fetch(
          `https://app.ecwid.com/api/v3/${import.meta.env.VITE_STORE_ID}/products${additionalOptions}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STORE_TOKEN}`
            }
          }
        )

        if (!productsResult.ok) {
          throw new Error(
            `HTTP error! Status: ${productsResult.status}. StatusText: ${productsResult.statusText}`
          )
        }

        const result = await productsResult.json()
        this.items = result.items
      } catch (error) {
        this.error = error instanceof Error ? error : new Error('Unknown error')
      } finally {
        this.loading = false
      }
    },
    async getItem(productId: number) {
      await this.getItems({ productId: productId.toString() })

      const foundProductIndex = this.items.findIndex((item) => item.id === productId)
      if (foundProductIndex !== -1) return this.items[foundProductIndex]
    }
  }
})
