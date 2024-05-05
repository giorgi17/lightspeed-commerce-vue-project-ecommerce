<script setup lang="ts">
import { inject, ref } from 'vue'
import type { CartData } from '@/cartData'
import CartItem from '@/components/CartItem.vue'

const cartData = inject('cartData') as CartData
const orderPlaced = ref(false)

const cartProducts = cartData.products

const placeOrderHandler = () => {
  const orderResult = cartData.placeOrder()
  orderPlaced.value = orderResult
}
</script>

<template>
  <main class="container mt-5 mb-5">
    <h2 class="mb-5">Cart</h2>

    <h1 class="text-center" v-if="!cartData.totalProductsNumber.value && !orderPlaced">
      Cart is empty
    </h1>
    <h1 class="text-center" v-if="orderPlaced">Congratulations! Order Placed.</h1>

    <div class="content d-flex justify-content-between align-items-center">
      <ul class="cart-items list-group">
        <CartItem v-for="item in cartProducts" :key="item.product.id" :cart-product="item" />
      </ul>

      <div
        class="products-total-meta d-flex justify-content-between align-items-center flex-column"
        v-if="cartData.totalProductsNumber.value"
      >
        <div class="price-total">
          <strong>Subtotal:</strong> {{ cartData.totalProductsPrice }} $
        </div>
        <button class="btn btn-primary btn-lg" @click="placeOrderHandler">Place order</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.content {
  gap: 100px;
  align-items: flex-start !important;
}

.cart-items {
  flex: 1;
}

.products-total-meta {
  gap: 20px;
}
</style>
