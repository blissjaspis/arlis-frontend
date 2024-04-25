import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ServiceView from '../views/ServiceView.vue'
import DashboardView from '../views/DashboardView.vue'
import UserView from '../views/UserView.vue'
import RegisterView from '@/views/RegisterView.vue'
import InformationView from '@/views/InformationView.vue'
import OrderView from '@/views/OrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceView
    },
    {
      path: '/information',
      name: 'information',
      component: InformationView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
