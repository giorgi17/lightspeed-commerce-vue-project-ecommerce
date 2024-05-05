<script setup lang="ts">
defineProps<{
  description: Error
}>()
</script>

<template>
  <div class="alert alert-danger" role="alert">{{ description }}</div>
</template>

<style scoped></style>
