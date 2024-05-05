import { computed, ref, type ComputedRef } from 'vue'
import type { Product } from './stores/interfaces'

export interface CartData {
  addProduct(product: CartProduct): void
  remove(productId: number): void
  placeOrder(): boolean
  products: ComputedRef<CartDataStoreItem[]>
  totalProductsNumber: ComputedRef<number>
  totalProductsPrice: ComputedRef<number>
}

export interface CartDataStoreItem {
  qty: number
  product: CartProduct
}

export type CartDataStore = CartDataStoreItem[]

export interface CartProduct extends Omit<Product, 'description'> {}

const cartDataKey = 'cartData'

const cartDataJson = localStorage.getItem(cartDataKey)
const cartDataStoreRaw: CartDataStore = JSON.parse(cartDataJson || '[]')
const cartDataStore = ref<CartDataStore>(cartDataStoreRaw)

function save() {
  localStorage.setItem(cartDataKey, JSON.stringify(cartDataStore.value))
}

export default {
  addProduct(product: CartProduct) {
    const foundIndex = cartDataStore.value.findIndex((item) => item.product.id === product.id)

    if (foundIndex !== -1) {
      cartDataStore.value[foundIndex].qty += 1
    } else {
      cartDataStore.value.push({
        qty: 1,
        product
      })
    }

    save()
  },

  remove(productId: number) {
    const itemToRemove = cartDataStore.value.find((item) => item.product.id === productId)

    if (itemToRemove?.qty === 1) {
      cartDataStore.value = cartDataStore.value.filter((item) => item.product.id !== productId)
    } else {
      if (itemToRemove?.qty) {
        const cartDataStoreCopied = [...cartDataStore.value]
        const indexToEdit = cartDataStoreCopied.findIndex((item) => item.product.id === productId)
        cartDataStoreCopied[indexToEdit].qty--
        cartDataStore.value = cartDataStoreCopied
      }
    }

    save()
  },

  placeOrder() {
    cartDataStore.value = []
    save()
    return true
  },

  products: computed(() => {
    return cartDataStore.value
  }),

  totalProductsNumber: computed(() => {
    return cartDataStore.value.reduce((total, current) => total + current.qty, 0)
  }),

  totalProductsPrice: computed(() => {
    return cartDataStore.value.reduce(
      (total, current) => total + current.qty * current.product.price,
      0
    )
  })
}
