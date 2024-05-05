<script setup lang="ts">
import type { CartData } from '@/cartData'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const cartData = inject('cartData') as CartData
const router = useRouter()

const navigateToCart = () => {
  router.push(`/cart`)
}
</script>

<template>
  <header>
    <nav class="navbar navbar-dark bg-dark bg-primary p-3">
      <div class="container">
        <router-link to="/" class="nav-link">Home</router-link>

        <div class="ms-auto cart-icon-container">
          <div class="cart-icon-wrapper" @click="navigateToCart">
            <i class="bi bi-cart4 text-white fs-3"></i
            ><span class="number-of-cart-items">{{ cartData.totalProductsNumber }}</span>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.cart-icon-container {
  margin-right: 20px;
  cursor: pointer;
}

.cart-icon-wrapper {
  height: 100%;
  padding-right: 10px;
  padding-left: 10px;
  cursor: pointer;
}

.cart-icon-wrapper:hover {
  opacity: 0.6;
}

.number-of-cart-items {
  color: white;
  font-size: 0.8rem;
  background-color: rgb(98, 112, 183);
  border-radius: 10px;
  padding: 3px 6px;
}

.nav-link {
  color: white;
}

.nav-link:hover {
  opacity: 0.7;
}
</style>
