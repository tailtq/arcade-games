import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlayView from '@/views/PlayView.vue'
import PlatformView from '@/views/PlatformView.vue'

const router = createRouter({
  history: createWebHistory('/arcade-games'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/play/:gameId',
      name: 'play',
      component: PlayView
    },
    {
      path: '/platform/:platform',
      name: 'platform',
      component: PlatformView
    }
  ]
})

export default router
