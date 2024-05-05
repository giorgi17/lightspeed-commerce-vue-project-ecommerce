<script setup lang="ts">
import type { CartData, CartDataStoreItem } from '@/cartData'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const { cartProduct } = defineProps<{
  cartProduct: CartDataStoreItem
}>()

const cartData = inject('cartData') as CartData
const router = useRouter()

const navigateToProduct = () => {
  router.push(`/product/${cartProduct.product.id}`)
}
</script>

<template>
  <div class="cart-item d-flex justify-content-between align-items-center">
    <div
      class="main-content d-flex justify-content-between align-items-center"
      @click="navigateToProduct"
    >
      <img :src="cartProduct.product.originalImageUrl" class="m-1" />
      <div class="product-meta">
        <span><strong>Name:</strong> {{ cartProduct.product.name }}</span> <br />
        <span><strong>Price:</strong> {{ cartProduct.product.price }} $</span> <br />
        <span><strong>Qty:</strong> {{ cartProduct.qty }}</span> <br />
        <span
          ><strong>Total price:</strong> {{ cartProduct.qty * cartProduct.product.price }} $</span
        >
      </div>
    </div>

    <button class="btn btn-danger" @click="cartData.remove(cartProduct.product.id)">
      Delete item
    </button>
  </div>
  <hr />
</template>

<style scoped>
img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid rgb(112, 106, 106);
}

.main-content {
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}

.main-content:hover {
  opacity: 0.7;
}
</style>
