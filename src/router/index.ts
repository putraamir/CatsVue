import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatsView from '@/views/CatsView.vue'
import CatDetailsView from '@/views/CatDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cats',
      name: 'cats',

      component: CatsView,
    },
    {
      path: '/cats/:id',
      name: 'cat',
      component: CatDetailsView,
      props: true,
    },
  ],
})

export default router
