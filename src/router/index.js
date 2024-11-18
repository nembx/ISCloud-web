import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('../views/DataView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/MapContainer.vue')
    },
    {
      path: '/ticketshop',
      name: 'ticketshop',
      component: () => import('../views/TicketView.vue')
    },
    {
      path: '/search/:searchContent',
      name: 'search',
      component: () => import('../views/searchContent.vue')
    },
    {
      path: '/shopCard',
      name: 'shopCard',
      component: () => import('../views/ShopCard.vue')
    }
  ]
})

export default router
