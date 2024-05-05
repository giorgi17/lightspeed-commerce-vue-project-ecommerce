<template>
  <main class="container mt-5 mb-5">
    <h1 class="text-center">Product name: {{ productItem?.name }}</h1>

    <div class="text-center" v-if="product.loading">
      <div class="spinner-border" role="status"></div>
    </div>

    <ProductItem
      v-if="productItem"
      :key="productItem.id"
      :product-id="productItem.id"
      :name="productItem.name"
      :description="productItem.description"
      :price="productItem.price"
      :original-image-url="productItem.originalImageUrl"
    />

    <ShowError :description="product?.error || ''" v-if="product.error" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product'
import { useRoute } from 'vue-router'
import ProductItem from '@/components/ProductItem.vue'
import ShowError from '@/components/ShowError.vue'

const productItem = ref()

const product = useProductStore()

const route = useRoute()
const productId = route.params.productId

onMounted(async () => {
  if (typeof productId === 'string') {
    const returnedProductItem = await product.getItem(parseInt(productId))

    if (returnedProductItem) productItem.value = returnedProductItem
  }
})
</script>

<style scoped></style>
