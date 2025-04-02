import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompleteRegistrationView from '@/views/CompleteRegistrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/users/:id/complete-registration',
      name: 'complete-registration',
      component: CompleteRegistrationView,
    }
  ],
})

export default router
