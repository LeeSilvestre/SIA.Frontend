import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/LoginView.vue'


const routes = [
  { path: '/', component: login },
  { path: '/login', component: login },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
