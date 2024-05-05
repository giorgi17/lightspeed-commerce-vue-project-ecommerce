import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/category/:categoryId',
      name: 'CategoryView',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/product/:productId',
      name: 'ProductDetailsView',
      component: () => import('../views/ProductDetailsView.vue')
    },
    {
      path: '/cart',
      name: 'CartView',
      component: () => import('../views/CartView.vue')
    }
  ]
})

export default router
