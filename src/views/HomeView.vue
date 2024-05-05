<template>
  <main class="container mt-5 mb-5">
    <h1 class="text-center">Home page</h1>

    <div class="categories-list">
      <h2>Categories</h2>

      <div class="text-center" v-if="category.loading">
        <div class="spinner-border" role="status"></div>
      </div>

      <ul class="list-group homepage-list" v-if="!category.loading">
        <CategoryItem
          v-for="item in category.items"
          :key="item.id"
          :category-id="item.id"
          :name="item.name"
          :image-url="item.imageUrl"
        />

        <ShowError :description="category?.error || ''" v-if="category.error" />
      </ul>
    </div>

    <div class="products-list mt-5">
      <h2>Products</h2>

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
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'
import CategoryItem from '../components/CategoryItem.vue'
import { useProductStore } from '@/stores/product'
import ProductItem from '@/components/ProductItem.vue'
import ShowError from '@/components/ShowError.vue'

const category = useCategoryStore()
const product = useProductStore()

onMounted(() => {
  category.getItems()
  product.getItems({})
})
</script>

<style>
li img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.list-item-clickable:hover {
  background-color: rgb(127, 123, 123);
  color: white;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.homepage-list {
  max-height: 400px;
  overflow-y: scroll;
}

.product-items {
  gap: 20px;
}
</style>
