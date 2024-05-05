<script setup lang="ts">
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import type { CartData, CartProduct } from '@/cartData'

const { productId, name, description, originalImageUrl, price } = defineProps<{
  productId: number
  name: string
  description?: string
  originalImageUrl: string
  price: number
}>()

const cartData = inject('cartData') as CartData
const router = useRouter()

const navigateToProduct = () => {
  router.push(`/product/${productId}`)
}

const addProductToCart = () => {
  const productData: CartProduct = {
    id: productId,
    name,
    price,
    originalImageUrl
  }

  cartData.addProduct(productData)
}
</script>

<template>
  <div class="product-item col-sm p-3">
    <div
      class="product-item-data d-flex justify-content-between align-items-center flex-column mb-5"
      :class="{
        'product-item-data-clickable': !description
      }"
      @click="navigateToProduct"
    >
      <img :src="originalImageUrl" />

      <div class="product-item-meta mt-3">
        <span><strong>Name:</strong> {{ name }}</span>
        <br />
        <strong>Description:</strong>
        <span v-html="description" v-if="description"></span>
        <br />
        <span><strong>Price:</strong> {{ price }}$</span>
      </div>
    </div>

    <button class="btn btn-primary btn-lg" @click="addProductToCart">Buy</button>
  </div>
</template>

<style scoped>
li {
  max-width: 700px;
  gap: 10px;
  margin: auto;
}

img {
  width: 300px;
  height: 400px;
  object-fit: cover;
}

.product-item {
  gap: 20px;
  border: 1px solid rgb(81, 78, 78);
  border-radius: 20px;
}

.product-item-data-clickable {
  cursor: pointer;
}

.product-item-data-clickable:hover {
  opacity: 0.7;
  transition: opacity 0.3s ease-in-out;
}

.btn {
  width: 100%;
}
</style>
