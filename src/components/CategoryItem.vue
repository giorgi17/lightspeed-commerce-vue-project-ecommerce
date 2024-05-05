<script setup lang="ts">
const { categoryId, name, imageUrl } = defineProps<{
  categoryId: number
  name: string
  imageUrl: string
}>()

import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToCategory = () => {
  router.push(`/category/${categoryId}`)
}
</script>

<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center list-item-clickable"
    @click="navigateToCategory"
  >
    <span>{{ name }}</span>

    <img :src="imageUrl" />
  </li>
</template>

<style scoped></style>
