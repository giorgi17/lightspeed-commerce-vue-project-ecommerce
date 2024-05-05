<template>
  <main class="container mt-5 mb-5">
    <h1 class="text-center">Category: {{ categoryItem?.name }}</h1>

    <div class="products-list mt-5">
      <h2 class="text-center">Products</h2>

      <div class="text-center" v-if="product.loading">
        <div class="spinner-border" role="status"></div>
      </div>

      <ul class="row product-items" v-if="!product.loading">
        <ProductItem
          v-for="item in product.items"
          :key="item.id"
          :product-id="item.id"
          :name="item.name"
          :price="item.price"
          :original-image-url="item.originalImageUrl"
        />

        <ShowError :description="product?.error || ''" v-if="product.error" />
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductItem from '@/components/ProductItem.vue'
import ShowError from '@/components/ShowError.vue'
import { useCategoryStore } from '@/stores/category'

const categoryItem = ref()

const product = useProductStore()
const category = useCategoryStore()

const route = useRoute()
const categoryId = route.params.categoryId

onMounted(async () => {
  if (typeof categoryId === 'string') product.getItems({ categoryId })
  if (typeof categoryId === 'string') {
    const returnedCategoryItem = await category.getItem(parseInt(categoryId))
    if (returnedCategoryItem) categoryItem.value = returnedCategoryItem
  }
})
</script>

<style scoped></style>
